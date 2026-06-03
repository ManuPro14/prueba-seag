import { ListGroup, Image, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { useCart } from '../context/CartContext.jsx'

// Resumen de compra: detalle por ítem con cantidad y subtotal.
// Se renderiza dentro de Checkout.
const Brief = () => {
  const { cart, removeItem } = useCart()

  return (
    <ListGroup variant="flush">
      {cart.map((item) => (
        <ListGroup.Item
          key={item.id}
          className="d-flex align-items-center gap-3 px-0"
        >
          <Image
            src={item.image}
            alt={item.title}
            style={{ width: 60, height: 60, objectFit: 'contain' }}
          />

          <div className="flex-grow-1">
            <div className="fw-semibold">{item.title}</div>
            <small className="text-muted">
              {item.quantity} × ${item.price}
            </small>
          </div>

          {/* Subtotal por ítem */}
          <div className="fw-bold">
            ${(item.price * item.quantity).toFixed(2)}
          </div>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeItem(item.id)}
            aria-label="Eliminar producto"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Brief
