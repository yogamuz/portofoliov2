// ═══════════════════════════════════════
//  DESIGN SYSTEM — Tabungan Digital
//  Neobrutalism style tokens & helpers
// ═══════════════════════════════════════

export const colors = {
  bg: '#F5F0E8',
  black: '#0A0A0A',
  yellow: '#FFE135',
  cyan: '#00E5FF',
  pink: '#D50000',
  white: '#FFFFFF',
  gray: '#999',
  green: '#B0F0D0',
  red: '#FFB3B3',
};

export const darkColors = {
  bg: '#0F0F0F',
  black: '#F5F0E8',
  yellow: '#FFE135',
  cyan: '#00E5FF',
  pink: '#FF4444',
  white: '#1A1A1A',
  gray: '#999',
  green: '#00C853',
  red: '#FF6B6B',
};

export const getColors = (dark) => (dark ? darkColors : colors);

export const getS = (dark = false) => {
  const c = getColors(dark);
  return {
    page: {
      minHeight: '100vh',
      background: c.bg,
      fontFamily: "'Space Mono', monospace",
      padding: '0',
      overflowX: 'hidden',
    },
    header: {
      background: c.black,
      borderBottom: `4px solid ${c.yellow}`,
      padding: '24px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
    },
    headerTitle: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 'clamp(28px, 5vw, 52px)',
      color: c.yellow,
      letterSpacing: '0.08em',
      margin: 0,
      lineHeight: 1,
    },
    headerSub: {
      fontSize: '11px',
      color: dark ? '#777' : '#999',
      letterSpacing: '0.15em',
      marginTop: '4px',
      textTransform: 'uppercase',
    },
    badge: (bg = c.cyan) => ({
      background: bg,
      color: c.black,
      fontFamily: "'Space Mono', monospace",
      fontWeight: 700,
      fontSize: '11px',
      padding: '6px 14px',
      border: `2px solid ${c.black}`,
      boxShadow: `3px 3px 0 ${c.black}`,
      letterSpacing: '0.1em',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
    }),
    main: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '32px 24px 64px',
    },
    tabRow: {
      display: 'flex',
      gap: '0',
      marginBottom: '32px',
      border: `3px solid ${c.black}`,
      width: 'fit-content',
      boxShadow: `5px 5px 0 ${c.black}`,
    },
    tabBtn: (active, accent) => ({
      padding: '12px 32px',
      background: active ? accent : c.white,
      color: active ? c.black : dark ? '#aaa' : '#555',
      fontFamily: "'Space Mono', monospace",
      fontWeight: 700,
      fontSize: '13px',
      letterSpacing: '0.12em',
      border: 'none',
      borderRight: `3px solid ${c.black}`,
      cursor: 'pointer',
      textTransform: 'uppercase',
      transition: 'background 0.15s',
    }),
    grid: (cols = 'repeat(auto-fit, minmax(280px, 1fr))') => ({
      display: 'grid',
      gridTemplateColumns: cols,
      gap: '24px',
      marginBottom: '28px',
    }),
    card: () => ({
      background: c.white,
      border: `3px solid ${dark ? '#444' : colors.black}`,
      boxShadow: `6px 6px 0 ${dark ? '#444' : colors.black}`,
      padding: '24px',
      position: 'relative',
    }),
    accentStripe: (color) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '6px',
      background: color,
    }),
    cardLabel: {
      fontFamily: "'Space Mono', monospace",
      fontWeight: 700,
      fontSize: '10px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: dark ? '#aaa' : '#777',
      marginBottom: '8px',
    },
    sectionTitle: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: '28px',
      letterSpacing: '0.08em',
      color: c.black,
      margin: '32px 0 16px',
      borderBottom: `3px solid ${c.black}`,
      paddingBottom: '8px',
    },
    bigVal: (accent = c.yellow) => ({
      background: accent,
      border: `3px solid ${c.black}`,
      padding: '14px 16px',
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 'clamp(32px, 5vw, 52px)',
      fontWeight: 700,
      letterSpacing: '0.05em',
      color: c.black,
      lineHeight: 1,
    }),
    progressBg: {
      height: '20px',
      background: c.bg,
      border: `3px solid ${c.black}`,
      position: 'relative',
      marginTop: '10px',
    },
    infoBox: {
      background: dark ? '#222' : '#F0EBE0',
      border: `2px dashed ${c.black}`,
      padding: '10px 14px',
      fontFamily: "'Space Mono', monospace",
      fontSize: '13px',
      letterSpacing: '0.05em',
      color: dark ? '#bbb' : '#444',
      marginTop: '8px',
    },
    tableWrap: {
      overflowX: 'auto',
      border: `3px solid ${c.black}`,
      boxShadow: `6px 6px 0 ${c.black}`,
      background: c.white,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: "'Space Mono', monospace",
      fontSize: '13px',
    },
    th: (accent) => ({
      background: accent,
      color: c.black,
      fontWeight: 700,
      padding: '10px 14px',
      textAlign: 'center',
      borderBottom: `3px solid ${c.black}`,
      borderRight: `1px solid ${c.black}`,
      letterSpacing: '0.08em',
      whiteSpace: 'nowrap',
      fontSize: '11px',
      textTransform: 'uppercase',
    }),
    td: (i) => ({
      padding: '9px 14px',
      textAlign: 'center',
      borderBottom: `1px solid ${dark ? '#333' : '#D0C8B8'}`,
      borderRight: `1px solid ${dark ? '#333' : '#D0C8B8'}`,
      background: i % 2 === 0 ? c.white : dark ? '#222' : '#FAF6EE',
      color: dark ? '#F5F0E8' : '#0A0A0A', // ← ganti c.black jadi hardcode per mode
    }),
    srcBadge: (type) => ({
      background: type === 'deposit' ? c.cyan : c.pink,
      color: c.black,
      fontWeight: 700,
      fontSize: '10px',
      padding: '3px 10px',
      border: `2px solid ${c.black}`,
      letterSpacing: '0.08em',
      display: 'inline-block',
      boxShadow: `2px 2px 0 ${c.black}`,
    }),
    nominalBadge: (nominal) => {
      const map = { 100000: c.pink, 50000: '#1A6FFF', 20000: '#00C853', 10000: '#8000FF' };
      return {
        background: map[nominal] || '#888',
        color: '#FFFFFF', // ← dari c.white jadi '#FFFFFF' hardcode
        fontWeight: 700,
        fontSize: '10px',
        padding: '3px 10px',
        border: `2px solid ${c.black}`,
        letterSpacing: '0.08em',
        display: 'inline-block',
        boxShadow: `2px 2px 0 ${c.black}`,
      };
    },
    nominalLabel: { 100000: 'MERAH', 50000: 'BIRU', 20000: 'HIJAU', 10000: 'UNGU' },
    input: {
      width: '100%',
      background: dark ? '#1A1A1A' : colors.bg,
      border: `3px solid ${c.black}`,
      padding: '12px 14px',
      fontFamily: "'Space Mono', monospace",
      fontSize: '14px',
      fontWeight: 700,
      color: c.black,
      outline: 'none',
      boxSizing: 'border-box',
    },
    btn: (bg = c.yellow, disabled = false) => ({
      background: disabled ? (dark ? '#333' : '#ccc') : bg,
      border: `3px solid ${c.black}`,
      boxShadow: disabled ? 'none' : `4px 4px 0 ${c.black}`,
      padding: '10px 22px',
      fontFamily: "'Space Mono', monospace",
      fontWeight: 700,
      fontSize: '12px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: c.black,
      transition: 'all 0.08s',
      opacity: disabled ? 0.6 : 1,
    }),
  };
};

// Backward compat alias (light mode default)
export const S = getS(false);

// ── Formatters ───────────────────────────────────────────────────
export const fmt = (n) => 'Rp' + Number(n || 0).toLocaleString('id-ID');

export const fmtDate = (s) => {
  if (!s) return '-';
  const d = new Date(s);
  return (
    d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  );
};

// ── API config ───────────────────────────────────────────────────
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  get: (path) => fetch(`${API_BASE}${path}`).then((r) => r.json()),
  put: (path, body) =>
    fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  post: (path, body) =>
    fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  delete: (path) => fetch(`${API_BASE}${path}`, { method: 'DELETE' }).then((r) => r.json()),
};
