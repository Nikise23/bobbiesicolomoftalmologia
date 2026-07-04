import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { favicon } from '@/assets/images';
import App from './App';
import './index.css';

for (const rel of ['icon', 'apple-touch-icon']) {
  const link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (link) link.href = favicon;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
