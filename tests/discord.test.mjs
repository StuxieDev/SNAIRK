// Run with: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom', logLevel: 'silent' });
const { routes, notFoundRoute } = await server.ssrLoadModule('/src/routes.js');
const { headHtml } = await server.ssrLoadModule('/src/lib/head.js');
const { discordMd } = await server.ssrLoadModule('/src/lib/discord.js');
test.after(() => server.close());

const TYPES = new Set([1, 2, 9, 10, 11, 12, 14, 17]);
const RE = /<script id="discord:component-embed" type="application\/json">([\s\S]*?)<\/script>/;

function walk(c, depth, out) {
  out.push(c);
  assert.ok(TYPES.has(c.type), `type ${c.type} allowed`);
  if (c.type === 17) assert.equal(depth, 0, 'no nested containers');
  for (const k of c.components || []) walk(k, depth + 1, out);
  if (c.accessory) walk(c.accessory, depth + 1, out);
}

for (const route of routes.filter((r) => !r.redirect)) {
  test(`discord embed is valid for ${route.path}`, () => {
    const html = headHtml(route);
    const m = html.match(RE);
    assert.ok(m, 'embed present');
    assert.ok(Buffer.byteLength(m[1]) <= 3000);
    const root = JSON.parse(m[1]).component;
    assert.equal(root.type, 17);
    const all = [];
    walk(root, 0, all);
    assert.ok(all.length <= 40);
    for (const b of all.filter((c) => c.type === 2)) {
      assert.equal(b.style, 5);
      assert.deepEqual(Object.keys(b).filter((k) => !['id', 'type', 'url', 'style', 'label', 'emoji', 'disabled'].includes(k)), []);
      assert.match(b.url, /^https?:\/\//);
    }
    assert.ok(!m[1].includes('$1'));
    assert.ok(html.includes('og:title'), 'Open Graph tags stay');
  });
}

test('no embed on the 404 page or redirect stubs', () => {
  assert.ok(!headHtml(notFoundRoute).includes('discord:component-embed'));
  assert.ok(!headHtml(routes.find((r) => r.redirect)).includes('discord:component-embed'));
});

test('discord markdown is escaped, never "$1"', () => {
  assert.equal(discordMd('a*b_c [x] `y` \\ ~|'), 'a\\*b\\_c \\[x\\] \\`y\\` \\\\ \\~\\|');
  assert.equal(discordMd('# hi\n> q\n- l'), '\\# hi\n\\> q\n\\- l');
});

test('</script> cannot close the tag early', () => {
  const html = headHtml({ path: '/x/', title: 'T </script><b>', description: 'd </script>' });
  assert.equal((html.match(/<\/script>/g) || []).length, 1);
  assert.ok(JSON.parse(html.match(RE)[1]));
});
