import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './Index.css'
import '@/components/PixelTransition.css';
import App from './App.jsx'
import AutoKeyCipher from '@/pages/AutoKeyCipher.jsx'
import TabunganDigital from '@/pages/TabunganDigital'

function AutoKeyCipherWrapper() {
  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    return () => {};
  }, []);

  return <AutoKeyCipher />;
}

function TabunganDigitalWrapper() {
  useEffect(() => {
    // Simpan semua style lama
    const prevBodyStyle   = document.body.style.cssText;
    const prevHtmlStyle   = document.documentElement.style.cssText;
    const prevRootStyle   = document.getElementById('root')?.style.cssText || '';

    // Override html + body + #root sekaligus
    const bg = `
      background-color: #F5F4ED !important;
      background-image: radial-gradient(#0A0A0A 1px, transparent 1px) !important;
      background-size: 24px 24px !important;
    `;

    document.documentElement.style.cssText = `
      background-color: #F5F4ED !important;
      overflow: auto !important;
    `;
    document.body.style.cssText = bg + `
      min-height: 100vh;
      color: #0A0A0A !important;
    `;

    const root = document.getElementById('root');
    if (root) {
      root.style.cssText = `background-color: #F5F4ED !important;`;
    }

    // Restore saat navigasi ke halaman lain
    return () => {
      document.documentElement.style.cssText = prevHtmlStyle;
      document.body.style.cssText = prevBodyStyle;
      if (root) root.style.cssText = prevRootStyle;
    };
  }, []);

  return <TabunganDigital />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/autokeycipher" element={<AutoKeyCipherWrapper />} />
      <Route path="/digital-fund" element={<TabunganDigitalWrapper />} />
    </Routes>
  </BrowserRouter>
)