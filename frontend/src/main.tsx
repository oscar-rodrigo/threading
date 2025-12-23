import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Main.tsx loaded');

const root = document.getElementById('root');
console.log('Root element:', root);

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('App rendered');
} else {
  console.error('Root element not found!');
}
