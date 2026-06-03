import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import ItemDetailContainer from './components/ItemDetailContainer.jsx'
import Checkout from './components/Checkout.jsx'
import NotFound from './components/NotFound.jsx'

// Componente raíz: navbar, árbol de rutas y footer.
// Usamos un layout flex en columna para que el footer quede siempre abajo.
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />

      <main className="flex-grow-1">
        <Container className="py-4">
          <Routes>
            {/* Home / catálogo completo */}
            <Route
              path="/"
              element={<ItemListContainer greeting="Bienvenido a TechStore" />}
            />
            {/* Catálogo filtrado por categoría */}
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            {/* Detalle de un producto */}
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            {/* Resumen de compra / checkout */}
            <Route path="/cart" element={<Checkout />} />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default App
