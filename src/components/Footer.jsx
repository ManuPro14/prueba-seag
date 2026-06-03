import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

// Pie de página de la tienda.
const Footer = () => (
  <footer className="ts-footer">
    <Container>
      <Row className="gy-4">
        <Col md={5}>
          <div className="d-flex align-items-center gap-2 text-white">
            <span className="brand-icon">
              <FontAwesomeIcon icon={faLaptopCode} />
            </span>
            <span className="fs-5 fw-bold">TechStore</span>
          </div>
        </Col>

        <Col md={3}>
          <h6 className="text-white mb-3">Navegación</h6>
          <ul className="list-unstyled small d-flex flex-column gap-2">
            <li><a href="/">Inicio</a></li>
            <li><a href="/cart">Carrito</a></li>
          </ul>
        </Col>

        <Col md={4}>
          <h6 className="text-white mb-3">Seguinos</h6>
          <div className="d-flex gap-3 fs-5">
            <a href="#" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" aria-label="X"><FontAwesomeIcon icon={faXTwitter} /></a>
          </div>
        </Col>
      </Row>

      <hr className="border-secondary my-4" />
      <p className="text-center small mb-0">
        © 2026 TechStore — Prueba técnica React.
      </p>
    </Container>
  </footer>
)

export default Footer
