import { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCartShopping } from '@fortawesome/free-solid-svg-icons'

import Brief from './Brief.jsx'
import { useCart } from '../context/CartContext.jsx'

// Vista final para confirmar la compra.
// Muestra el resumen (Brief), el total y permite finalizar la compra.
const Checkout = () => {
  const { cart, totalPrice, totalQuantity, clearCart } = useCart()
  const [orderId, setOrderId] = useState(null)

  // Simula la generación de una orden de compra
  const handleFinish = () => {
    // ID de orden mock (sin Date.now/Math.random para mantenerlo simple)
    const id = 'ORD-' + (1000 + totalQuantity)
    setOrderId(id)
    clearCart()
  }

  // Confirmación de compra finalizada
  if (orderId) {
    return (
      <Alert variant="success" className="text-center py-5">
        <FontAwesomeIcon icon={faCircleCheck} size="3x" className="mb-3" />
        <h3>¡Gracias por tu compra!</h3>
        <p>
          Tu orden <strong>{orderId}</strong> se ha generado correctamente.
        </p>
        <Button as={Link} to="/" variant="success">
          Seguir comprando
        </Button>
      </Alert>
    )
  }

  // Carrito vacío
  if (cart.length === 0) {
    return (
      <div className="text-center py-5">
        <FontAwesomeIcon icon={faCartShopping} size="3x" className="text-muted mb-3" />
        <h4>Tu carrito está vacío</h4>
        <Button as={Link} to="/" variant="primary" className="mt-3">
          Ver catálogo
        </Button>
      </div>
    )
  }

  return (
    <Card className="ts-panel fade-up">
      <Card.Header as="h4" className="bg-white border-0 pt-4 px-4">
        Resumen de compra
      </Card.Header>
      <Card.Body>
        {/* Detalle de productos */}
        <Brief />

        {/* Total a pagar */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4 className="mb-0">Total:</h4>
          <h4 className="mb-0 text-primary">${totalPrice.toFixed(2)}</h4>
        </div>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-between bg-white border-0 pb-4 px-4">
        <Button as={Link} to="/" variant="outline-secondary">
          Seguir comprando
        </Button>
        <Button variant="success" onClick={handleFinish}>
          Finalizar compra
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default Checkout
