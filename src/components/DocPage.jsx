import { Link } from '../router.jsx';

// Shared layout for the text pages: breadcrumbs, heading, lead paragraph, content.
export default function DocPage({ title, lead, meta, crumbs = [], current, children }) {
  return (
    <section className="doc">
      <div className="doc-inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map(([href, label]) => (
            <span key={href}>
              <Link href={href}>{label}</Link> /
            </span>
          ))}
          <span aria-current="page">{current || title}</span>
        </nav>
        <h1>{title}</h1>
        {lead && <p className="doc-lead">{lead}</p>}
        {meta && <p className="doc-meta">{meta}</p>}
        {children}
      </div>
    </section>
  );
}
