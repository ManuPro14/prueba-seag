import { Badge, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { useCart } from '../context/CartContext.jsx'

// Ícono de carrito con la cantidad total de productos.
// Al hacer clic redirige al resumen de compra (/cart).
const CartWidget = () => {
  const { totalQuantity } = useCart()
  const navigate = useNavigate()

  return (
    <Button
      variant="outline-light"
      className="position-relative"
      onClick={() => navigate('/cart')}
      aria-label="Ver carrito"
    >
      <FontAwesomeIcon icon={faShoppingCart} />
      {/* El badge solo se muestra si hay productos en el carrito */}
      {totalQuantity > 0 && (
        <Badge
          bg="danger"
          pill
          className="position-absolute top-0 start-100 translate-middle"
        >
          {totalQuantity}
        </Badge>
      )}
    </Button>
  )
}

export default CartWidget
