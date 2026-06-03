import { useEffect, useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'

import CartWidget from './CartWidget.jsx'
import { getCategories } from '../api/products.js'

// Barra de navegación superior.
// Incluye: logo, link al Home, links a categorías y el CartWidget.
const NavBar = () => {
  const [categories, setCategories] = useState([])

  // Cargamos las categorías disponibles para el menú desplegable
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => console.error('Error cargando categorías:', err))
  }, [])

  return (
    <Navbar variant="dark" expand="lg" sticky="top" className="ts-navbar py-3">
      <Container>
        {/* Logo de la tienda */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <span className="brand-icon">
            <FontAwesomeIcon icon={faLaptopCode} />
          </span>
          <span>TechStore</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {/* Link al Home / catálogo */}
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>

            {/* Menú de categorías */}
            <NavDropdown title="Categorías" id="categories-dropdown">
              {categories.map((cat) => (
                <NavDropdown.Item
                  key={cat}
                  as={Link}
                  to={`/category/${cat}`}
                  className="text-capitalize"
                >
                  {cat}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

          {/* Widget del carrito */}
          <CartWidget />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
