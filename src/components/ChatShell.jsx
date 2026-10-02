import { useId } from 'react';
import { chatThemes } from '../data/chatThemes.js';
import Icon from './Icon.jsx';

// A fake chat window skinned like the selected product.
export default function ChatShell({ ai, userMsg, aiMsg, aiVia, loading, input, setInput, onSubmit }) {
  const t = chatThemes[ai.id];
  const light = t.light;
  const fieldId = useId();
  const canSend = input.trim() && !loading;

  return (
    <div className={`shell ${light ? 'sh-light' : 'sh-dark'}`} style={{ background: t.bg, fontFamily: t.font }}>
      <div className="sh-head" style={{ background: t.hBg, borderBottomColor: t.hBorder }}>
        <div className="sh-av" style={{ background: t.avBg }}>
          <Icon id={ai.id} size={19} color={t.avText} />
        </div>
        <span className="sh-nm" style={{ color: t.name === 'Grok' ? '#e7e9ea' : light ? '#202124' : '#f0ece8' }}>
          {t.name}
        </span>
        <span className="sh-bdg" style={{ background: t.badgeBg, color: t.badgeText }}>
          {t.badge}
        </span>
        <div className="sh-chrome" aria-hidden="true">
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <em key={c} style={{ background: c, opacity: 0.45 }} />
          ))}
        </div>
      </div>

      <div className="sh-msgs" style={{ background: t.bg }} aria-live="polite" aria-relevant="additions text">
        {!userMsg && (
          <div className="sh-empty" style={{ color: t.s2 }}>
            <div className="sh-empty-ico">
              <Icon id={ai.id} size={48} color={t.s2} />
            </div>
            <div className="sh-empty-txt">{t.ePh}</div>
          </div>
        )}
        {userMsg && (
          <div className="umsg">
            <div className="ubbl" style={{ background: t.uBg, color: t.uText }}>
              {userMsg}
            </div>
          </div>
        )}
        {userMsg && (loading || aiMsg) && (
          <div className="ai-row">
            <div className="ai-av" style={{ background: t.avBg }}>
              <Icon id={ai.id} size={17} color={t.avText} />
            </div>
            <div
              className={`ai-bbl ${t.aiBg ? 'bbl-yes' : 'bbl-no'}`}
              style={{
                color: t.aiText,
                ...(t.aiBg ? { background: t.aiBg, boxShadow: light ? '0 1px 4px rgba(0,0,0,.08)' : 'none' } : {}),
              }}
            >
              {loading ? <span className="ltxt">{t.lText}</span> : aiMsg}
              {!loading && aiVia && (
                <span className="ai-via" style={{ color: t.s2 }}>
                  via {aiVia}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <form
        className="sh-inp"
        style={{ background: t.bg, borderTopColor: t.hBorder }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="sh-inp-row" style={{ background: t.iBg, borderColor: t.iBorder, borderRadius: t.iR }}>
          <label htmlFor={fieldId} className="sr-only">
            Message {t.name}
          </label>
          <input
            id={fieldId}
            className="sh-field"
            style={{ color: t.iText, fontFamily: t.font }}
            placeholder={t.iPh}
            value={input}
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="sh-send"
            aria-label="Send"
            style={{ background: canSend ? t.btnBg : light ? '#ddd' : '#222', color: t.btnText }}
            disabled={!canSend}
          >
            <span aria-hidden="true">↑</span>
          </button>
        </div>
        {t.disc && (
          <div className="sh-disc" style={{ color: t.s2 }}>
            {t.disc}
          </div>
        )}
      </form>
    </div>
  );
}
