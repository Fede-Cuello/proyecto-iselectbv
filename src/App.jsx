import ItemListContainer from './components/ItemListContainer'
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import ItemDetailContainer from './components/ItemDetailContainer'
import { ToastContainer } from 'react-toastify'
import Footer from "./components/Footer/Footer"
import AdminLayout from './admin/AdminLayout'
import Login from './admin/pages/Login'
import ProductList from './admin/pages/ProductList'
import ProductForm from './admin/pages/ProductForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          {/* Tienda pública */}
          <Route path="/" element={<><ItemListContainer /><Footer /></>} />
          <Route path="/category/:categoriaElegida" element={<><ItemListContainer /><Footer /></>} />
          <Route path="/estado/:estadoElegido" element={<><ItemListContainer /><Footer /></>} />
          <Route path="/item/:id" element={<><ItemDetailContainer /><Footer /></>} />

          {/* Panel admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/productos" replace />} />
            <Route path="productos" element={<ProductList />} />
            <Route path="productos/nuevo" element={<ProductForm />} />
            <Route path="productos/:id/editar" element={<ProductForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
