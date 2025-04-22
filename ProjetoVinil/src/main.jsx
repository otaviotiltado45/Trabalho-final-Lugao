import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Used to provide the VinilBox app title
document.title = 'VinilBox - Sua biblioteca de músicas';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);