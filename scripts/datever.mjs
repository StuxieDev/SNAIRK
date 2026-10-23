import { execFileSync } from 'node:child_process';

// 26.10.23 -> 26.10.2300, 26.10.23-1 -> 26.10.2301 (the SemVer form package.json needs)
export function semverForm(v) {
  const [d, n = '0'] = v.split('-');
  return d + String(n).padStart(2, '0');
}

// Today's UTC date as YY.MM.DD, with -N after the highest existing tag for that date.
export function nextDateVersion(now = new Date(), tags = null) {
  const date = now.toISOString().slice(2, 10).replace(/-/g, '.');
  if (tags === null) tags = execFileSync('git', ['tag', '-l', `v${date}*`], { encoding: 'utf8' }).split(/\s+/).filter(Boolean);
  let max = -1;
  for (const t of tags) {
    if (t === `v${date}`) max = Math.max(max, 0);
    const m = t.startsWith(`v${date}-`) ? t.slice(date.length + 2).match(/^\d+$/) : null;
    if (m) max = Math.max(max, Number(m[0]));
  }
  return max < 0 ? date : `${date}-${max + 1}`;
}
