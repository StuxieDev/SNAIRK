import { CONTACT_EMAIL, SITE_URL } from '../config.js';
import { legalPages, routes } from '../routes.js';
import { Link } from '../router.jsx';
import DocPage from '../components/DocPage.jsx';

const Contact = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
const HOST = SITE_URL.replace(/^https?:\/\//, '');
const EFFECTIVE = 'Effective: October 2026 — Last updated: October 2026';

function LegalDoc({ route, lead, children, crumbs }) {
  return (
    <DocPage
      title={route.label}
      lead={lead}
      crumbs={[['/', 'Home'], ['/legal/', 'Boring Legal Stuff'], ...(crumbs || [])]}
      current={route.label}
      meta={EFFECTIVE}
    >
      {children}
    </DocPage>
  );
}

const byPage = (page) => routes.find((r) => r.page === page);

export function LegalHub() {
  const route = byPage('legal');
  return (
    <DocPage
      title="Boring Legal Stuff"
      lead="The stuff nobody reads but everybody needs. All of it, in one place, in plain English. The short version: SNAIRK is satire, there is no real AI, and nothing about you is collected."
      crumbs={[['/', 'Home']]}
      current={route.label}
    >
      <div className="hub">
        {legalPages.map((p) => (
          <Link key={p.path} href={p.path}>
            <strong>{p.label}</strong>
            <span>{p.blurb}</span>
          </Link>
        ))}
      </div>
      <p style={{ marginTop: 32 }}>
        Questions about any of this? Contact <Contact />.
      </p>
    </DocPage>
  );
}

export function Privacy() {
  return (
    <LegalDoc route={byPage('privacy')} lead="SNAIRK is a static parody site. It collects nothing and sends your data nowhere.">
      <h2>The short version</h2>
      <p>
        SNAIRK is a static site: HTML, CSS and JavaScript with no server-side application behind it. There is no account
        system, no database, and no form that sends data anywhere. There is also no AI. The replies you see are canned jokes
        written in advance and picked at random in your browser.
      </p>
      <h2>What you type</h2>
      <p>
        Whatever you type into the demo chat stays in your browser tab. It is never sent to us or to anyone else, and it
        disappears when you reload or switch AI.
      </p>
      <h2>Personal data</h2>
      <p>None is collected. We don&apos;t ask for your name, your email, or anything that identifies you.</p>
      <h2>Cookies and tracking</h2>
      <p>
        None. No analytics scripts, no tracking pixels, no advertising networks. The browser storage the site does use is
        described on the <Link href="/legal/cookies/">Cookies Policy</Link>.
      </p>
      <h2>Hosting and third parties</h2>
      <p>
        This site is hosted on GitHub Pages. GitHub, as the hosting provider, may log standard web server data (IP address,
        request path, timestamp) under its own privacy policy. That happens at the infrastructure level and is not something
        this site controls or receives.
      </p>
      <p>
        The footer logo is loaded from StuxieDev&apos;s own media host (<code>global.media.stuxie.dev</code>). Fonts are
        served from this site, not from Google. If you click 69 times, the page plays a short sound file from{' '}
        <code>media.stuxie.dev</code>. Those requests are ordinary image and audio requests; nothing is attached to them.
      </p>
      <h2>Satire and the companies it parodies</h2>
      <p>
        SNAIRK is a parody. It is not affiliated with, endorsed by, or connected to OpenAI, Google, Anthropic, xAI,
        Microsoft, Perplexity or Meta, and it never talks to any of their services. See the{' '}
        <Link href="/legal/disclaimer/">Disclaimer</Link>.
      </p>
      <h2>Children</h2>
      <p>This site doesn&apos;t knowingly collect information from anyone, children included. It doesn&apos;t collect information from anyone at all.</p>
      <h2>Changes to this policy</h2>
      <p>If this policy changes in any meaningful way, the dates above will be updated.</p>
      <h2>Contact</h2>
      <p>
        Questions about privacy? Contact <Contact />.
      </p>
    </LegalDoc>
  );
}

export function Terms() {
  return (
    <LegalDoc route={byPage('terms')} lead="The rules for using SNAIRK, and for taking a joke.">
      <h2>Using this site</h2>
      <p>
        SNAIRK is a free, independent parody site, provided as-is, with no account required. Please don&apos;t attempt to
        disrupt, abusively scrape, or attack the site or its GitHub Pages hosting.
      </p>
      <h2>It&apos;s satire</h2>
      <p>
        Everything on SNAIRK is comedy. The AI &quot;personalities&quot;, replies, plans, prices, features and FAQ answers are
        invented, exaggerated and not meant to be taken as statements of fact about any real product or company. Nothing here
        is a real service, and no plan can actually be bought. The pricing is a joke; the buttons just take you back to the demo.
      </p>
      <h2>Trademarks and affiliation</h2>
      <p>
        ChatGPT, OpenAI, Claude, Anthropic, Gemini, Google, Grok, xAI, Copilot, Microsoft, Perplexity, Meta AI and Meta are
        trademarks of their respective owners. SNAIRK uses their names and marks only to identify what is being parodied. It
        is not affiliated with or endorsed by any of them.
      </p>
      <h2>Ethics</h2>
      <p>
        The jokes are aimed at products and corporate habits, not at people. SNAIRK never claims to be, or to act for, any
        real person or company. Please don&apos;t present its replies as genuine output from the products it mocks.
      </p>
      <h2>No warranty</h2>
      <p>
        SNAIRK is a personal project maintained on a best-effort basis, with no warranty of any kind, express or implied.
        It is not useful. That is the premise.
      </p>
      <h2>Changes</h2>
      <p>These terms may be updated as the site changes. Continued use means you accept the current version.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Contact <Contact />.
      </p>
    </LegalDoc>
  );
}

export function Cookies() {
  return (
    <LegalDoc route={byPage('cookies')} lead="No cookies, ever. Just a few preferences kept in your own browser.">
      <h2>Cookies</h2>
      <p>This site sets no cookies at all: no session cookies, no tracking cookies, no third-party cookies.</p>
      <h2>Local storage</h2>
      <p>
        SNAIRK saves three small values in your browser&apos;s <code>localStorage</code>, so the site feels the same next
        time. They never leave your device.
      </p>
      <ul>
        <li>
          <code>snairk-theme</code>: whether you chose the light or dark theme.
        </li>
        <li>
          <code>snairk-ai</code>: which AI you last picked.
        </li>
        <li>
          <code>snairk-clicks</code>: how many times you&apos;ve clicked the page, for the 69-click easter egg.
        </li>
      </ul>
      <p>
        You can remove them at any time; see <Link href="/legal/opt-out/">Opt-Out Preferences</Link>.
      </p>
      <h2>Third-party embeds</h2>
      <p>
        No third-party scripts, analytics or embeds are loaded. Fonts are self-hosted. The footer logo and the 69-click
        sound come from StuxieDev&apos;s own media hosts.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Contact <Contact />.
      </p>
    </LegalDoc>
  );
}

export function Imprint() {
  return (
    <LegalDoc route={byPage('imprint')} lead="Who operates this site and how to reach them." >
      <h2>Operator</h2>
      <p>SNAIRK is an independent, personal parody project operated by Leo Ridgwell (StuxieDev).</p>
      <h2>Contact</h2>
      <p>
        Email: <Contact />
        <br />
        GitHub: <a href="https://github.com/StuxieDev">github.com/StuxieDev</a>
        <br />
        Website: <a href={SITE_URL}>{HOST}</a>
      </p>
      <h2>Hosting</h2>
      <p>
        This site is hosted on <a href="https://pages.github.com/">GitHub Pages</a>, a service of GitHub, Inc.
      </p>
      <h2>Responsibility</h2>
      <p>Leo Ridgwell is solely responsible for the content of this site. It is satire and is not affiliated with any company it parodies.</p>
    </LegalDoc>
  );
}

export function Disclaimer() {
  return (
    <LegalDoc route={byPage('disclaimer')} lead="SNAIRK is satire. We are not them. Please don't sue us.">
      <div className="callout">
        <p>
          <strong>SNAIRK is a parody.</strong> It is not affiliated with, sponsored by, or endorsed by OpenAI, Google,
          Anthropic, xAI, Microsoft, Perplexity or Meta. There is no real AI here and no data is collected.
        </p>
      </div>
      <h2>Parody and fair comment</h2>
      <p>
        The names, logos and personalities of the products shown are used only to identify what is being parodied. The
        replies, prices, features and FAQ answers are fictional and exaggerated for comedy. They are not statements of fact
        about those products, their makers, or how any of them behave.
      </p>
      <h2>No real AI</h2>
      <p>
        Despite the chat window, nothing is generated. Each reply is one of a fixed list of jokes, chosen at random in your
        browser. Do not use SNAIRK for advice of any kind: medical, legal, financial, or sandwich-related.
      </p>
      <h2>Copyright</h2>
      <p>
        &copy; StuxieDev. All rights reserved for the original code, text and artwork of this site. Third-party names and
        marks belong to their owners.
      </p>
      <h2>Accuracy</h2>
      <p>This is a joke site. If something on it looks like a claim, it is not one.</p>
      <h2>Contact</h2>
      <p>
        Rights holder with a concern? Contact <Contact /> and it will be looked at promptly.
      </p>
    </LegalDoc>
  );
}

export function OptOut() {
  return (
    <LegalDoc route={byPage('opt-out')} lead="There is nothing to sell, so there is nothing to opt out of.">
      <h2>No data sale, no ad targeting</h2>
      <p>
        This site collects no personal data (see the <Link href="/legal/privacy/">Privacy Policy</Link>), runs no
        analytics, and shows no ads. There is no data-sharing relationship to opt out of, and no advertising ID or tracking
        cookie to clear.
      </p>
      <h2>Clearing what SNAIRK remembers</h2>
      <p>
        The only things stored are the three preferences on the <Link href="/legal/cookies/">Cookies Policy</Link>, in your
        browser&apos;s local storage. To remove them, clear this site&apos;s data in your browser settings
        (Site settings, then &quot;Clear data&quot; for {HOST}), or run this in your browser console:
      </p>
      <p>
        <code>localStorage.removeItem(&apos;snairk-theme&apos;); localStorage.removeItem(&apos;snairk-ai&apos;); localStorage.removeItem(&apos;snairk-clicks&apos;)</code>
      </p>
      <h2>If that ever changes</h2>
      <p>
        Should this site ever add analytics, cookies, or any data-sharing arrangement, this page will be updated with the
        actual mechanism to opt out at that time.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Contact <Contact />.
      </p>
    </LegalDoc>
  );
}
