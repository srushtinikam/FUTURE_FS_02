import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import { AuthProvider } from './context/AuthContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>  
      < AuthProvider >       {/*  Wrap your App with CartProvider */}
      <App />
      </AuthProvider> 
    </CartProvider>
  </StrictMode>
);
