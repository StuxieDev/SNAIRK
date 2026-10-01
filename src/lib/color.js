// Small colour helpers: the accent follows the selected AI, and button text picks
// whichever of near-black or white is more readable on it.
function luminance(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function inkOn(hex) {
  return contrast(hex, '#080808') >= contrast(hex, '#ffffff') ? '#080808' : '#ffffff';
}

// Grok's accent is near-white, so it has a dark alternative for the light theme.
export function accentFor(ai, theme) {
  return theme === 'light' && ai.lightColor ? ai.lightColor : ai.color;
}
