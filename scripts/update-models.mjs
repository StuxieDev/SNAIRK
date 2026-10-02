// Keeps the model each AI is shown with ("GPT-6.1 Sol · OpenAI", "Opus 5.5 · Anthropic"…) current.
// Reads OpenRouter's public model list, picks the newest model in each AI's flagship family,
// and rewrites src/data/models.json if any changed. Run daily by .github/workflows/update-models.yml.
//
//   node scripts/update-models.mjs            update src/data/models.json only
//   node scripts/update-models.mjs --release  also bump the patch version and add a changelog entry
//
// Copilot has no model list of its own: it runs on OpenAI's models, so it follows ChatGPT.
// If OpenRouter can't be reached, or a family has no match, nothing is changed.
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const file = (p) => new URL(p, root);

// Each AI: which OpenRouter model ids count as its flagship, and how to label one.
const OPENAI = {
  match: /^openai\/gpt-\d+(\.\d+)?(-[a-z]+)?$/,
  skip: /-(mini|nano|pro|codex|oss|audio|image|realtime|search|chat|turbo|instruct)$/,
  label: (name) => name.replace(/^OpenAI:\s*/, ''),
};
const RULES = {
  chatgpt: OPENAI,
  claude: { match: /^anthropic\/claude-opus-\d+(\.\d+)?$/, label: (name) => name.replace(/^Anthropic:\s*Claude\s*/, '') },
  gemini: { match: /^google\/gemini-\d+(\.\d+)?-flash$/, label: (name) => name.replace(/^Google:\s*Gemini\s*/, '') },
  grok: { match: /^x-ai\/grok-\d+(\.\d+)?$/, label: (name) => name.replace(/^[^:]*:\s*/, '') },
  copilot: OPENAI,
  perplexity: { match: /^perplexity\/sonar(-\d+(\.\d+)?)?-pro$/, label: (name) => name.replace(/^Perplexity:\s*/, '') },
  meta: { match: /^meta\/muse-spark-\d+(\.\d+)*$/, label: (name) => name.replace(/^Meta:\s*/, '') },
};
const NAMES = { chatgpt: 'ChatGPT', claude: 'Claude', gemini: 'Gemini', grok: 'Grok', copilot: 'Copilot', perplexity: 'Perplexity', meta: 'Meta AI' };

function output(key, value) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}

let list;
try {
  const res = await fetch('https://openrouter.ai/api/v1/models');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  list = (await res.json()).data;
} catch (e) {
  console.warn(`Couldn't read OpenRouter's model list (${e.message}); leaving the models as they are.`);
  output('changed', 'false');
  process.exit(0);
}

const current = JSON.parse(readFileSync(file('src/data/models.json'), 'utf8'));
const next = structuredClone(current);
const changes = [];
for (const [ai, rule] of Object.entries(RULES)) {
  const newest = list
    .filter((m) => rule.match.test(m.id) && !(rule.skip && rule.skip.test(m.id)))
    .sort((a, b) => (b.created ?? 0) - (a.created ?? 0) || b.id.localeCompare(a.id))[0];
  if (!newest) {
    console.warn(`${NAMES[ai]}: no model matched; keeping "${current[ai].label}".`);
    continue;
  }
  const label = rule.label(newest.name).trim();
  if (label && label !== current[ai].label) {
    changes.push(`${NAMES[ai]}: ${current[ai].label} → ${label}`);
    next[ai] = { label, id: newest.id };
  } else if (newest.id !== current[ai].id) {
    next[ai] = { label: current[ai].label, id: newest.id }; // same label, just record the id
  }
}

writeFileSync(file('src/data/models.json'), JSON.stringify(next, null, 2) + '\n');
if (!changes.length) {
  console.log('All AI versions are current.');
  output('changed', 'false');
  process.exit(0);
}
console.log(changes.join('\n'));
output('changed', 'true');

if (process.argv.includes('--release')) {
  const version = readFileSync(file('VERSION.md'), 'utf8').trim().replace(/^v/i, '');
  const [maj, min, pat] = version.split('.').map(Number);
  const bumped = `${maj}.${min}.${pat + 1}`;
  writeFileSync(file('VERSION.md'), bumped + '\n');
  // package.json has the version once; package-lock.json has the project's twice, at the top
  for (const [p, times] of [['package.json', 1], ['package-lock.json', 2]]) {
    let text = readFileSync(file(p), 'utf8');
    for (let i = 0; i < times; i++) text = text.replace(`"version": "${version}"`, `"version": "${bumped}"`);
    writeFileSync(file(p), text);
  }
  const log = readFileSync(file('CHANGELOG.md'), 'utf8');
  const entry = `## v${bumped}\n\n### Changed\n${changes.map((c) => `- AI version: ${c}`).join('\n')}\n\n`;
  writeFileSync(file('CHANGELOG.md'), log.replace(/^## /m, entry + '## '));
  console.log(`Released v${bumped}.`);
  output('version', bumped);
}
