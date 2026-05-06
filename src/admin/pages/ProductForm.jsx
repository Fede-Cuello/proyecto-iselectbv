import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  getProductAdmin, createProduct, updateProductData,
  replaceVariantes, replaceImagenes, insertImagenes, uploadProductImage
} from '../../firebase/supabaseDb'
import styles from '../admin.module.css'

const CATEGORIAS = ['apple', 'samsung', 'consolas']
const ESTADOS = ['sellados', 'usado']

const FORM_VACIO = {
  nombre: '', categoria: 'apple', estado: 'sellados',
  descripcion: '', activo: true, destacado: false, orden: 0
}

const VARIANTE_VACIA = { almacenamiento: '', precio: '', stock: 0 }

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [form, setForm] = useState(FORM_VACIO)
  const [variantes, setVariantes] = useState([{ ...VARIANTE_VACIA }])
  const [imagenesExistentes, setImagenesExistentes] = useState([])
  const [imagenesABorrar, setImagenesABorrar] = useState([])
  const [imagenesNuevas, setImagenesNuevas] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!esEdicion) return
    const cargar = async () => {
      try {
        const prod = await getProductAdmin(id)
        if (!prod) return navigate('/admin/productos')
        setForm({
          nombre: prod.nombre,
          categoria: prod.categoria,
          estado: prod.estado,
          descripcion: prod.descripcion || '',
          activo: prod.activo,
          destacado: prod.destacado,
          orden: prod.orden,
        })
        setVariantes(
          prod.variantes.length > 0
            ? prod.variantes.map(v => ({
                almacenamiento: v.almacenamiento,
                precio: String(v.precio),
                stock: v.stock,
              }))
            : [{ ...VARIANTE_VACIA }]
        )
        setImagenesExistentes((prod.imagenes || []).sort((a, b) => a.orden - b.orden))
      } catch {
        navigate('/admin/productos')
      }
    }
    cargar()
  }, [id])

  const setField = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const addVariante = () => setVariantes(v => [...v, { ...VARIANTE_VACIA }])
  const removeVariante = (i) => setVariantes(v => v.filter((_, idx) => idx !== i))
  const updateVariante = (i, field, val) =>
    setVariantes(v => v.map((item, idx) => idx === i ? { ...item, [field]: val } : item))

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    const nuevas = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      color: '',
      color_css: '#1c1c1e',
    }))
    setImagenesNuevas(prev => [...prev, ...nuevas])
    e.target.value = ''
  }

  const removeNueva = (i) => {
    setImagenesNuevas(prev => {
      URL.revokeObjectURL(prev[i].previewUrl)
      return prev.filter((_, idx) => idx !== i)
    })
  }

  const updateNueva = (i, field, val) =>
    setImagenesNuevas(prev => prev.map((x, idx) => idx === i ? { ...x, [field]: val } : x))

  const toggleBorrar = (imgId) =>
    setImagenesABorrar(prev =>
      prev.includes(imgId) ? prev.filter(x => x !== imgId) : [...prev, imgId]
    )

  const validar = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio'
    if (variantes.some(v => !v.almacenamiento.trim() || !v.precio)) return 'Completá almacenamiento y precio en todas las variantes'
    if (variantes.some(v => isNaN(parseFloat(v.precio)))) return 'El precio debe ser un número'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validar()
    if (err) { setError(err); return }
    setSaving(true)
    setError('')

    const variantesLimpias = variantes.map(v => ({
      almacenamiento: v.almacenamiento.trim(),
      precio: parseFloat(v.precio),
      stock: parseInt(v.stock) || 0,
    }))

    try {
      if (!esEdicion) {
        // Crear producto + variantes
        const nuevoProd = await createProduct(form, variantesLimpias)

        // Subir imágenes y guardar en tabla imagenes
        const imgs = []
        for (let i = 0; i < imagenesNuevas.length; i++) {
          const img = imagenesNuevas[i]
          const url = await uploadProductImage(nuevoProd.id, img.file)
          imgs.push({ url, color: img.color, color_css: img.color_css, orden: i })
        }
        if (imgs.length > 0) {
          await insertImagenes(nuevoProd.id, imgs)
        }
      } else {
        // Actualizar datos del producto
        await updateProductData(id, form)

        // Reemplazar variantes
        await replaceVariantes(id, variantesLimpias)

        // Construir lista final de imágenes
        let orden = 0
        const imagenesFinales = []

        // Mantener las existentes no borradas
        for (const img of imagenesExistentes) {
          if (!imagenesABorrar.includes(img.id)) {
            imagenesFinales.push({
              url: img.url,
              color: img.color,
              color_css: img.color_css,
              orden: orden++,
            })
          }
        }

        // Subir y agregar las nuevas
        for (const img of imagenesNuevas) {
          const url = await uploadProductImage(id, img.file)
          imagenesFinales.push({ url, color: img.color, color_css: img.color_css, orden: orden++ })
        }

        await replaceImagenes(id, imagenesFinales)
      }

      navigate('/admin/productos')
    } catch (err) {
      setError(err.message || 'Error al guardar. Intentá de nuevo.')
      setSaving(false)
    }
  }

  return (
    <div className={styles.formPage}>
      <h1>{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h1>

      <form onSubmit={handleSubmit}>
        {/* Datos básicos */}
        <section className={styles.formSection}>
          <h3>Datos básicos</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Nombre *</label>
              <input
                value={form.nombre}
                onChange={e => setField('nombre', e.target.value)}
                placeholder="iPhone 16 Pro 128GB"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Categoría</label>
              <select value={form.categoria} onChange={e => setField('categoria', e.target.value)}>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Estado</label>
              <select value={form.estado} onChange={e => setField('estado', e.target.value)}>
                {ESTADOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Orden (número menor aparece primero)</label>
              <input
                type="number"
                value={form.orden}
                onChange={e => setField('orden', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={e => setField('descripcion', e.target.value)}
              rows={3}
              placeholder="Descripción opcional del producto..."
            />
          </div>
          <div className={styles.checkboxRow}>
            <label>
              <input
                type="checkbox"
                checked={form.activo}
                onChange={e => setField('activo', e.target.checked)}
              />
              Visible en la tienda
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.destacado}
                onChange={e => setField('destacado', e.target.checked)}
              />
              Producto destacado
            </label>
          </div>
        </section>

        {/* Variantes */}
        <section className={styles.formSection}>
          <h3>Variantes (almacenamiento y precio)</h3>
          {variantes.map((v, i) => (
            <div key={i} className={styles.varianteRow}>
              <div className={styles.formGroup}>
                <label>Almacenamiento</label>
                <input
                  placeholder="128GB"
                  value={v.almacenamiento}
                  onChange={e => updateVariante(i, 'almacenamiento', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Precio (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="999"
                  value={v.precio}
                  onChange={e => updateVariante(i, 'precio', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Stock</label>
                <input
                  type="number"
                  min="0"
                  value={v.stock}
                  onChange={e => updateVariante(i, 'stock', e.target.value)}
                />
              </div>
              {variantes.length > 1 && (
                <button type="button" onClick={() => removeVariante(i)} className={styles.btnRemove}>
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addVariante} className={styles.btnSecondary}>
            + Agregar variante
          </button>
        </section>

        {/* Imágenes actuales (solo edición) */}
        {esEdicion && imagenesExistentes.length > 0 && (
          <section className={styles.formSection}>
            <h3>Imágenes actuales</h3>
            <div className={styles.imageGrid}>
              {imagenesExistentes.map(img => (
                <div
                  key={img.id}
                  className={`${styles.imageCard} ${imagenesABorrar.includes(img.id) ? styles.imageToDelete : ''}`}
                >
                  <img src={img.url} alt={img.color || 'imagen'} />
                  <div className={styles.imageInfo}>
                    <span>{img.color || '—'}</span>
                    {img.color_css && (
                      <div className={styles.colorDot} style={{ backgroundColor: img.color_css }} />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleBorrar(img.id)}
                    className={styles.btnRemoveImg}
                  >
                    {imagenesABorrar.includes(img.id) ? '↩ Restaurar' : '✕ Quitar'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Nuevas imágenes */}
        <section className={styles.formSection}>
          <h3>{esEdicion ? 'Agregar nuevas imágenes' : 'Imágenes del producto'}</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className={styles.fileInput}
          />
          {imagenesNuevas.length > 0 && (
            <div className={styles.imageGrid}>
              {imagenesNuevas.map((img, i) => (
                <div key={i} className={styles.imageCard}>
                  <img src={img.previewUrl} alt="nueva imagen" />
                  <div className={styles.imageFields}>
                    <input
                      type="text"
                      placeholder="Nombre del color (ej: Negro)"
                      value={img.color}
                      onChange={e => updateNueva(i, 'color', e.target.value)}
                    />
                    <div className={styles.colorRow}>
                      <input
                        type="color"
                        value={img.color_css}
                        onChange={e => updateNueva(i, 'color_css', e.target.value)}
                        title="Color del selector"
                      />
                      <span>Color del botón</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeNueva(i)} className={styles.btnRemoveImg}>
                    ✕ Quitar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {error && <p className={styles.errorMsg}>{error}</p>}

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => navigate('/admin/productos')}
            className={styles.btnSecondary}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.btnPrimary} disabled={saving}>
            {saving ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </form>
    </div>
  )
}
