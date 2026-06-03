import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Estilos globales: Bootstrap + estilos propios
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

// Punto de entrada de la app.
// El CartProvider envuelve toda la aplicación para que el carrito
// esté disponible vía useContext en cualquier componente.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
