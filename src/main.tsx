import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext'; // <-- import
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CurrencyProvider>   {/* <-- wrap */}
        <App />
      </CurrencyProvider>
    </AuthProvider>
  </React.StrictMode>
);