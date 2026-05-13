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

const CATEGORIAS = ['apple', 'samsung', 'seminuevos', 'consolas']
const ESTADOS = ['sellados', 'usados']

const COLORES_GRUPOS = [
  {
    grupo: 'Apple — iPhone 13 / 13 mini',
    colores: [
      { nombre: 'Starlight',     css: '#F5E4CF' },
      { nombre: 'Midnight',      css: '#111214' },
      { nombre: 'Blue',          css: '#4F8FB5' },
      { nombre: 'Pink',          css: '#F2A7B0' },
      { nombre: 'Green',         css: '#4A9A7A' },
      { nombre: '(PRODUCT)RED',  css: '#BF0000' },
    ],
  },
  {
    grupo: 'Apple — iPhone 13 Pro / Pro Max',
    colores: [
      { nombre: 'Graphite',      css: '#4A4A4A' },
      { nombre: 'Silver',        css: '#C8C7C2' },
      { nombre: 'Gold',          css: '#D4AF7A' },
      { nombre: 'Sierra Blue',   css: '#6B9DB5' },
      { nombre: 'Alpine Green',  css: '#4A7A5A' },
    ],
  },
  {
    grupo: 'Apple — iPhone 14 / 14 Plus',
    colores: [
      { nombre: 'Starlight',     css: '#F5E4CF' },
      { nombre: 'Midnight',      css: '#111214' },
      { nombre: 'Blue',          css: '#276987' },
      { nombre: 'Purple',        css: '#9B8EB8' },
      { nombre: 'Yellow',        css: '#F5E100' },
      { nombre: '(PRODUCT)RED',  css: '#BF0000' },
    ],
  },
  {
    grupo: 'Apple — iPhone 14 Pro / Pro Max',
    colores: [
      { nombre: 'Space Black',   css: '#1A1A1A' },
      { nombre: 'Silver',        css: '#C8C7C2' },
      { nombre: 'Gold',          css: '#D4AF7A' },
      { nombre: 'Deep Purple',   css: '#4B3B6B' },
    ],
  },
  {
    grupo: 'Apple — iPhone 15 / 15 Plus',
    colores: [
      { nombre: 'Black',         css: '#1C1C1E' },
      { nombre: 'Blue',          css: '#5B9EC9' },
      { nombre: 'Green',         css: '#5A9A6A' },
      { nombre: 'Yellow',        css: '#F5E100' },
      { nombre: 'Pink',          css: '#F4B8C8' },
    ],
  },
  {
    grupo: 'Apple — iPhone 15 Pro / Pro Max',
    colores: [
      { nombre: 'Black Titanium',   css: '#2C2C2C' },
      { nombre: 'White Titanium',   css: '#E8E3DE' },
      { nombre: 'Blue Titanium',    css: '#4A7A9B' },
      { nombre: 'Natural Titanium', css: '#B5AFA0' },
    ],
  },
  {
    grupo: 'Apple — iPhone 16 / 16 Plus',
    colores: [
      { nombre: 'Ultramarine',   css: '#3B4F8C' },
      { nombre: 'Teal',          css: '#3D7A70' },
      { nombre: 'Pink',          css: '#F2A7B0' },
      { nombre: 'White',         css: '#F7F7F5' },
      { nombre: 'Black',         css: '#1C1C1E' },
    ],
  },
  {
    grupo: 'Apple — iPhone 16 Pro / Pro Max',
    colores: [
      { nombre: 'Space Black',      css: '#1A1A1A' },
      { nombre: 'Silver',           css: '#C8C7C2' },
      { nombre: 'Gold',             css: '#D4AF7A' },
      { nombre: 'Deep Blue',        css: '#1E3A5F' },
      { nombre: 'Desert Titanium',  css: '#C4A882' },
      { nombre: 'White Titanium',   css: '#E8E3DE' },
      { nombre: 'Black Titanium',   css: '#2C2C2C' },
      { nombre: 'Natural Titanium', css: '#B5AFA0' },
    ],
  },
  {
    grupo: 'Apple — iPhone 17 (2025)',
    colores: [
      { nombre: 'Lavender',      css: '#C8B8D8' },
      { nombre: 'Sage',          css: '#7A9A7A' },
      { nombre: 'Mist Blue',     css: '#87AABF' },
      { nombre: 'White',         css: '#F7F7F5' },
      { nombre: 'Black',         css: '#1C1C1E' },
      { nombre: 'Cosmic Orange', css: '#D4742A' },
    ],
  },
  {
    grupo: 'Apple — iPhone 18 Pro (rumores 2026)',
    colores: [
      { nombre: 'Light Blue',    css: '#87CEEB' },
      { nombre: 'Dark Cherry',   css: '#5A1A2A' },
      { nombre: 'Dark Gray',     css: '#3A3A3A' },
      { nombre: 'Silver',        css: '#C8C7C2' },
    ],
  },
  {
    grupo: 'Samsung — Galaxy S (general)',
    colores: [
      { nombre: 'Phantom Black',   css: '#0D0D0E' },
      { nombre: 'Phantom White',   css: '#F5F5F5' },
      { nombre: 'Ceramic White',   css: '#FAFAFA' },
      { nombre: 'Silver',          css: '#C8C7C2' },
      { nombre: 'Silver Shadow',   css: '#B8B8C0' },
      { nombre: 'Graphite',        css: '#4A4A4A' },
      { nombre: 'Sky Blue',        css: '#8FC8E8' },
      { nombre: 'Ice Blue',        css: '#A8D8E8' },
      { nombre: 'Arctic Blue',     css: '#5A9EC8' },
      { nombre: 'Navy Blue',       css: '#1B2D4A' },
      { nombre: 'Cobalt Violet',   css: '#5A4A8C' },
      { nombre: 'Bora Purple',     css: '#7B5EA7' },
      { nombre: 'Deep Purple',     css: '#4B3B6B' },
      { nombre: 'Burgundy',        css: '#6A1A2A' },
      { nombre: 'Aura Red',        css: '#CC2200' },
      { nombre: 'Rose Pink',       css: '#E8909A' },
      { nombre: 'Phantom Green',   css: '#3A6A5A' },
      { nombre: 'Emerald Green',   css: '#2A8A5A' },
      { nombre: 'Mint',            css: '#7ACFBA' },
      { nombre: 'Lime',            css: '#C8E05A' },
      { nombre: 'Yellow',          css: '#F5E100' },
      { nombre: 'Gold',            css: '#D4AF7A' },
      { nombre: 'Champagne Gold',  css: '#E8D8B8' },
      { nombre: 'Rose Gold',       css: '#E8B8A8' },
      { nombre: 'Mystic Bronze',   css: '#9A7A5A' },
      { nombre: 'Copper',          css: '#B87333' },
      { nombre: 'Cream',           css: '#F5E4D3' },
      { nombre: 'Peach',           css: '#F0C8A8' },
    ],
  },
  {
    grupo: 'Samsung — Titanio (S24 / S25 Ultra)',
    colores: [
      { nombre: 'Titanium Black',  css: '#151515' },
      { nombre: 'Titanium Gray',   css: '#6A6A6E' },
      { nombre: 'Titanium Silver', css: '#D8D8D8' },
      { nombre: 'Titanium Blue',   css: '#3A6A9B' },
      { nombre: 'Titanium Violet', css: '#6B5A9B' },
      { nombre: 'Titanium Yellow', css: '#F5D030' },
      { nombre: 'Titanium Green',  css: '#3D6A48' },
      { nombre: 'Titanium Orange', css: '#E07820' },
    ],
  },
  {
    grupo: 'Samsung — Galaxy Z (Fold / Flip)',
    colores: [
      { nombre: 'Icy Blue',        css: '#A8D8E8' },
      { nombre: 'Lavender',        css: '#C8B8D8' },
      { nombre: 'Coral',           css: '#E8785A' },
      { nombre: 'Cream',           css: '#F5E4D3' },
    ],
  },
  {
    grupo: 'Samsung — Galaxy A',
    colores: [
      { nombre: 'Awesome Black',   css: '#1C1C1E' },
      { nombre: 'Awesome White',   css: '#F7F7F5' },
      { nombre: 'Awesome Blue',    css: '#4F8FB5' },
      { nombre: 'Awesome Violet',  css: '#9B8EB8' },
      { nombre: 'Awesome Mint',    css: '#7ACFBA' },
      { nombre: 'Awesome Lime',    css: '#C8E05A' },
      { nombre: 'Awesome Peach',   css: '#F0C8A8' },
      { nombre: 'Awesome Graphite',css: '#4A4A4A' },
    ],
  },
]

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

function labelOpcion(valor) {
  if (valor === 'seminuevos') return 'Semi nuevos'
  return valor.charAt(0).toUpperCase() + valor.slice(1)
}

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
                    {labelOpcion(c)}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Estado</label>
              <select value={form.estado} onChange={e => setField('estado', e.target.value)}>
                {ESTADOS.map(estado => (
                  <option key={estado} value={estado}>
                    {labelOpcion(estado)}
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
                    <div className={styles.colorRow}>
                      <select
                        value={img.color}
                        onChange={e => {
                          const preset = COLORES_GRUPOS.flatMap(g => g.colores).find(c => c.nombre === e.target.value)
                          if (preset) {
                            updateExistente(img.id, 'color', preset.nombre)
                            updateExistente(img.id, 'color_css', preset.css)
                          }
                        }}
                        disabled={imagenesABorrar.includes(img.id)}
                      >
                        <option value="">— Elegir color —</option>
                        {COLORES_GRUPOS.map(g => (
                          <optgroup key={g.grupo} label={g.grupo}>
                            {g.colores.map(c => (
                              <option key={`${g.grupo}-${c.nombre}`} value={c.nombre}>{c.nombre}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <span className={styles.colorSwatch} style={{ background: img.color_css }} />
                    </div>
                    <input
                      type="text"
                      placeholder="O escribí el nombre manualmente"
                      value={img.color}
                      onChange={e => updateExistente(img.id, 'color', e.target.value)}
                      disabled={imagenesABorrar.includes(img.id)}
                    />
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
                    <div className={styles.colorRow}>
                      <select
                        value={img.color}
                        onChange={e => {
                          const preset = COLORES_GRUPOS.flatMap(g => g.colores).find(c => c.nombre === e.target.value)
                          if (preset) {
                            updateNueva(indice, 'color', preset.nombre)
                            updateNueva(indice, 'color_css', preset.css)
                          }
                        }}
                      >
                        <option value="">— Elegir color —</option>
                        {COLORES_GRUPOS.map(g => (
                          <optgroup key={g.grupo} label={g.grupo}>
                            {g.colores.map(c => (
                              <option key={`${g.grupo}-${c.nombre}`} value={c.nombre}>{c.nombre}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <span className={styles.colorSwatch} style={{ background: img.color_css }} />
                    </div>
                    <input
                      type="text"
                      placeholder="O escribí el nombre manualmente"
                      value={img.color}
                      onChange={e => updateNueva(indice, 'color', e.target.value)}
                    />
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
