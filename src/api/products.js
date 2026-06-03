// Capa de acceso a datos.
// Usamos la API pública FakeStore (https://fakestoreapi.com) que entrega
// productos con la forma: { id, title, price, description, category, image, rating }.
// Todas las funciones devuelven Promesas para simular/realizar llamadas asíncronas.

const BASE_URL = 'https://fakestoreapi.com'

/**
 * Obtiene el listado completo de productos.
 * @returns {Promise<Array>} array de productos
 */
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error('No se pudieron obtener los productos')
  return res.json()
}

/**
 * Obtiene los productos de una categoría específica.
 * @param {string} categoryId
 * @returns {Promise<Array>}
 */
export const getProductsByCategory = async (categoryId) => {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(categoryId)}`)
  if (!res.ok) throw new Error('No se pudieron obtener los productos de la categoría')
  return res.json()
}

/**
 * Obtiene un producto por su ID.
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('No se pudo obtener el producto')
  return res.json()
}

/**
 * Obtiene la lista de categorías disponibles.
 * @returns {Promise<Array<string>>}
 */
export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`)
  if (!res.ok) throw new Error('No se pudieron obtener las categorías')
  return res.json()
}
