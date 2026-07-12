import { useState, useEffect, useCallback, useRef } from 'react';
import { api, API_BASE } from '../pages/DesignSystem';

export function useTabungan() {
  // ── Data state ────────────────────────────────────────
  const [summary, setSummary] = useState(null);
  const [transaksi, setTransaksi] = useState([]);
  const [loadingSum, setLoadingSum] = useState(true);
  const [loadingTx, setLoadingTx] = useState(true);

  // ── Settings state ────────────────────────────────────
  const [targetInput, setTargetInput] = useState('');
  const [savingTarget, setSavingTarget] = useState(false);
  const [pinLama, setPinLama] = useState('');
  const [pinBaru, setPinBaru] = useState('');
  const [pinKonfirmasi, setPinKonfirmasi] = useState('');
  const [savingPin, setSavingPin] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [txPage, setTxPage] = useState(1);
  const TX_PER_PAGE = 20;

  // ── Toast ─────────────────────────────────────────────
  const [toast, setToast] = useState({ msg: '', type: '' });
  const toastRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast({ msg: '', type: '' }), 3500);
  };

  // ── Fetch summary (dengan loading — untuk initial & manual refresh) ──
  const fetchSummary = useCallback(async () => {
    setLoadingSum(true);
    try {
      const res = await api.get('/api/transaksi/summary');
      if (res.success) {
        setSummary(res.data);
        setTargetInput(String(res.data.target || 500000));
      }
    } catch {
      showToast('Gagal terhubung ke server', 'error');
    } finally {
      setLoadingSum(false);
    }
  }, []);

  // ── Fetch transaksi (dengan loading — untuk initial & manual refresh) ──
  const fetchTransaksi = useCallback(async () => {
    setLoadingTx(true);
    try {
      const res = await api.get('/api/transaksi');
      if (res.success) setTransaksi(res.data);
    } catch {
      showToast('Gagal memuat transaksi', 'error');
    } finally {
      setLoadingTx(false);
    }
  }, []);

  // ── Fetch summary SILENT (tanpa loading — khusus SSE trigger) ────────
  const fetchSummarySilent = useCallback(async () => {
    try {
      const res = await api.get('/api/transaksi/summary');
      if (res.success) {
        setSummary(res.data);
        setTargetInput(String(res.data.target || 500000));
      }
    } catch {
      /* silent, tidak tampilkan toast */
    }
  }, []);

  // ── Fetch transaksi SILENT (tanpa loading — khusus SSE trigger) ───────
  const fetchTransaksiSilent = useCallback(async () => {
    try {
      const res = await api.get('/api/transaksi');
      if (res.success) setTransaksi(res.data);
    } catch {
      /* silent */
    }
  }, []);

  // ── Initial load (dengan loading spinner) ─────────────
  useEffect(() => {
    fetchSummary();
    fetchTransaksi();
  }, [fetchSummary, fetchTransaksi]);

  // ── SSE real-time — silent refresh tanpa loading/kedip ────────────────
  useEffect(() => {
    const es = new EventSource(`${API_BASE}/api/transaksi/stream`);

    es.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (payload.type === 'transaksi_baru') {
          fetchSummarySilent();
          fetchTransaksiSilent();
        }
      } catch {
        /* abaikan pesan non-JSON */
      }
    };

    es.onerror = () => {
      // Browser otomatis reconnect — tidak perlu handling manual
    };

    return () => es.close();
  }, [fetchSummarySilent, fetchTransaksiSilent]);

  // ── Handlers ──────────────────────────────────────────
  const handleSaveTarget = async () => {
    const val = parseInt(targetInput);
    if (!val || val <= 0) return showToast('Target tidak valid', 'error');
    setSavingTarget(true);
    try {
      const res = await api.put('/api/settings/target', { target: val });
      if (res.success) {
        showToast('Target berhasil disimpan!');
        fetchSummary();
      } else {
        showToast(res.message || 'Gagal simpan target', 'error');
      }
    } catch {
      showToast('Gagal terhubung ke server', 'error');
    } finally {
      setSavingTarget(false);
    }
  };

  const handleChangePin = async () => {
    if (!pinLama || !pinBaru || !pinKonfirmasi) return showToast('Semua field PIN wajib diisi', 'error');
    if (pinBaru.length !== 6 || isNaN(pinBaru)) return showToast('PIN baru harus 6 digit angka', 'error');
    if (pinBaru !== pinKonfirmasi) return showToast('Konfirmasi PIN tidak cocok', 'error');
    setSavingPin(true);
    try {
      const res = await api.put('/api/settings/pin/change', { pinLama, pinBaru });
      if (res.success) {
        showToast('PIN berhasil diubah!');
        setPinLama('');
        setPinBaru('');
        setPinKonfirmasi('');
      } else {
        showToast(res.message || 'Gagal ganti PIN', 'error');
      }
    } catch {
      showToast('Gagal terhubung ke server', 'error');
    } finally {
      setSavingPin(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('YAKIN reset saldo ke 0? Aksi ini tidak dapat dibatalkan!')) return;
    setResetting(true);
    try {
      const res = await api.delete('/api/settings/reset');
      if (res.success) {
        showToast('Saldo direset ke 0');
        fetchSummary();
        fetchTransaksi();
      } else {
        showToast(res.message || 'Gagal reset', 'error');
      }
    } catch {
      showToast('Gagal terhubung ke server', 'error');
    } finally {
      setResetting(false);
    }
  };

  const handleDeleteTx = async (id) => {
    if (!window.confirm('Hapus transaksi ini?')) return;
    try {
      const res = await api.delete(`/api/transaksi/${id}`);
      if (res.success) {
        showToast('Transaksi dihapus');
        fetchTransaksi();
        fetchSummary();
      } else {
        showToast(res.message || 'Gagal hapus', 'error');
      }
    } catch {
      showToast('Gagal terhubung ke server', 'error');
    }
  };

  // ── Derived values ────────────────────────────────────
  const saldo = summary?.saldo ?? 0;
  const target = summary?.target ?? 500000;
  const totalIn = summary?.totalIn ?? 0;
  const totalOut = summary?.totalOut ?? 0;
  const depCount = summary?.depositCount ?? 0;
  const withCount = summary?.withdrawCount ?? 0;
  const deviceInfo = summary?.deviceInfo ?? {};
  const pct = Math.min(100, Math.round((saldo / target) * 100));
  const online = !!deviceInfo?.lastSeen;
  const deposits = transaksi.filter((t) => t.type === 'deposit');
  const withdraws = transaksi.filter((t) => t.type === 'withdraw');
  const totalTxPages = (filterKey) => {
    const filtered = filterKey === 'all' ? transaksi : transaksi.filter((t) => t.type === filterKey);
    return Math.ceil(filtered.length / TX_PER_PAGE) || 1;
  };
  const paginateTx = (arr) => arr.slice((txPage - 1) * TX_PER_PAGE, txPage * TX_PER_PAGE);
  return {
    // data
    summary,
    transaksi,
    loadingSum,
    loadingTx,
    fetchSummary,
    fetchTransaksi,
    // derived
    saldo,
    target,
    totalIn,
    totalOut,
    depCount,
    withCount,
    deviceInfo,
    pct,
    online,
    deposits,
    withdraws,
    // settings
    targetInput,
    setTargetInput,
    savingTarget,
    handleSaveTarget,
    pinLama,
    setPinLama,
    pinBaru,
    setPinBaru,
    pinKonfirmasi,
    setPinKonfirmasi,
    savingPin,
    handleChangePin,
    resetting,
    handleReset,
    handleDeleteTx,
    txPage,
    setTxPage,
    TX_PER_PAGE,
    totalTxPages,
    paginateTx,
    // toast
    toast,
  };
}
