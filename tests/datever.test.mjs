// Run with: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { nextDateVersion, semverForm } from '../scripts/datever.mjs';
import { parseChangelog, ORDER } from '../src/lib/changelog.js';

const d = new Date('2026-10-23T23:30:00Z');
test('first release of the UTC day is the bare date', () => assert.equal(nextDateVersion(d, []), '26.10.23'));
test('later releases get -1, -2', () => {
  assert.equal(nextDateVersion(d, ['v26.10.23']), '26.10.23-1');
  assert.equal(nextDateVersion(d, ['v26.10.23', 'v26.10.23-1']), '26.10.23-2');
});
test('semver form', () => {
  assert.equal(semverForm('26.10.23'), '26.10.2300');
  assert.equal(semverForm('26.10.23-1'), '26.10.2301');
});
test('changelog parser reads date version headings, sorted by the fixed order', () => {
  const r = parseChangelog('# C\n\n## v26.10.23-1\n\n### Deprecated\n- d\n\n### Added\n- a\n\n## v26.10.23\n\n### Changed\n- c\n');
  assert.deepEqual(r.map((x) => x.version), ['v26.10.23-1', 'v26.10.23']);
  assert.deepEqual(r[0].sections.map((s) => s.type), ['Added', 'Deprecated']);
  assert.deepEqual(ORDER, ['Added', 'Changed', 'Fixed', 'Removed', 'Security', 'Deprecated']);
});
