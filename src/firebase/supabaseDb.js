import { supabase } from './supabase'

// Transforma filas de DB al formato que esperan los componentes
function normalizarNombreColor(nombre) {
  return String(nombre || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(' ')
}

function normalizar(prod) {
  const imgs = (prod.imagenes || []).sort((a, b) => a.orden - b.orden)
  const vars = (prod.variantes || [])
  return {
    ...prod,
    imagenesDetalle: imgs.map(i => ({
      url: i.url,
      color: normalizarNombreColor(i.color),
      color_css: i.color_css || i.color || '#d4b495',
    })),
    imagen: imgs.map(i => i.url),
    colores: imgs.map(i => i.color_css || i.color),
    coloresNombres: imgs.map(i => normalizarNombreColor(i.color)),
    almacenamiento: vars.map(v => v.almacenamiento),
    precio: vars.map(v => String(v.precio)),
  }
}

// ── Funciones públicas (frontend) ─────────────────────────────────────

export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*, variantes(*), imagenes(*)')
      .eq('activo', true)
      .order('orden', { ascending: true })
    if (error) throw error
    return (data || []).map(normalizar)
  } catch (error) {
    console.error('❌ Error obteniendo productos:', error.message)
    return []
  }
}

export const getProduct = async (id) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*, variantes(*), imagenes(*)')
      .eq('id', id)
      .single()
    if (error) throw error
    return normalizar(data)
  } catch (error) {
    console.error(`❌ Error obteniendo producto ${id}:`, error.message)
    return null
  }
}

export const getProdByCat = async (categoria) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*, variantes(*), imagenes(*)')
      .eq('categoria', categoria.toLowerCase())
      .eq('activo', true)
      .order('orden', { ascending: true })
    if (error) throw error
    return (data || []).map(normalizar)
  } catch (error) {
    console.error(`❌ Error obteniendo categoría ${categoria}:`, error.message)
    return []
  }
}

export const getProdByEstado = async (estado) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*, variantes(*), imagenes(*)')
      .eq('estado', estado.toLowerCase())
      .eq('activo', true)
      .order('orden', { ascending: true })
    if (error) throw error
    return (data || []).map(normalizar)
  } catch (error) {
    console.error(`❌ Error obteniendo estado ${estado}:`, error.message)
    return []
  }
}

// ── Funciones de administración ───────────────────────────────────────

export const getAllProductsAdmin = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select('*, variantes(*), imagenes(*)')
    .order('orden', { ascending: true })
  if (error) throw error
  return data || []
}

export const getProductAdmin = async (id) => {
  const { data, error } = await supabase
    .from('productos')
    .select('*, variantes(*), imagenes(*)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const createProduct = async (producto, variantes) => {
  const { data: prod, error: prodErr } = await supabase
    .from('productos')
    .insert([producto])
    .select()
    .single()
  if (prodErr) throw prodErr

  if (variantes.length > 0) {
    const { error: varErr } = await supabase
      .from('variantes')
      .insert(variantes.map(v => ({ ...v, producto_id: prod.id })))
    if (varErr) throw varErr
  }

  return prod
}

export const updateProductData = async (id, producto) => {
  const { error } = await supabase
    .from('productos')
    .update({ ...producto, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export const deleteProductAdmin = async (id) => {
  const { error } = await supabase.from('productos').delete().eq('id', id)
  if (error) throw error
}

export const toggleActivo = async (id, activo) => {
  const { error } = await supabase
    .from('productos')
    .update({ activo, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export const replaceVariantes = async (productoId, variantes) => {
  await supabase.from('variantes').delete().eq('producto_id', productoId)
  if (variantes.length > 0) {
    const { error } = await supabase
      .from('variantes')
      .insert(variantes.map(v => ({ ...v, producto_id: productoId })))
    if (error) throw error
  }
}

export const replaceImagenes = async (productoId, imagenes) => {
  await supabase.from('imagenes').delete().eq('producto_id', productoId)
  if (imagenes.length > 0) {
    const { error } = await supabase
      .from('imagenes')
      .insert(imagenes.map(i => ({ ...i, producto_id: productoId })))
    if (error) throw error
  }
}

export const insertImagenes = async (productoId, imagenes) => {
  if (imagenes.length === 0) return
  const { error } = await supabase
    .from('imagenes')
    .insert(imagenes.map(i => ({ ...i, producto_id: productoId })))
  if (error) throw error
}

export const uploadProductImage = async (productoId, file) => {
  const ext = file.name.split('.').pop().toLowerCase()
  const path = `${productoId}/${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from('productos')
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('productos').getPublicUrl(path)
  return data.publicUrl
}
