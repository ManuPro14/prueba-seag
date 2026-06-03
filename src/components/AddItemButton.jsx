import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

import { useCart } from '../context/CartContext.jsx'

// Botón que agrega la cantidad seleccionada del producto al carrito,
// usando el CartContext. Tras agregar, ofrece ir al carrito.
const AddItemButton = ({ product, quantity }) => {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  // Nota: pasamos la referencia de la función, no la invocamos (lección pregunta 6)
  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
  }

  if (added) {
    return (
      <div className="d-flex flex-column gap-2">
        <span className="text-success">
          <FontAwesomeIcon icon={faCheck} className="me-2" />
          ¡Agregado al carrito!
        </span>
        <Button as={Link} to="/cart" variant="success">
          Ir al carrito
        </Button>
      </div>
    )
  }

  return (
    <Button variant="primary" size="lg" onClick={handleAdd}>
      <FontAwesomeIcon icon={faCartPlus} className="me-2" />
      Agregar al carrito
    </Button>
  )
}

export default AddItemButton
