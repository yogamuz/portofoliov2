import { fmt, fmtDate } from '../pages/DesignSystem';
import { AccentCard, LoadingBlock, Spinner } from './Ui';

export function DashboardTab({
  summary,
  loadingSum,
  loadingTx,
  transaksi,
  online,
  deviceInfo,
  saldo,
  target,
  totalIn,
  totalOut,
  depCount,
  withCount,
  pct,
  fetchSummary,
  setTab,
  apiBase,
  S,
  colors,
}) {
  return (
    <>
      {/* Saldo utama */}
      <div style={{ ...S.grid('1fr'), marginBottom: '28px' }}>
        <AccentCard accent={colors.yellow} S={S} colors={colors}>
          <div style={S.cardLabel}>Total Saldo</div>
          {loadingSum ? (
            <LoadingBlock />
          ) : (
            <>
              <div style={S.bigVal(colors.yellow)}>{fmt(saldo)}</div>
              <div style={{ marginTop: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    fontWeight: 700,
                    marginBottom: '6px',
                    letterSpacing: '0.1em',
                  }}
                >
                  <span>TARGET: {fmt(target)}</span>
                  <span>{pct}%</span>
                </div>
                <div style={S.progressBg}>
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: pct >= 100 ? '#00C853' : colors.black,
                      transition: 'width .5s ease',
                    }}
                  />
                </div>
              </div>
              <div style={{ ...S.infoBox, marginTop: '10px' }}>
                Kekurangan: <strong>{fmt(Math.max(0, target - saldo))}</strong>
                {'  '}·{'  '}
                IP: <strong>{deviceInfo?.ip || '-'}</strong>
                {'  '}·{'  '}
                MAC: <strong>{deviceInfo?.mac || '-'}</strong>
              </div>
            </>
          )}
        </AccentCard>
      </div>

      {/* Stat cards */}
      <div style={S.grid('repeat(auto-fit, minmax(200px, 1fr))')}>
        <AccentCard accent={colors.cyan} S={S} colors={colors}>
          <div style={S.cardLabel}>Total Masuk</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '36px', lineHeight: 1, color: colors.black }}>
            {loadingSum ? '-' : fmt(totalIn)}
          </div>
          <div style={{ fontSize: '11px', color: colors.gray, marginTop: '4px' }}>{depCount} transaksi</div>
        </AccentCard>

        <AccentCard accent={colors.pink} S={S} colors={colors}>
          <div style={S.cardLabel}>Total Keluar</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '36px', lineHeight: 1, color: colors.black }}>
            {loadingSum ? '-' : fmt(totalOut)}
          </div>
          <div style={{ fontSize: '11px', color: colors.gray, marginTop: '4px' }}>{withCount} transaksi</div>
        </AccentCard>

        <AccentCard accent={colors.yellow} S={S} colors={colors}>
          <div style={S.cardLabel}>Total Transaksi</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '36px', lineHeight: 1, color: colors.black }}>
            {loadingSum ? '-' : `${depCount + withCount}x`}
          </div>
          <div style={{ fontSize: '11px', color: colors.gray, marginTop: '4px' }}>sejak pertama kali</div>
        </AccentCard>

        <AccentCard accent={colors.green} S={S} colors={colors}>
          <div style={S.cardLabel}>Status Device</div>
          <div
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: '28px',
              lineHeight: 1,
              color: online ? '#007A3D' : '#C00',
            }}
          >
            {loadingSum ? '-' : online ? 'ONLINE' : 'OFFLINE'}
          </div>
          <div style={{ fontSize: '11px', color: colors.gray, marginTop: '4px' }}>{deviceInfo?.wifi || 'ESP32'}</div>
        </AccentCard>
      </div>

      {/* Mapping warna + transaksi terbaru */}
      <div style={S.grid('1fr 1fr')}>
        <AccentCard accent={colors.cyan} S={S} colors={colors}>
          <div style={S.cardLabel}>Mapping Warna Uang</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
            {[
              { color: colors.pink, label: 'MERAH', nom: 'Rp100.000' },
              { color: '#1A6FFF', label: 'BIRU', nom: 'Rp50.000' },
              { color: '#00C853', label: 'HIJAU', nom: 'Rp20.000' },
              { color: '#8000FF', label: 'UNGU', nom: 'Rp10.000' },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  background: colors.bg,
                  border: `2px solid ${colors.black}`,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    background: m.color,
                    border: `2px solid ${colors.black}`,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: colors.black }}>{m.label}</div>
                  <div style={{ fontSize: '10px', color: colors.gray }}>{m.nom}</div>
                </div>
              </div>
            ))}
          </div>
        </AccentCard>

        <AccentCard accent={colors.yellow} S={S} colors={colors}>
          <div style={S.cardLabel}>Transaksi Terbaru</div>
          {loadingTx ? (
            <LoadingBlock />
          ) : (
            <div style={{ marginTop: '8px' }}>
              {transaksi.slice(0, 3).length === 0 ? (
                <div style={{ fontSize: '12px', color: '#999', padding: '12px 0' }}>Belum ada transaksi</div>
              ) : (
                transaksi.slice(0, 3).map((tx, i) => (
                  <div
                    key={tx.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: i < 2 ? `1px solid ${colors.gray}` : 'none',
                    }}
                  >
                    <div>
                      <span style={S.srcBadge(tx.type)}>{tx.type === 'deposit' ? 'MASUK' : 'KELUAR'}</span>
                      {'  '}
                      <span style={S.nominalBadge(tx.nominal)}>{S.nominalLabel[tx.nominal] || tx.warna}</span>
                      <div style={{ fontSize: '10px', color: '#888', marginTop: '3px' }}>{fmtDate(tx.waktu)}</div>
                    </div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: '20px',
                        color: tx.type === 'deposit' ? '#007A3D' : '#C00',
                      }}
                    >
                      {tx.type === 'deposit' ? '+' : '-'}
                      {fmt(tx.nominal)}
                    </div>
                  </div>
                ))
              )}
              <button
                style={{
                  ...S.btn(colors.black),
                  color: colors.yellow,
                  width: '100%',
                  marginTop: '12px',
                  textAlign: 'center',
                }}
                onClick={() => setTab('transaksi')}
              >
                LIHAT SEMUA →
              </button>
            </div>
          )}
        </AccentCard>
      </div>

      {/* Device info */}
      <div style={S.sectionTitle}>// INFO DEVICE ESP32</div>
      <div
        style={{
          background: colors.black,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0 ${colors.black}`,
          padding: '24px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '20px' }}>
          {[
            { label: 'CHIP', val: deviceInfo?.chip || '-' },
            { label: 'MAC ADDRESS', val: deviceInfo?.mac || '-' },
            { label: 'IP ADDRESS', val: deviceInfo?.ip || '-' },
            { label: 'WIFI', val: deviceInfo?.wifi || '-' },
            { label: 'LAST SEEN', val: deviceInfo?.lastSeen ? fmtDate(deviceInfo.lastSeen) : '-' },
            { label: 'API', val: apiBase },
          ].map((d) => (
            <div key={d.label}>
              <div
                style={{
                  fontSize: '10px',
                  color: '#666',
                  letterSpacing: '0.12em',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                }}
              >
                {d.label}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: '12px',
                  fontWeight: 700,
                  color: colors.yellow,
                  wordBreak: 'break-all',
                }}
              >
                {d.val}
              </div>
            </div>
          ))}
        </div>
        <button style={{ ...S.btn(colors.yellow), marginTop: '18px' }} onClick={fetchSummary}>
          {loadingSum ? (
            <>
              <Spinner />
              MEMUAT...
            </>
          ) : (
            '↻ REFRESH'
          )}
        </button>
      </div>
    </>
  );
}
