import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import AddItemButton from './AddItemButton.jsx'

// Permite seleccionar la cantidad a agregar al carrito.
// Incluye botones +/- y el AddItemButton para confirmar.
const ItemQuantitySelector = ({ product }) => {
  const [quantity, setQuantity] = useState(1)

  // Usamos la forma funcional de setState (lección pregunta 2)
  const increase = () => setQuantity((prev) => prev + 1)
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="d-flex flex-column gap-3 mt-4" style={{ maxWidth: 340 }}>
      <div className="d-flex align-items-center gap-3">
        <span className="text-muted fw-semibold">Cantidad</span>
        <div className="qty-control d-flex align-items-center gap-2">
          <Button variant="light" className="border" onClick={decrease} aria-label="Disminuir">
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <span className="qty-value">{quantity}</span>
          <Button variant="light" className="border" onClick={increase} aria-label="Aumentar">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>

      {/* Botón que confirma la adición al carrito */}
      <AddItemButton product={product} quantity={quantity} />
    </div>
  )
}

export default ItemQuantitySelector
