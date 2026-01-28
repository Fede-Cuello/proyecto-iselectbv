# E-commerce App con React y Firebase

Este proyecto es una tienda online desarrollada con **React** y **Vite**. Permite mostrar productos, filtrarlos por categorías, agregarlos a un carrito, realizar una compra y guardar la orden en **Firebase Firestore**.

## 🚀 Funcionalidades principales

- Mostrar productos desde la base de datos en Firebase Firestore
- Filtrar productos por categoría
- Ver detalle de cada producto
- Agregar productos al carrito (con manejo de cantidades)
- Impedir que se agreguen cantidades negativas (se desactiva el botón de restar al llegar a 1)
- Vaciar el carrito o finalizar compra
- Generar una orden de compra y guardarla en Firebase
- Cuando el carrito está vacío, se muestran botones para volver al inicio y ocultar opciones innecesarias
- Indicadores de carga usando HOC y Spinner
- Notificaciones con `react-toastify` y `Sweet Alert`

## 📂 Estructura del proyecto

```bash
src/
│
├── components/
│   ├── CartWidget/
│   ├── Item/
│   ├── ItemDetail/
│   ├── NavBar/
│   └── (cada uno con su módulo CSS)
│
├── CartContainer.jsx
├── CartDetail.jsx
├── Checkout.jsx
├── ItemCount.jsx
├── ItemDetailContainer.jsx
├── ItemList.jsx
├── ItemListContainer.jsx
│
├── context/
│   ├── CartContext.jsx
│   └── CartProvider.jsx
│
├── firebase/
│   ├── config.js
│   └── db.js
│
├── hoc/
│   ├── withLoading.jsx
│   └── withLoadingDetail.jsx
│
└── App.jsx
```

## 📦 Dependencias utilizadas

### 🔧 Estilos

- [Bootstrap](https://getbootstrap.com/) – Componentes y sistema de grillas
- CSS Modules – Estilado encapsulado por componente

### 🌐 Routing

- [React Router](https://reactrouter.com/en/main) – Rutas dinámicas y navegación

### ☁️ Backend y base de datos

- [Firebase](https://firebase.google.com/) – Firestore Database (productos y órdenes)

### 🔔 Notificaciones

- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) – Alertas personalizadas para agregar productos, confirmar compra, etc.
- [SweetAlert2](https://sweetalert2.github.io/) – Ventanas emergentes para confirmaciones y advertencias (como vaciar el carrito)

## ✅ Buenas prácticas implementadas

- Uso de hooks (`useState`, `useEffect`, `useContext`)
- Manejo de estado global con Context API (en el carrito)
- Reutilización de lógica con HOC (`withLoading` y `withLoadingDetail`)
- Validaciones en el contador para evitar cantidades negativas
- Mensajes informativos con `toast.success()`
- Mostrar botones condicionales cuando el carrito está vacío
- Separación de responsabilidades entre componentes y lógica
- Código modular y mantenible

---

💡 Este proyecto es ideal como base para una tienda online, y puede ampliarse con autenticación, métodos de pago o panel de administración.


## 👤 Autor

**Federico Cuello**  
Técnico Mecatrónico y estudiante de Desarrollo Web Full Stack  
[LinkedIn](https://www.linkedin.com/in/federico-cuello-a233632b4/)


