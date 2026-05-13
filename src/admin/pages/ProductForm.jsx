import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  getProductAdmin,
  createProduct,
  updateProductData,
  replaceVariantes,
  replaceImagenes,
  insertImagenes,
  uploadProductImage,
} from '../../firebase/supabaseDb'
import styles from '../admin.module.css'

const CATEGORIAS = ['apple', 'samsung', 'consolas']
const ESTADOS = ['sellados', 'usados', 'seminuevos']

const FORM_VACIO = {
  nombre: '',
  categoria: 'apple',
  estado: 'sellados',
  descripcion: '',
  activo: true,
  destacado: false,
  orden: 0,
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
        if (!prod) {
          navigate('/admin/productos')
          return
        }

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

        setImagenesExistentes(
          (prod.imagenes || [])
            .sort((a, b) => a.orden - b.orden)
            .map(img => ({
              ...img,
              color: img.color || '',
              color_css: img.color_css || '#1c1c1e',
            }))
        )
      } catch {
        navigate('/admin/productos')
      }
    }

    cargar()
  }, [esEdicion, id, navigate])

  const setField = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const addVariante = () => setVariantes(prev => [...prev, { ...VARIANTE_VACIA }])
  const removeVariante = (indice) => setVariantes(prev => prev.filter((_, idx) => idx !== indice))
  const updateVariante = (indice, field, value) =>
    setVariantes(prev =>
      prev.map((item, idx) => (idx === indice ? { ...item, [field]: value } : item))
    )

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])
    const nuevas = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
      color: '',
      color_css: '#1c1c1e',
    }))
    setImagenesNuevas(prev => [...prev, ...nuevas])
    e.target.value = ''
  }

  const removeNueva = (indice) => {
    setImagenesNuevas(prev => {
      URL.revokeObjectURL(prev[indice].previewUrl)
      return prev.filter((_, idx) => idx !== indice)
    })
  }

  const updateNueva = (indice, field, value) =>
    setImagenesNuevas(prev =>
      prev.map((item, idx) => (idx === indice ? { ...item, [field]: value } : item))
    )

  const updateExistente = (imgId, field, value) =>
    setImagenesExistentes(prev =>
      prev.map(img => (img.id === imgId ? { ...img, [field]: value } : img))
    )

  const toggleBorrar = (imgId) =>
    setImagenesABorrar(prev =>
      prev.includes(imgId) ? prev.filter(item => item !== imgId) : [...prev, imgId]
    )

  const validar = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio'
    if (variantes.some(v => !v.almacenamiento.trim() || !v.precio)) {
      return 'Completa almacenamiento y precio en todas las variantes'
    }
    if (variantes.some(v => Number.isNaN(parseFloat(v.precio)))) {
      return 'El precio debe ser un numero'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validar()
    if (err) {
      setError(err)
      return
    }

    setSaving(true)
    setError('')

    const variantesLimpias = variantes.map(v => ({
      almacenamiento: v.almacenamiento.trim(),
      precio: parseFloat(v.precio),
      stock: parseInt(v.stock, 10) || 0,
    }))

    try {
      if (!esEdicion) {
        const nuevoProd = await createProduct(form, variantesLimpias)
        const imgs = []

        for (let i = 0; i < imagenesNuevas.length; i += 1) {
          const img = imagenesNuevas[i]
          const url = await uploadProductImage(nuevoProd.id, img.file)
          imgs.push({
            url,
            color: img.color.trim(),
            color_css: img.color_css,
            orden: i,
          })
        }

        if (imgs.length > 0) {
          await insertImagenes(nuevoProd.id, imgs)
        }
      } else {
        await updateProductData(id, form)
        await replaceVariantes(id, variantesLimpias)

        let orden = 0
        const imagenesFinales = []

        for (const img of imagenesExistentes) {
          if (!imagenesABorrar.includes(img.id)) {
            imagenesFinales.push({
              url: img.url,
              color: img.color.trim(),
              color_css: img.color_css,
              orden: orden,
            })
            orden += 1
          }
        }

        for (const img of imagenesNuevas) {
          const url = await uploadProductImage(id, img.file)
          imagenesFinales.push({
            url,
            color: img.color.trim(),
            color_css: img.color_css,
            orden: orden,
          })
          orden += 1
        }

        await replaceImagenes(id, imagenesFinales)
      }

      navigate('/admin/productos')
    } catch (err) {
      setError(err.message || 'Error al guardar. Intenta de nuevo.')
      setSaving(false)
    }
  }

  return (
    <div className={styles.formPage}>
      <h1>{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h1>

      <form onSubmit={handleSubmit}>
        <section className={styles.formSection}>
          <h3>Datos basicos</h3>
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
              <label>Categoria</label>
              <select value={form.categoria} onChange={e => setField('categoria', e.target.value)}>
                {CATEGORIAS.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Estado</label>
              <select value={form.estado} onChange={e => setField('estado', e.target.value)}>
                {ESTADOS.map(estado => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Descripcion</label>
            <textarea
              value={form.descripcion}
              onChange={e => setField('descripcion', e.target.value)}
              rows={3}
              placeholder="Descripcion opcional del producto..."
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

        <section className={styles.formSection}>
          <h3>Variantes (almacenamiento y precio)</h3>
          {variantes.map((variante, indice) => (
            <div key={indice} className={styles.varianteRow}>
              <div className={styles.formGroup}>
                <label>Almacenamiento</label>
                <input
                  placeholder="128GB"
                  value={variante.almacenamiento}
                  onChange={e => updateVariante(indice, 'almacenamiento', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Precio (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="999"
                  value={variante.precio}
                  onChange={e => updateVariante(indice, 'precio', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Stock</label>
                <input
                  type="number"
                  min="0"
                  value={variante.stock}
                  onChange={e => updateVariante(indice, 'stock', e.target.value)}
                />
              </div>
              {variantes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariante(indice)}
                  className={styles.btnRemove}
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addVariante} className={styles.btnSecondary}>
            + Agregar variante
          </button>
        </section>

        {esEdicion && imagenesExistentes.length > 0 && (
          <section className={styles.formSection}>
            <h3>Imagenes actuales</h3>
            <div className={styles.imageGrid}>
              {imagenesExistentes.map(img => (
                <div
                  key={img.id}
                  className={`${styles.imageCard} ${
                    imagenesABorrar.includes(img.id) ? styles.imageToDelete : ''
                  }`}
                >
                  <img src={img.url} alt={img.color || 'imagen'} />
                  <div className={styles.imageInfo}>
                    <span>{img.color || '-'}</span>
                    <div className={styles.colorDot} style={{ backgroundColor: img.color_css }} />
                  </div>
                  <div className={styles.imageFields}>
                    <input
                      type="text"
                      placeholder="Nombre real del color (ej: Desert Titanium)"
                      value={img.color}
                      onChange={e => updateExistente(img.id, 'color', e.target.value)}
                      disabled={imagenesABorrar.includes(img.id)}
                    />
                    <div className={styles.colorRow}>
                      <input
                        type="color"
                        value={img.color_css}
                        onChange={e => updateExistente(img.id, 'color_css', e.target.value)}
                        title="Color del selector"
                        disabled={imagenesABorrar.includes(img.id)}
                      />
                      <span>Color del selector</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleBorrar(img.id)}
                    className={styles.btnRemoveImg}
                  >
                    {imagenesABorrar.includes(img.id) ? 'Restaurar' : 'Quitar'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.formSection}>
          <h3>{esEdicion ? 'Agregar nuevas imagenes' : 'Imagenes del producto'}</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className={styles.fileInput}
          />
          {imagenesNuevas.length > 0 && (
            <div className={styles.imageGrid}>
              {imagenesNuevas.map((img, indice) => (
                <div key={indice} className={styles.imageCard}>
                  <img src={img.previewUrl} alt="nueva imagen" />
                  <div className={styles.imageFields}>
                    <input
                      type="text"
                      placeholder="Nombre real del color (ej: Desert Titanium)"
                      value={img.color}
                      onChange={e => updateNueva(indice, 'color', e.target.value)}
                    />
                    <div className={styles.colorRow}>
                      <input
                        type="color"
                        value={img.color_css}
                        onChange={e => updateNueva(indice, 'color_css', e.target.value)}
                        title="Color del selector"
                      />
                      <span>Color del selector</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNueva(indice)}
                    className={styles.btnRemoveImg}
                  >
                    Quitar
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
