import { useEffect, useRef } from 'react';

// "Achievement Unlocked" overlay for the 69th click. Closes with the button or Escape.
export default function EasterEgg({ onClose }) {
  const btn = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    btn.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="egg" role="dialog" aria-modal="true" aria-labelledby="egg-title">
      <div className="egg-num" aria-hidden="true">
        69
      </div>
      <div className="egg-title" id="egg-title">
        Achievement Unlocked: Thoroughly Snairked
      </div>
      <div className="egg-sub">you clicked 69 times. we&apos;re both impressed and concerned.</div>
      <button type="button" className="egg-btn" ref={btn} onClick={onClose}>
        close this &amp; cope
      </button>
    </div>
  );
}
