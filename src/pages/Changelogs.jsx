import { Fragment } from 'react';
import changelogMd from '../../CHANGELOG.md?raw';
import { VERSION } from '../config.js';
import DocPage from '../components/DocPage.jsx';
import { parseChangelog } from '../lib/changelog.js';

const releases = parseChangelog(changelogMd);

// Inline markdown for changelog text: `code`, **bold**, *italic* and [links](url).
function inline(text) {
  const out = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|(?:^|(?<=[^\w*]))\*([^*\s][^*]*)\*(?![\w*])/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<code key={m.index}>{m[1]}</code>);
    else if (m[2] !== undefined) out.push(<strong key={m.index}>{m[2]}</strong>);
    else if (m[3] !== undefined) {
      const ok = /^(https?:\/\/|\/|#|mailto:)/i.test(m[4]);
      out.push(
        <a key={m.index} href={ok ? m[4] : '#'} rel={/^https?:/i.test(m[4]) ? 'noopener' : undefined}>
          {m[3]}
        </a>,
      );
    } else out.push(<em key={m.index}>{m[5]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((n, i) => <Fragment key={i}>{n}</Fragment>);
}

export default function Changelogs() {
  return (
    <DocPage
      title="Changelogs"
      lead="What changed in each release of SNAIRK."
      crumbs={[['/', 'Home']]}
      current="Changelogs"
    >
      <p className="cl-current">
        Current version: <code>v{VERSION}</code>
      </p>
      {releases.length === 0 && <p className="cl-msg">No changelog entries yet.</p>}
      <div className="cl-entries">
      {releases.map((r) => (
        <article className="cl-entry" key={r.version}>
          <h2>{r.version}</h2>
          {r.notes.map((n, i) => (
            <p className="cl-msg" key={i}>
              {inline(n)}
            </p>
          ))}
          {r.sections.map((s) => (
            <Fragment key={s.type + s.idx}>
              {s.type &&
                (s.known ? (
                  <span className={`cl-label cl-label-${s.type.toLowerCase()}`}>{s.type}</span>
                ) : (
                  <h3 className="cl-h4">{s.type}</h3>
                ))}
              <ul className="cl-list">
                {s.items.map((it, i) => (
                  <li key={i}>{inline(it)}</li>
                ))}
              </ul>
            </Fragment>
          ))}
        </article>
      ))}
      </div>
    </DocPage>
  );
}
