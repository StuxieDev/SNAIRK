// Parses CHANGELOG.md into releases. Section types always render in ORDER (unknown types last),
// whatever order the markdown lists them in.
export const ORDER = ['Added', 'Changed', 'Fixed', 'Removed', 'Security', 'Deprecated'];

function rank(type) {
  const i = ORDER.findIndex((t) => t.toLowerCase() === type.toLowerCase());
  return i < 0 ? ORDER.length : i;
}

export function parseChangelog(md) {
  const releases = [];
  let release = null;
  let section = null;
  let item = null;
  const flushItem = () => {
    if (item !== null && section) section.items.push(item);
    item = null;
  };

  for (const raw of md.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.replace(/\s+$/, '');
    let m;
    if (!line.trim()) {
      flushItem();
      continue;
    }
    if ((m = line.match(/^##\s+(.+)$/))) {
      flushItem();
      release = { version: m[1].trim(), sections: [], notes: [] };
      releases.push(release);
      section = null;
      continue;
    }
    if (!release) continue; // title and intro above the first release
    if ((m = line.match(/^###\s+(.+)$/))) {
      flushItem();
      const type = m[1].trim();
      section = { type, known: rank(type) < ORDER.length, rank: rank(type), idx: release.sections.length, items: [] };
      release.sections.push(section);
      continue;
    }
    if ((m = line.match(/^\s*[-*]\s+(.+)$/))) {
      flushItem();
      if (!section) {
        section = { type: '', known: false, rank: ORDER.length, idx: 0, items: [] };
        release.sections.push(section);
      }
      item = m[1].trim();
      continue;
    }
    if (item !== null) item += ' ' + line.trim();
    else release.notes.push(line.trim());
  }
  flushItem();

  for (const r of releases) r.sections.sort((a, b) => a.rank - b.rank || a.idx - b.idx);
  return releases;
}
