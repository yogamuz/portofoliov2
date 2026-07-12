import { fmt, fmtDate } from '../pages/DesignSystem';
import { Spinner, AccentCard, LoadingBlock } from './Ui';

export function TransaksiTab({
  transaksi,
  loadingTx,
  filter,
  setFilter,
  filteredTx,
  fetchTransaksi,
  fetchSummary,
  handleDeleteTx,
  txPage,
  setTxPage,
  TX_PER_PAGE,
  totalTxPages,
  paginateTx,
  deposits,
  withdraws,
  S,
  colors,
}) {
  return (
    <>
      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          marginBottom: '24px',
          border: `3px solid ${colors.black}`,
          width: 'fit-content',
          boxShadow: `5px 5px 0 ${colors.black}`,
        }}
      >
        {[
          { id: 'all', label: 'Semua' },
          { id: 'deposit', label: 'Masuk' },
          { id: 'withdraw', label: 'Keluar' },
        ].map((f, i, arr) => (
          <button
            key={f.id}
            style={{
              ...S.tabBtn(filter === f.id, colors.cyan),
              borderRight: i < arr.length - 1 ? `3px solid ${colors.black}` : 'none',
            }}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
        <div
          style={{
            padding: '12px 20px',
            background: colors.bg,
            borderLeft: `3px solid ${colors.black}`,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: colors.black,
          }}
        >
          {filteredTx.length} TRANSAKSI
          <button
            style={{ ...S.btn(colors.yellow), padding: '6px 14px', fontSize: '11px' }}
            onClick={() => {
              fetchTransaksi();
              fetchSummary();
            }}
          >
            {loadingTx ? <Spinner /> : '↻'}
          </button>
        </div>
      </div>

      <div style={S.sectionTitle}>// RIWAYAT TRANSAKSI</div>

      {/* Tabel dengan kolom hapus */}
      {loadingTx ? (
        <LoadingBlock />
      ) : filteredTx.length === 0 ? (
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
          — belum ada transaksi —
        </div>
      ) : (
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                {['#', 'Waktu', 'Nominal', 'Warna', 'Tipe', 'Saldo Setelah', 'Aksi'].map((h) => (
                  <th key={h} style={S.th(colors.cyan)}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginateTx(filteredTx).map((tx, idx) => (
                <tr key={tx.id}>
                  <td style={S.td(idx)}>{idx + 1}</td>
                  <td style={{ ...S.td(idx), whiteSpace: 'nowrap', fontSize: '11px' }}>{fmtDate(tx.waktu)}</td>
                  <td style={{ ...S.td(idx), fontWeight: 700 }}>{fmt(tx.nominal)}</td>
                  <td style={S.td(idx)}>
                    <span style={S.nominalBadge(tx.nominal)}>{S.nominalLabel[tx.nominal] || tx.warna || '?'}</span>
                  </td>
                  <td style={S.td(idx)}>
                    <span style={S.srcBadge(tx.type)}>{tx.type === 'deposit' ? 'MASUK' : 'KELUAR'}</span>
                  </td>
                  <td
                    style={{
                      ...S.td(idx),
                      fontWeight: 700,
                      color: tx.type === 'deposit' ? '#007A3D' : '#C00',
                    }}
                  >
                    {tx.type === 'deposit' ? '+' : '-'}
                    {fmt(tx.nominal)}
                    <br />
                    <span style={{ fontSize: '11px', color: '#888', fontWeight: 400 }}>{fmt(tx.total_saldo)}</span>
                  </td>
                  <td style={S.td(idx)}>
                    <button
                      style={{ ...S.btn(colors.pink), padding: '4px 10px', fontSize: '10px' }}
                      onClick={() => handleDeleteTx(tx.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(() => {
        const COLORS = [
          { bg: '#FFE14D' }, { bg: '#FF6B6B' }, { bg: '#4ECDC4' },
          { bg: '#95E06C' }, { bg: '#FF9F43' }, { bg: '#A29BFE' },
          { bg: '#FD79A8' }, { bg: '#74B9FF' }, { bg: '#55EFC4' },
          { bg: '#FDCB6E' }, { bg: '#E17055' }, { bg: '#6C5CE7' },
          { bg: '#00CEC9' }, { bg: '#D63031' }, { bg: '#BADC58' },
          { bg: '#F9CA24' }, { bg: '#EB4D4B' }, { bg: '#686DE0' },
          { bg: '#22A6B3' }, { bg: '#BE2EDD' },
        ];

        const total = totalTxPages(filter);
        if (total <= 1) return null;

        const getPages = () => {
          if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
          const pages = [];
          if (txPage <= 4) {
            pages.push(1, 2, 3, 4, 5, '...', total);
          } else if (txPage >= total - 3) {
            pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
          } else {
            pages.push(1, '...', txPage - 1, txPage, txPage + 1, '...', total);
          }
          return pages;
        };

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
            {getPages().map((p, i) =>
              p === '...' ? (
                <span
                  key={`dot-${i}`}
                  style={{
                    padding: '6px 4px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px',
                    color: '#888',
                  }}
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setTxPage(p)}
                  style={{
                    width: '38px',
                    height: '38px',
                    border: `3px solid ${colors.black}`,
                    boxShadow: p === txPage ? `2px 2px 0 ${colors.black}` : `4px 4px 0 ${colors.black}`,
                    transform: p === txPage ? 'translate(2px, 2px)' : 'none',
                    background: p === txPage ? colors.black : COLORS[(p - 1) % COLORS.length].bg,
                    color: p === txPage ? COLORS[(p - 1) % COLORS.length].bg : colors.black,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.08s, box-shadow 0.08s',
                  }}
                >
                  {p}
                </button>
              )
            )}
            <span
              style={{
                fontSize: '11px',
                color: colors.black,
                fontFamily: "'Space Mono', monospace",
                marginLeft: '8px',
              }}
            >
              ({filteredTx.length} total)
            </span>
          </div>
        );
      })()}

      {/* Summary */}
      <div style={{ ...S.grid('1fr 1fr'), marginTop: '28px' }}>
        <AccentCard accent={colors.cyan} S={S} colors={colors}>
          <div style={S.cardLabel}>Total Masuk</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '40px', lineHeight: 1, color: colors.black }}>
            {fmt(deposits.reduce((a, t) => a + t.nominal, 0))}
          </div>
          <div style={{ fontSize: '11px', color: colors.black, marginTop: '4px' }}>{deposits.length} transaksi deposit</div>
        </AccentCard>
        <AccentCard accent={colors.pink} S={S} colors={colors}>
          <div style={S.cardLabel}>Total Keluar</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '40px', lineHeight: 1, color: colors.black   }}>
            {fmt(withdraws.reduce((a, t) => a + t.nominal, 0))}
          </div>
          <div style={{ fontSize: '11px', color: colors.black, marginTop: '4px' }}>{withdraws.length} transaksi penarikan</div>
        </AccentCard>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <span style={S.srcBadge('deposit')}>MASUK</span>
        <span style={{ fontSize: '11px', color: colors.black, alignSelf: 'center' }}>= uang dimasukkan ke celengan</span>
        <span style={S.srcBadge('withdraw')}>KELUAR</span>
        <span style={{ fontSize: '11px', color: colors.black, alignSelf: 'center' }}>= kotak dibuka via PIN</span>
      </div>
    </>
  );
}