import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Fetch key from .env
const PUBLISHABLE_KEY = "pk_test_bmF0dXJhbC1iYXNpbGlzay05NS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY to your .env file")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)