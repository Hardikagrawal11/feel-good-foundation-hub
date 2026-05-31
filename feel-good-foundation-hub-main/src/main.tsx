import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'

const PUBLISHABLE_KEY = "pk_test_bmF0dXJhbC1iYXNpbGlzay05NS5jbGVyay5hY2NvdW50cy5kZXYk";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ClerkProvider>
  </React.StrictMode>,
)