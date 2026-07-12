import { useState, useEffect } from 'react';

import { getS, getColors, API_BASE } from './DesignSystem'
import { useTabungan } from '../hooks/useTabungan';

import { Header } from '../components/Header';
import { Toast } from '../components/Ui';
import { DashboardTab } from '../components/DashboardTab';
import { TransaksiTab } from '../components/TransaksiTab';
import { PengaturanTab } from '../components/PengaturanTab';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'transaksi', label: 'Transaksi' },
  { id: 'pengaturan', label: 'Pengaturan' },
];

// ── Root ─────────────────────────────────────────────────────────
export default function TabunganDigital() {
  const [tab, setTab] = useState('dashboard');
  const [filter, setFilter] = useState('all');
  const handleSetFilter = (f) => {
    setFilter(f);
    data.setTxPage(1);
  };
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  const S = getS(darkMode);
  const colors = getColors(darkMode);

  const TAB_ACCENT = {
    dashboard: colors.yellow,
    transaksi: colors.cyan,
    pengaturan: colors.pink,
  };

  // Live clock
  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  const data = useTabungan();
  const { transaksi, online, deviceInfo, loadingSum } = data;

  const filteredTx = filter === 'all' ? transaksi : transaksi.filter((t) => t.type === filter);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <div style={S.page}>
        <Header online={online} deviceInfo={deviceInfo} loadingSum={loadingSum} time={time} S={S} colors={colors} />

        <main style={S.main}>
          {/* Info bar */}
          <div
            style={{
              background: colors.black,
              color: colors.yellow,
              border: `3px solid ${darkMode ? '#444' : colors.black}`,
              padding: '16px 20px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '13px',
              lineHeight: '2',
              letterSpacing: '0.05em',
              marginBottom: '28px',
              boxShadow: `5px 5px 0 ${darkMode ? '#444' : '#555'}`,
            }}
          >
            <span style={{ color: colors.cyan, fontWeight: 700 }}>// SISTEM TABUNGAN DIGITAL</span>
            {'  '}
            <span style={{ color: '#aaa' }}>Sensor:</span>
            {'  '}
            TCS34725 RGB → mapping nominal uang{'  '}
            <span style={{ color: '#aaa' }}>Auth:</span>
            {'  '}
            PIN 6-digit + SHA-256 hash{'  '}
            <span style={{ color: '#aaa' }}>API:</span>
            {'  '}
            {API_BASE}
          </div>

          {/* Tabs */}
          <div style={S.tabRow}>
            {TABS.map((t, i) => (
              <button
                key={t.id}
                style={{
                  ...S.tabBtn(tab === t.id, TAB_ACCENT[t.id]),
                  borderRight: i < TABS.length - 1 ? `3px solid ${colors.black}` : 'none',
                }}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
            <button
              style={{
                ...S.tabBtn(false, colors.yellow),
                borderRight: 'none',
                borderLeft: `3px solid ${colors.black}`,
                fontSize: '16px',
                padding: '12px 18px',
              }}
              onClick={() => setDarkMode((d) => !d)}
              title="Toggle Dark Mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Tab content */}
          {tab === 'dashboard' && <DashboardTab {...data} setTab={setTab} apiBase={API_BASE} S={S} colors={colors} />}

          {tab === 'transaksi' && (
            <TransaksiTab {...data} filter={filter} setFilter={setFilter} filteredTx={filteredTx} S={S} colors={colors} />
          )}

          {tab === 'pengaturan' && <PengaturanTab {...data} apiBase={API_BASE} S={S} colors={colors} />}
        </main>
      </div>

      <Toast msg={data.toast.msg} type={data.toast.type} colors={colors} />

      <style>{`
        @keyframes pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
