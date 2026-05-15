import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './Index.css'
import '@/components/PixelTransition.css';
import App from './App.jsx'
import AutoKeyCipher from '@/components/pages/AutoKeyCipher.jsx'

function AutoKeyCipherWrapper() {
  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    return () => {};
  }, []);

  return <AutoKeyCipher />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/autokeycipher" element={<AutoKeyCipherWrapper />} />
    </Routes>
  </BrowserRouter>
)