import { fmt, fmtDate } from '../pages/designSystem';
import { AccentCard, Spinner } from './UI';

export function PengaturanTab({
  targetInput, setTargetInput, savingTarget, handleSaveTarget,
  pinLama, setPinLama,
  pinBaru, setPinBaru,
  pinKonfirmasi, setPinKonfirmasi,
  savingPin, handleChangePin,
  online, deviceInfo,
  loadingSum, fetchSummary, fetchTransaksi,
  resetting, handleReset,
  apiBase,
  S,
  colors,
}) {
  return (
    <>
      <div style={S.sectionTitle}>// PENGATURAN SISTEM</div>

      <div style={S.grid('repeat(auto-fit, minmax(300px, 1fr))')}>

        {/* Target tabungan */}
        <AccentCard accent={colors.yellow} S={S} colors={colors}>
          <div style={S.cardLabel}>🎯 Target Tabungan</div>
          <div style={{ marginTop: '8px' }}>
            <input
              style={S.input}
              type="number"
              value={targetInput}
              onChange={e => setTargetInput(e.target.value)}
              placeholder="500000"
            />
            <div style={S.infoBox}>
              Target saat ini: <strong>{fmt(parseInt(targetInput) || 0)}</strong>
            </div>
            <button
              style={{ ...S.btn(colors.yellow, savingTarget), marginTop: '12px' }}
              onClick={handleSaveTarget}
              disabled={savingTarget}
            >
              {savingTarget ? <><Spinner />MENYIMPAN...</> : 'SIMPAN TARGET'}
            </button>
          </div>
        </AccentCard>

        {/* Ganti PIN */}
        <AccentCard accent={colors.pink} S={S} colors={colors}>
          <div style={S.cardLabel}>🔐 Ganti PIN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            {[
              { label: 'PIN Lama',      val: pinLama,       set: setPinLama       },
              { label: 'PIN Baru',       val: pinBaru,       set: setPinBaru       },
              { label: 'Konfirmasi PIN', val: pinKonfirmasi, set: setPinKonfirmasi },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <div style={{ ...S.cardLabel, marginBottom: '4px' }}>{label}</div>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="••••••"
                  value={val}
                  onChange={e => set(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{ ...S.input, fontSize: '20px', letterSpacing: '0.4em' }}
                />
              </div>
            ))}
            <button
              style={S.btn(colors.pink, savingPin)}
              onClick={handleChangePin}
              disabled={savingPin}
            >
              {savingPin ? <><Spinner />MENYIMPAN...</> : 'GANTI PIN'}
            </button>
          </div>
        </AccentCard>

        {/* Status device */}
        <AccentCard accent={colors.cyan} S={S} colors={colors}>
          <div style={S.cardLabel}>📡 Status Device</div>
          <div style={S.infoBox}>
            Status: <strong>{online ? 'ONLINE' : 'OFFLINE'}</strong><br />
            IP: <strong>{deviceInfo?.ip || '-'}</strong><br />
            WiFi: <strong>{deviceInfo?.wifi || '-'}</strong><br />
            Last Seen: <strong>{deviceInfo?.lastSeen ? fmtDate(deviceInfo.lastSeen) : '-'}</strong>
          </div>
          <button
            style={{ ...S.btn(colors.cyan), marginTop: '12px' }}
            onClick={() => { fetchSummary(); fetchTransaksi(); }}
          >
            {loadingSum ? <><Spinner />MEMUAT...</> : '↻ REFRESH STATUS'}
          </button>
        </AccentCard>
      </div>

      {/* Konfigurasi API */}
      <div style={S.sectionTitle}>// KONFIGURASI API</div>
      <div style={{
        background: colors.black,
        border: `3px solid ${colors.black}`,
        boxShadow: `6px 6px 0 ${colors.black}`,
        padding: '24px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          {[
            ['API BASE URL',  apiBase],
            ['AUTO-REFRESH',  'Setiap 15 detik'],
            ['AUTH ESP32',    'Bearer Token (Header)'],
            ['DB',            'Firebase Firestore'],
          ].map(([label, val]) => (
            <div key={label}>
              <div style={{
                fontSize: '10px', color: '#666',
                letterSpacing: '0.12em', marginBottom: '6px',
                textTransform: 'uppercase',
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: '12px', color: colors.yellow,
                wordBreak: 'break-all',
              }}>
                {val}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          ...S.infoBox,
          background: '#1a1a1a', color: '#aaa',
          marginTop: '16px', fontSize: '12px',
        }}>
          <span style={{ color: colors.cyan }}>// .env (Vite)</span><br />
          VITE_API_URL=http://localhost:3000
        </div>
      </div>

      {/* Danger zone */}
      <div style={S.sectionTitle}>// DANGER ZONE</div>
      <AccentCard accent={colors.pink} S={S} colors={colors}>
      <div style={{ fontSize: '12px', color: colors.black, marginBottom: '16px', letterSpacing: '0.05em' }}>
          Aksi di bawah ini tidak dapat dibatalkan. Pastikan kamu yakin sebelum melanjutkan.
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            style={S.btn(colors.pink, resetting)}
            onClick={handleReset}
            disabled={resetting}
          >
            {resetting ? <><Spinner />MERESET...</> : 'RESET SALDO KE 0'}
          </button>
        </div>
      </AccentCard>
    </>
  );
}