import { Row, Col } from 'react-bootstrap'
import Item from './Item.jsx'

// Componente PRESENTACIONAL.
// Recibe un array de productos por prop y los renderiza como una grilla de <Item />.
const ItemList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No hay productos para mostrar.</p>
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {products.map((product) => (
        <Col key={product.id} className="d-flex">
          <Item product={product} />
        </Col>
      ))}
    </Row>
  )
}

export default ItemList
