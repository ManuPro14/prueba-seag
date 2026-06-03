import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner, Alert } from 'react-bootstrap'

import ItemList from './ItemList.jsx'
import { getProducts, getProductsByCategory } from '../api/products.js'

// Componente CONTENEDOR del catálogo.
// Recibe un saludo por prop, lee la categoría de la URL (si existe),
// solicita los datos a la API y delega el render en <ItemList />.
const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Volvemos a pedir datos cada vez que cambia la categoría de la URL.
  // categoryId es dependencia del efecto (lección pregunta 4).
  useEffect(() => {
    setLoading(true)
    setError(null)

    const request = categoryId
      ? getProductsByCategory(categoryId)
      : getProducts()

    request
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [categoryId])

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <Spinner animation="border" style={{ color: 'var(--ts-primary)' }} role="status" />
        <p className="mt-3 text-muted">Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return <Alert variant="danger">Ocurrió un error: {error}</Alert>
  }

  return (
    <section>
      {/* Encabezado: nombre de la categoría (URL) o saludo (prop) */}
      <div className="mb-4 fade-up">
        <p className="text-muted mb-1">{categoryId ? 'Categoría' : 'Catálogo'}</p>
        <h2 className="text-capitalize mb-0">{categoryId || greeting}</h2>
        <span className="text-muted small">{products.length} productos</span>
      </div>

      <ItemList products={products} />
    </section>
  )
}

export default ItemListContainer
