import { createContext, useContext, useReducer, useEffect, useMemo } from 'react'

// Contexto global del carrito de compras.
// Maneja: agregar, eliminar, vaciar, consultar, total y cantidad total.

const CartContext = createContext()

// Hook de conveniencia para consumir el contexto del carrito.
// Lanza un error claro si se usa fuera del Provider (lección pregunta 9).
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un <CartProvider>')
  }
  return context
}

// --- Reducer ---
// Importante: nunca mutamos el estado directamente; siempre retornamos
// un nuevo array/objeto (lección preguntas 5 y 10).
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existing = state.find((item) => item.id === product.id)

      if (existing) {
        // Si ya está en el carrito, sumamos la cantidad
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      // Si no existe, lo agregamos guardando solo lo necesario
      return [
        ...state,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        },
      ]
    }

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload.id)

    case 'CLEAR_CART':
      return []

    case 'SET_CART':
      return action.payload

    default:
      return state
  }
}

// Carga inicial: intentamos recuperar el carrito de localStorage
const getInitialCart = () => {
  try {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart)

  // Persistimos el carrito en localStorage ante cualquier cambio
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // --- Acciones expuestas ---
  const addItem = (product, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const isInCart = (id) => cart.some((item) => item.id === id)

  // --- Valores derivados ---
  const totalQuantity = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  )

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  )

  // Memoizamos el value para evitar renders innecesarios en consumidores
  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      clearCart,
      isInCart,
      totalQuantity,
      totalPrice,
    }),
    [cart, totalQuantity, totalPrice]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
