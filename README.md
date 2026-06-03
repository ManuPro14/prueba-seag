# 🛒 TechStore — E-commerce en React

TechStore es una aplicación de comercio electrónico de productos de tecnología desarrollada como prueba técnica. Permite explorar un catálogo de productos, filtrarlos por categoría, ver el detalle de cada uno, agregarlos al carrito eligiendo la cantidad y finalizar la compra con un resumen del pedido.

El estado del carrito es **global** (vía Context API), se mantiene sincronizado en toda la interfaz en tiempo real y **persiste entre recargas** gracias a `localStorage`.

---

## 📑 Tabla de contenidos

- [Demo de funcionalidades](#-demo-de-funcionalidades)
- [Tecnologías](#-tecnologías)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y ejecución](#-instalación-y-ejecución)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Arquitectura y árbol de componentes](#-arquitectura-y-árbol-de-componentes)
- [Descripción de cada componente](#-descripción-de-cada-componente)
- [Manejo de estado: CartContext](#-manejo-de-estado-cartcontext)
- [Rutas de la aplicación](#-rutas-de-la-aplicación)
- [Origen de los datos (API)](#-origen-de-los-datos-api)
- [Flujo de datos](#-flujo-de-datos)
- [Decisiones de diseño](#-decisiones-de-diseño)

---

## ✨ Demo de funcionalidades

- 🏷️ **Catálogo de productos** con cards, imagen, rating y precio.
- 🗂️ **Filtro por categoría** desde el menú de la barra de navegación.
- 🔍 **Detalle del producto** con descripción completa, rating y reseñas.
- ➕➖ **Selector de cantidad** antes de agregar al carrito.
- 🛒 **Carrito global** con contador en vivo en el ícono del navbar.
- 🧾 **Resumen de compra** con subtotal por ítem y total general.
- 🗑️ **Eliminar productos** del carrito y **finalizar compra** (genera una orden).
- 💾 **Persistencia** del carrito en `localStorage` (sobrevive a recargas).
- 📱 **Diseño responsive** con react-bootstrap.

---

## 🚀 Tecnologías

| Herramienta | Uso |
|-------------|-----|
| **React 18** | Librería de UI (solo componentes funcionales + hooks) |
| **Vite** | Bundler y servidor de desarrollo |
| **React Router v6** | Navegación y rutas (SPA) |
| **React Bootstrap + Bootstrap 5** | Sistema de componentes y layout responsive |
| **Font Awesome** | Iconografía (solid + brands) |
| **Context API** (`useContext` + `useReducer`) | Estado global del carrito |
| **FakeStore API** | Fuente de datos real vía `fetch` |

---

## 📋 Requisitos previos

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## ⚙️ Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd prueba-tecnica-seag

# 2. Instalar dependencias
npm install

# 3. Levantar el entorno de desarrollo
npm run dev
```

La aplicación queda disponible en **http://localhost:5173**.

---

## 🧰 Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Sirve localmente el build de producción para previsualizarlo |

---

## 📁 Estructura del proyecto

```
prueba-tecnica-seag/
├── index.html                  # HTML raíz donde monta React
├── vite.config.js              # Configuración de Vite
├── package.json
└── src/
    ├── main.jsx                # Punto de entrada (Router + CartProvider + estilos)
    ├── App.jsx                 # Layout general y definición de rutas
    ├── index.css               # Sistema de diseño (paleta, tipografía, componentes)
    ├── api/
    │   └── products.js         # Llamadas a la API (productos y categorías)
    ├── context/
    │   └── CartContext.jsx     # Estado global del carrito (useContext + useReducer)
    └── components/
        ├── NavBar.jsx              # Barra de navegación + logo + categorías
        ├── CartWidget.jsx          # Ícono de carrito con contador
        ├── Footer.jsx              # Pie de página
        ├── ItemListContainer.jsx   # Contenedor del catálogo (pide datos)
        ├── ItemList.jsx            # Grilla de productos
        ├── Item.jsx                # Card de un producto individual
        ├── ItemDetailContainer.jsx # Contenedor del detalle (pide el producto por ID)
        ├── ItemDetail.jsx          # Vista de detalle del producto
        ├── ItemQuantitySelector.jsx# Selector de cantidad (+/-)
        ├── AddItemButton.jsx       # Botón para agregar al carrito
        ├── Checkout.jsx            # Vista de confirmación de compra
        ├── Brief.jsx               # Resumen por ítem (dentro de Checkout)
        └── NotFound.jsx            # Página 404
```

---

## 🏗️ Arquitectura y árbol de componentes

El proyecto sigue el patrón **Container / Presentational**:

- **Contenedores** (`*Container`): se encargan de la lógica y de pedir los datos a la API. No definen UI compleja.
- **Presentacionales**: reciben datos por `props` y solo se ocupan de mostrarlos.

```
<CartProvider>                         ← estado global del carrito
  └── <App>
        ├── <NavBar>
        │     ├── (links a categorías)
        │     └── <CartWidget>         ← lee la cantidad total del contexto
        │
        ├── <Routes>
        │     ├── "/"            → <ItemListContainer>
        │     │                       └── <ItemList>
        │     │                             └── <Item> (x N)
        │     │
        │     ├── "/category/:id"→ <ItemListContainer>  (mismo árbol, filtrado)
        │     │
        │     ├── "/item/:id"    → <ItemDetailContainer>
        │     │                       └── <ItemDetail>
        │     │                             └── <ItemQuantitySelector>
        │     │                                   └── <AddItemButton>  ← escribe en el contexto
        │     │
        │     └── "/cart"        → <Checkout>
        │                             └── <Brief>          ← lee/elimina items del contexto
        │
        └── <Footer>
```

---

## 🧩 Descripción de cada componente

| # | Componente | Responsabilidad |
|---|------------|-----------------|
| 1 | **NavBar** | Navegación superior: logo, link al inicio, menú de categorías (traídas de la API) y el `CartWidget`. |
| 2 | **CartWidget** | Ícono de carrito que muestra la cantidad total de productos. Al hacer clic navega al checkout. El contador solo aparece si hay items. |
| 3 | **ItemListContainer** | Contenedor del catálogo. Lee la categoría de la URL (si existe), solicita los productos a la API y renderiza `ItemList`. Maneja estados de carga y error. |
| 4 | **ItemList** | Recibe el array de productos por `props` y los renderiza como una grilla de `Item`. |
| 5 | **Item** | Card de un producto: imagen, categoría, rating, nombre, precio y botón "Ver". |
| 6 | **ItemDetailContainer** | Contenedor del detalle. Lee el `id` de la URL, busca el producto en la API y renderiza `ItemDetail`. |
| 7 | **ItemDetail** | Muestra la información detallada del producto e incluye el `ItemQuantitySelector`. |
| 8 | **ItemQuantitySelector** | Permite elegir la cantidad con botones +/- e incluye el `AddItemButton`. |
| 9 | **AddItemButton** | Agrega la cantidad seleccionada al carrito usando el `CartContext`. Tras agregar, muestra confirmación y acceso al carrito. |
| 10 | **CartContext** | Contexto global del carrito: agregar, eliminar, vaciar, consultar, total y cantidad total. |
| 11 | **Checkout** | Vista final de compra: muestra el resumen, el total y permite finalizar (genera una orden) o vaciar. |
| 12 | **Brief** | Detalle del carrito ítem por ítem (cantidad y subtotal). Se renderiza dentro de `Checkout`. |

> Componentes auxiliares: **Footer** (pie de página) y **NotFound** (página 404).

---

## 🧠 Manejo de estado: CartContext

El carrito es el corazón de la aplicación y se maneja con **Context API + `useReducer`**, lo que centraliza la lógica de actualización y mantiene la inmutabilidad del estado.

El contexto se consume con el hook `useCart()`, que expone:

| Propiedad / método | Tipo | Descripción |
|--------------------|------|-------------|
| `cart` | `Array` | Lista de productos en el carrito (`{ id, title, price, image, quantity }`). |
| `addItem(product, qty)` | `función` | Agrega un producto; si ya existe, suma la cantidad. |
| `removeItem(id)` | `función` | Elimina un producto del carrito. |
| `clearCart()` | `función` | Vacía el carrito por completo. |
| `isInCart(id)` | `función` | Indica si un producto ya está en el carrito. |
| `totalQuantity` | `number` | Cantidad total de items (lo usa el `CartWidget`). |
| `totalPrice` | `number` | Total a pagar (lo usa `Checkout` / `Brief`). |

**Buenas prácticas aplicadas:**
- El reducer **nunca muta el estado**: siempre retorna nuevos arrays/objetos.
- Las cantidades se actualizan con la **forma funcional** de `setState`.
- Los valores derivados (`totalQuantity`, `totalPrice`) se calculan con `useMemo`.
- El `value` del provider está memoizado para evitar renders innecesarios.
- El carrito se sincroniza con `localStorage` mediante un `useEffect`.

---

## 🗺️ Rutas de la aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `ItemListContainer` | Catálogo completo. |
| `/category/:categoryId` | `ItemListContainer` | Catálogo filtrado por categoría. |
| `/item/:id` | `ItemDetailContainer` | Detalle de un producto según su ID. |
| `/cart` | `Checkout` | Resumen de compra y confirmación. |
| `*` | `NotFound` | Página 404 para rutas inexistentes. |

---

## 🌐 Origen de los datos (API)

Los datos provienen de la API pública **[FakeStore API](https://fakestoreapi.com/)**. Cada producto tiene la forma:

```json
{
  "id": 1,
  "title": "Nombre del producto",
  "price": 109.95,
  "description": "Descripción...",
  "category": "electronics",
  "image": "https://...",
  "rating": { "rate": 3.9, "count": 120 }
}
```

Toda la comunicación se centraliza en [`src/api/products.js`](src/api/products.js):

| Función | Endpoint | Devuelve |
|---------|----------|----------|
| `getProducts()` | `/products` | Todos los productos |
| `getProductsByCategory(cat)` | `/products/category/:cat` | Productos de una categoría |
| `getProductById(id)` | `/products/:id` | Un producto |
| `getCategories()` | `/products/categories` | Lista de categorías |

Las llamadas se realizan dentro de `useEffect` en los componentes contenedores, con manejo de estados de **carga** y **error**.

---

## 🔄 Flujo de datos

**Lectura (API → UI):**
```
API (fetch) → Container (useEffect + useState) → props → Componente presentacional → UI
```

**Escritura del carrito (UI → estado global):**
```
AddItemButton → addItem() → CartContext (reducer) → re-render de todos los consumidores
                                                     (CartWidget, Checkout, Brief...)
```

Gracias al contexto, cuando se agrega un producto el contador del `CartWidget` y el resumen del `Checkout` se actualizan automáticamente, sin pasar props manualmente entre componentes lejanos.

---

## 🎨 Decisiones de diseño

- **Container / Presentational** para separar lógica de presentación.
- **Context API en lugar de prop drilling** para el carrito, requisito de la prueba.
- **`useReducer`** sobre `useState` para una lógica de carrito más predecible y testeable.
- **Persistencia en `localStorage`** para mejorar la experiencia del usuario.
- **Sistema de diseño propio** sobre Bootstrap (paleta, tipografía Plus Jakarta Sans + Inter, sombras y micro-interacciones).
- **Código comentado** en los puntos clave, explicando el porqué de cada decisión.

---

## 👤 Autor

Desarrollado como prueba técnica de desarrollador React.
