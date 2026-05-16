# ISelectBV — Tienda de celulares

Tienda online de celulares desarrollada con **React + Vite** y **Supabase** como backend. Incluye panel de administración completo para gestionar productos, variantes e imágenes.

## Funcionalidades

### Tienda pública
- Navegación por categorías: Apple, Samsung, Motorola, Xiaomi, Equipos usados, PlayStation
- Filtro de estado en páginas de marca (Apple, Samsung, Motorola, Xiaomi): Todos / Nuevos / Equipos usados
- Filtro de marca en página Equipos usados: Todas / Samsung / Motorola / Xiaomi
- Productos destacados en la home con sección separada
- Detalle de producto con selector de color, almacenamiento y precio
- Contacto directo por WhatsApp desde el detalle

### Panel de administración (`/admin`)
- Login protegido con Supabase Auth
- Listado de productos con toggle de visibilidad y eliminación
- Formulario de carga y edición de productos con:
  - Categorías: Apple, Samsung, Motorola, Xiaomi, Seminuevos, Consolas
  - Estados: Sellados / Equipos usados
  - Variantes de almacenamiento (select: 128GB, 256GB, 512GB, 1TB, 2TB)
  - Precio con moneda seleccionable: USD o Pesos $
  - Imágenes con asignación de color (selector por grupo de modelo + entrada manual)
  - Grupos de colores para iPhone 13 al 18 Pro, Galaxy S26, Galaxy Z, Galaxy A y más

## Base de datos (Supabase)

### Tablas
| Tabla | Descripción |
|-------|-------------|
| `productos` | Datos principales: nombre, categoría, estado, descripción, activo, destacado, orden |
| `variantes` | Almacenamiento, precio, stock, moneda por producto |
| `imagenes` | URL, color, color_css, orden por producto |

### Constraints relevantes
```sql
-- Estado permitido
CHECK (estado IN ('sellados', 'seminuevos'))

-- Moneda permitida
CHECK (moneda IN ('USD', 'ARS'))
```

### Storage
Las imágenes se almacenan en el bucket `productos` de Supabase Storage.

## Estructura del proyecto

```
src/
├── admin/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── ProductList.jsx
│   │   └── ProductForm.jsx
│   ├── AdminLayout.jsx
│   └── admin.module.css
│
├── components/
│   ├── NavBar/
│   ├── Hero/
│   ├── CategoriesHighlight/
│   ├── Item/
│   ├── ItemDetail/
│   ├── Footer/
│   ├── AboutUs/
│   ├── ItemList.jsx
│   ├── ItemListContainer.jsx
│   └── ItemDetailContainer.jsx
│
├── firebase/
│   ├── supabase.js       ← cliente Supabase
│   └── supabaseDb.js     ← todas las queries
│
├── hoc/
│   ├── withLoading.jsx
│   └── withLoadingDetail.jsx
│
└── App.jsx
```

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router v7 |
| Base de datos | Supabase (PostgreSQL) |
| Autenticación | Supabase Auth |
| Storage | Supabase Storage |
| Estilos | CSS Modules + Bootstrap |
| Notificaciones | React Toastify |

## Variables de entorno

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Instalación

```bash
npm install
npm run dev
```

## Autor

**Federico Cuello**  
Técnico Mecatrónico y estudiante de Desarrollo Web Full Stack  
[LinkedIn](https://www.linkedin.com/in/federico-cuello-a233632b4/)
