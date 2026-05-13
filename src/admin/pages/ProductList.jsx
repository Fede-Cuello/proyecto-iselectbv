import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getAllProductsAdmin, toggleActivo, deleteProductAdmin } from '../../firebase/supabaseDb'
import styles from '../admin.module.css'

function formatearTexto(valor = '') {
  if (String(valor).toLowerCase() === 'seminuevos') return 'Semi nuevos'
  return String(valor).charAt(0).toUpperCase() + String(valor).slice(1)
}

export default function ProductList() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  const cargarProductos = async () => {
    setLoading(true)
    try {
      const data = await getAllProductsAdmin()
      setProductos(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargarProductos() }, [])

  const handleToggle = async (id, activo) => {
    try {
      await toggleActivo(id, !activo)
      setProductos(prev => prev.map(p => p.id === id ? { ...p, activo: !activo } : p))
    } catch {
      alert('Error al cambiar visibilidad')
    }
  }

  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Eliminar "${nombre}"?\n\nEsta acción no se puede deshacer.`)) return
    try {
      await deleteProductAdmin(id)
      setProductos(prev => prev.filter(p => p.id !== id))
    } catch {
      alert('Error al eliminar el producto')
    }
  }

  if (loading) return <div className={styles.loading}>Cargando productos...</div>

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Productos ({productos.length})</h1>
        <Link to="/admin/productos/nuevo" className={styles.btnPrimary}>+ Nuevo producto</Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Variantes</th>
              <th>Visible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => {
              const imgs = (p.imagenes || []).sort((a, b) => a.orden - b.orden)
              const vars = p.variantes || []
              const minPrecio = vars.length > 0 ? Math.min(...vars.map(v => v.precio)) : null
              return (
                <tr key={p.id} className={!p.activo ? styles.inactiveRow : ''}>
                  <td>
                    {imgs[0] && (
                      <img src={imgs[0].url} alt={p.nombre} className={styles.thumbImg} />
                    )}
                  </td>
                  <td>
                    <strong>{p.nombre}</strong>
                    {minPrecio != null && (
                      <>
                        <br />
                        <span className={styles.priceTag}>desde ${minPrecio}</span>
                      </>
                    )}
                  </td>
                  <td><span className={styles.badge}>{formatearTexto(p.categoria)}</span></td>
                  <td>{formatearTexto(p.estado)}</td>
                  <td>{vars.length} variante{vars.length !== 1 ? 's' : ''}</td>
                  <td>
                    <label className={styles.toggle} title={p.activo ? 'Visible' : 'Oculto'}>
                      <input
                        type="checkbox"
                        checked={p.activo}
                        onChange={() => handleToggle(p.id, p.activo)}
                      />
                      <span className={styles.toggleSlider} />
                    </label>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <Link to={`/admin/productos/${p.id}/editar`} className={styles.btnEdit}>
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.nombre)}
                        className={styles.btnDelete}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {productos.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                  No hay productos. <Link to="/admin/productos/nuevo">Crear el primero</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
