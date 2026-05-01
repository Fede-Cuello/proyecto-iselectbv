import { supabase } from './supabase'

/**
 * Obtener todos los productos
 * @returns {Promise<Array>} Array de productos
 */
export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error de Supabase:', error)
      throw error
    }
    
    console.log(`✅ ${data?.length || 0} productos obtenidos`)
    return data || []
  } catch (error) {
    console.error('❌ Error obteniendo productos:', error.message)
    return []
  }
}

/**
 * Obtener un producto por ID
 * @param {string|number} id - ID del producto
 * @returns {Promise<Object|null>} Producto o null
 */
export const getProduct = async (id) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error de Supabase:', error)
      throw error
    }
    
    console.log(`✅ Producto ${id} obtenido`)
    return data
  } catch (error) {
    console.error(`❌ Error obteniendo producto ${id}:`, error.message)
    return null
  }
}

/**
 * Obtener productos por categoría
 * @param {string} categoria - Nombre de la categoría (samsung, apple, consolas)
 * @returns {Promise<Array>} Array de productos
 */
export const getProdByCat = async (categoria) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('categoria', categoria.toLowerCase())
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error de Supabase:', error)
      throw error
    }
    
    console.log(`✅ ${data?.length || 0} productos en categoría "${categoria}"`)
    return data || []
  } catch (error) {
    console.error(`❌ Error obteniendo productos de categoría ${categoria}:`, error.message)
    return []
  }
}

/**
 * Obtener productos por estado
 * @param {string} estado - Estado del producto (sellados, usado)
 * @returns {Promise<Array>} Array de productos
 */
export const getProdByEstado = async (estado) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('estado', estado.toLowerCase())
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error de Supabase:', error)
      throw error
    }
    
    console.log(`✅ ${data?.length || 0} productos en estado "${estado}"`)
    return data || []
  } catch (error) {
    console.error(`❌ Error obteniendo productos por estado ${estado}:`, error.message)
    return []
  }
}

/**
 * BONUS: Función para agregar productos (útil para migración)
 * @param {Object} producto - Objeto con datos del producto
 * @returns {Promise<Object|null>} Producto creado o null
 */
export const addProduct = async (producto) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .insert([producto])
      .select()
      .single()
    
    if (error) {
      console.error('Error de Supabase:', error)
      throw error
    }
    
    console.log(`✅ Producto agregado: ${data.nombre}`)
    return data
  } catch (error) {
    console.error('❌ Error agregando producto:', error.message)
    return null
  }
}

/**
 * BONUS: Función para actualizar producto
 * @param {string|number} id - ID del producto
 * @param {Object} cambios - Objeto con cambios a aplicar
 * @returns {Promise<Object|null>} Producto actualizado o null
 */
export const updateProduct = async (id, cambios) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .update(cambios)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error de Supabase:', error)
      throw error
    }
    
    console.log(`✅ Producto ${id} actualizado`)
    return data
  } catch (error) {
    console.error(`❌ Error actualizando producto ${id}:`, error.message)
    return null
  }
}

/**
 * BONUS: Función para eliminar producto
 * @param {string|number} id - ID del producto
 * @returns {Promise<boolean>} true si se eliminó correctamente
 */
export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error de Supabase:', error)
      throw error
    }
    
    console.log(`✅ Producto ${id} eliminado`)
    return true
  } catch (error) {
    console.error(`❌ Error eliminando producto ${id}:`, error.message)
    return false
  }
}