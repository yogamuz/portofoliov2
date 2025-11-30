import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Index.css'
import '@/components/PixelTransition.css';

import './i18n'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
