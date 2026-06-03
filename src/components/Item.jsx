import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons'

// Producto individual (card de preview) dentro del catálogo.
// Muestra imagen, categoría, nombre, rating, precio y un botón al detalle.
const Item = ({ product }) => {
  const rating = product.rating?.rate ?? 0

  return (
    <Card className="product-card w-100 fade-up">
      <div className="img-wrap">
        {/* Etiqueta de categoría sobre la imagen */}
        <span className="category-tag">{product.category}</span>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          className="product-img"
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="title-clamp">{product.title}</Card.Title>

        {/* Rating del producto */}
        <div className="rating-stars mb-2">
          <FontAwesomeIcon icon={faStar} />
          <span className="ms-1 text-muted">{rating.toFixed(1)}</span>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-auto">
          <span className="price-tag">${product.price}</span>
          <Button
            as={Link}
            to={`/item/${product.id}`}
            variant="primary"
            size="sm"
            className="d-flex align-items-center gap-2"
          >
            Ver
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Item
