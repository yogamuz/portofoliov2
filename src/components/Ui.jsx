// ─────────────────────────────────────────
//  AccentCard
// ─────────────────────────────────────────
export function AccentCard({ children, accent, style = {}, S, colors }) {
  const _accent = accent ?? colors.yellow;
  return (
    <div style={{ ...S.card(), ...style, position: 'relative' }}>
      <div style={S.accentStripe(_accent)} />
      <div style={{ paddingTop: '8px' }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────
//  Toast
// ─────────────────────────────────────────
export function Toast({ msg, type, colors }) {
  if (!msg) return null;
  const bg = type === 'error' ? colors.pink : type === 'success' ? colors.green : colors.yellow;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        background: bg,
        border: `3px solid ${colors.black}`,
        boxShadow: `5px 5px 0 ${colors.black}`,
        padding: '14px 20px',
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        fontSize: '13px',
        maxWidth: '340px',
        animation: 'slideIn 0.2s ease',
      }}
    >
      {type === 'error' ? '✗ ' : '✓ '}
      {msg}
    </div>
  );
}

// ─────────────────────────────────────────
//  Spinner
// ─────────────────────────────────────────
export function Spinner() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '14px',
        height: '14px',
        border: `2px solid #0A0A0A`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
        verticalAlign: 'middle',
        marginRight: '6px',
      }}
    />
  );
}

// ─────────────────────────────────────────
//  LoadingBlock
// ─────────────────────────────────────────
export function LoadingBlock() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '48px 24px',
        color: '#999',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      <Spinner /> MEMUAT DATA...
    </div>
  );
}