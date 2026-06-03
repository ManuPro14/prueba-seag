import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Página 404 para rutas no existentes.
const NotFound = () => (
  <div className="text-center py-5">
    <h1 className="display-4">404</h1>
    <p className="lead">La página que buscas no existe.</p>
    <Button as={Link} to="/" variant="primary">
      Volver al inicio
    </Button>
  </div>
)

export default NotFound
