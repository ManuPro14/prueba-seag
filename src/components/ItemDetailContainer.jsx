import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner, Alert } from 'react-bootstrap'

import ItemDetail from './ItemDetail.jsx'
import { getProductById } from '../api/products.js'

// Componente CONTENEDOR del detalle.
// Según el ID de la URL, solicita el producto y delega en <ItemDetail />.
const ItemDetailContainer = () => {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    getProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando producto...</p>
      </div>
    )
  }

  if (error) {
    return <Alert variant="danger">Ocurrió un error: {error}</Alert>
  }

  return <ItemDetail product={product} />
}

export default ItemDetailContainer
