import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import ItemQuantitySelector from './ItemQuantitySelector.jsx'

// Componente PRESENTACIONAL del detalle de un producto.
// Muestra imagen, nombre, precio y descripción, e incluye el selector de cantidad.
const ItemDetail = ({ product }) => {
  if (!product) return null

  const rating = product.rating?.rate ?? 0
  const count = product.rating?.count ?? 0

  return (
    <div className="fade-up">
      {/* Volver al catálogo */}
      <Link to="/" className="text-decoration-none text-muted mb-3 d-inline-block">
        <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
        Volver al catálogo
      </Link>

      <Row className="g-4 align-items-center">
        <Col md={5}>
          <div className="detail-img-wrap">
            <Image src={product.image} alt={product.title} fluid className="detail-img" />
          </div>
        </Col>

        <Col md={7}>
          <span className="category-pill text-capitalize">{product.category}</span>
          <h2 className="mt-3">{product.title}</h2>

          {/* Rating */}
          <div className="d-flex align-items-center gap-2 my-2 text-muted">
            <span className="rating-stars">
              <FontAwesomeIcon icon={faStar} /> {rating.toFixed(1)}
            </span>
            <span>·</span>
            <span className="small">{count} reseñas</span>
          </div>

          <h3 className="price-tag text-primary my-3" style={{ fontSize: '2rem' }}>
            ${product.price}
          </h3>
          <p className="text-muted">{product.description}</p>

          {/* Selector de cantidad + botón para agregar al carrito */}
          <ItemQuantitySelector product={product} />
        </Col>
      </Row>
    </div>
  )
}

export default ItemDetail
