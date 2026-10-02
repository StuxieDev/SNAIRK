import { useEffect, useRef, useState } from 'react';
import { useApp } from '../AppContext.jsx';
import ChatShell from '../components/ChatShell.jsx';
import Icon from '../components/Icon.jsx';
import { Link } from '../router.jsx';
import { ais } from '../data/ais.js';
import { faq } from '../data/faq.js';
import { features } from '../data/features.js';
import { pricing } from '../data/pricing.js';
import { replies } from '../data/replies.js';
import { steps } from '../data/steps.js';

function Hero() {
  return (
    <section className="hero">
      <div className="badge">
        <span className="dot" aria-hidden="true" />
        Snairk 1.0 — Now with 700% more contempt
      </div>
      <h1 className="htitle">
        SNAIRK<span>.</span>
      </h1>
      <p className="hsub">Seven AIs. Zero useful answers. Infinite judgment.</p>
      <p className="hdesc">
        Pick which major AI disappoints you today — ChatGPT, Claude, Gemini, Grok, Copilot, Perplexity, Meta AI — all at
        their absolute worst, on demand.
      </p>
      <div className="hbtns">
        <a href="#demo" className="btn-p">
          Get Snairked →
        </a>
        <a href="#pick" className="btn-g">
          Pick Your AI
        </a>
      </div>
      <p className="pow">Powered by Snairk 1.0 · Not affiliated with anyone · Obviously</p>
      <p className="pow" style={{ marginTop: 12 }}>
        This is satire: no real AI, no data collected, not affiliated with any company it parodies.{' '}
        <Link href="/legal/disclaimer/" style={{ color: 'inherit' }}>
          Read the disclaimer
        </Link>
        .
      </p>
    </section>
  );
}

function Picker() {
  const { ai, setAi, accentFor } = useApp();
  return (
    <section className="picker" id="pick" aria-labelledby="pick-title">
      <div className="picker-hd">
        <div className="slabel">Choose Your Weapon</div>
        <h2 className="stitle" id="pick-title">
          Pick the AI that
          <br />
          disappoints you most.
        </h2>
      </div>
      <div className="ai-scroll" role="group" aria-label="Choose an AI" tabIndex={-1}>
        {ais.map((a) => {
          const color = accentFor(a);
          const selected = ai.id === a.id;
          return (
            <button
              type="button"
              key={a.id}
              className={`ai-card${selected ? ' sel' : ''}`}
              style={{ '--cc': color }}
              aria-pressed={selected}
              onClick={() => setAi(a)}
            >
              <span className="sel-pip" aria-hidden="true" />
              <span className="ai-icon">
                <Icon id={a.id} size={32} color={color} />
              </span>
              <span className="ai-name" style={{ display: 'block' }}>
                {a.name}
              </span>
              <span className="ai-co" style={{ display: 'block' }}>
                {a.sub} · {a.company}
              </span>
              <span className="ai-roast" style={{ display: 'block' }}>
                {a.roast}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Demo() {
  const { ai, accent } = useApp();
  const [input, setInput] = useState('');
  const [userMsg, setUserMsg] = useState(null);
  const [aiMsg, setAiMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  // Switching AI starts a fresh conversation (as in the original), and cancels any pending reply.
  useEffect(() => {
    clearTimeout(timer.current);
    setUserMsg(null);
    setAiMsg(null);
    setLoading(false);
    setInput('');
  }, [ai.id]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const submit = () => {
    const text = input.trim();
    if (!text || loading) return;
    setUserMsg(text);
    setInput('');
    setLoading(true);
    setAiMsg(null);
    const pool = replies[ai.id];
    const reply = pool[Math.floor(Math.random() * pool.length)];
    timer.current = setTimeout(() => {
      setAiMsg(reply);
      setLoading(false);
    }, 400 + Math.random() * 500);
  };

  return (
    <section className="demo-sec" id="demo" aria-labelledby="demo-title">
      <div className="demo-inner">
        <div className="demo-hd">
          <div className="slabel">Live Demo</div>
          <h2 className="stitle" id="demo-title">
            Ask <span style={{ color: 'var(--ink)', transition: 'color .4s' }}>{ai.name}</span> anything.
          </h2>
          <p className="demo-note">Hand-written snairk, zero actual AI. Switch AIs above.</p>
        </div>
        <div className="demo-selected" style={{ borderColor: `${accent}22` }}>
          <div className="demo-sel-icon" style={{ background: `${accent}1a` }}>
            <Icon id={ai.id} size={20} color={accent} />
          </div>
          <div>
            <div className="demo-sel-name" style={{ color: 'var(--ink)' }}>
              {ai.name}
            </div>
            <div className="demo-sel-tag">&ldquo;{ai.tagline}&rdquo;</div>
          </div>
        </div>
        <ChatShell ai={ai} userMsg={userMsg} aiMsg={aiMsg} loading={loading} input={input} setInput={setInput} onSubmit={submit} />
        <p className="demo-fine">Satire, not AI · Not affiliated with any parodied platform · Obviously</p>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="sec" id="features" aria-labelledby="features-title">
      <div className="slabel">Capabilities</div>
      <h2 className="stitle" id="features-title">
        What can SNAIRK do?
      </h2>
      <p className="ssub">Honestly? A lot. Helpfully? No. Benchmarked entirely on vibes, sighs, and unsolicited takes.</p>
      <div className="feat-grid">
        {features.map((f) => (
          <div className="feat-card" key={f.title}>
            <div className="feat-ico" aria-hidden="true">
              {f.icon}
            </div>
            <h3 className="feat-t">{f.title}</h3>
            <div className="feat-d">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="sec" aria-labelledby="how-title">
      <div className="slabel">How It Works</div>
      <h2 className="stitle" id="how-title">
        Three steps to regret.
      </h2>
      <ol className="how-steps" style={{ listStyle: 'none' }}>
        {steps.map((s) => (
          <li className="how-step" key={s.n}>
            <div className="how-n" aria-hidden="true">
              {s.n}
            </div>
            <div style={{ paddingTop: 8 }}>
              <h3 className="how-t">{s.t}</h3>
              <div className="how-d">{s.d}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Pricing() {
  return (
    <section className="sec sec-dark" id="pricing" aria-labelledby="pricing-title">
      <div className="slabel">Pricing</div>
      <h2 className="stitle" id="pricing-title">
        Pay more to be treated worse.
      </h2>
      <p className="ssub">
        All plans include unlimited unsolicited opinions. Annual billing available because SNAIRK assumes commitment issues.
      </p>
      <div className="price-grid">
        {pricing.map((p) => (
          <div className={`pc${p.hot ? ' hot' : ''}`} key={p.name}>
            {p.hot && <div className="pc-tag">Most popular ironically</div>}
            <h3 className="pc-name">{p.name}</h3>
            <div className="pc-price">{p.price}</div>
            <div className="pc-per">{p.period}</div>
            <div className="pc-desc">{p.desc}</div>
            <ul className="pc-feats">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {/* There is nothing to buy: the button just takes you back to the demo. */}
            <a href="#demo" className={`pc-cta ${p.hot ? 'pc-hot' : 'pc-norm'}`}>
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <section className="sec" id="faq" aria-labelledby="faq-title">
      <div className="slabel">FAQ</div>
      <h2 className="stitle" id="faq-title">
        Questions SNAIRK won&apos;t answer.
      </h2>
      <p className="ssub">But we will. Reluctantly. Just like any of the platforms we&apos;re parodying.</p>
      <div className="faq-list">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className="faq-item" key={item.q}>
              <h3 style={{ font: 'inherit' }}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={`faq-plus${isOpen ? ' o' : ''}`} aria-hidden="true">
                    +
                  </span>
                </button>
              </h3>
              <div className={`faq-a${isOpen ? ' o' : ''}`} id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                <div>{item.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Picker />
      <Demo />
      <div className="divider" />
      <Features />
      <div className="divider" />
      <HowItWorks />
      <div className="divider" />
      <Pricing />
      <div className="divider" />
      <Faq />
    </>
  );
}
