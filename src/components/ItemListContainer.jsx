import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { getProducts, getProdByCat, getProdByEstado } from '../firebase/supabaseDb'
import { withLoading } from '../hoc/withLoading'
import CategoriesHighlight from './CategoriesHighlight/CategoriesHighlight'
import AboutUs from './AboutUs/AboutUs'
import ItemList from './ItemList'
import styles from './ProductsSection.module.css'

const ItemsListWithLoading = withLoading(ItemList)

function formatearTexto(valor = '') {
  if (String(valor).toLowerCase() === 'seminuevos') return 'Semi nuevos'
  return String(valor)
    .replace(/-/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(' ')
}

function ordenarProductos(productos = []) {
  return [...productos].sort((a, b) => {
    if (Boolean(a.destacado) !== Boolean(b.destacado)) {
      return a.destacado ? -1 : 1
    }

    return (a.orden ?? 0) - (b.orden ?? 0)
  })
}

export default function ItemListContainer() {
  const [items, setItems] = useState(null)
  const { categoriaElegida, estadoElegido } = useParams()
  const isHomePage = !categoriaElegida && !estadoElegido
  const navigate = useNavigate()

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        let products

        if (categoriaElegida) {
          products = await getProdByCat(categoriaElegida.toLowerCase())
        } else if (estadoElegido) {
          products = await getProdByEstado(estadoElegido.toLowerCase())
        } else {
          products = await getProducts()
        }

        setItems(ordenarProductos(products))
      } catch (error) {
        console.error('Error al obtener productos:', error)
        toast.error('Error al cargar productos')
        setItems([])
      }
    }

    getAllProducts()
  }, [categoriaElegida, estadoElegido])

  const destacados = useMemo(
    () => (Array.isArray(items) ? items.filter(item => item.destacado) : []),
    [items]
  )

  const productosRestantes = useMemo(
    () => (Array.isArray(items) ? items.filter(item => !item.destacado) : items),
    [items]
  )
  const mostrarCatalogoGeneral =
    !isHomePage ||
    !Array.isArray(items) ||
    destacados.length === 0 ||
    productosRestantes.length > 0

  const sectionTitle = categoriaElegida
    ? formatearTexto(categoriaElegida)
    : estadoElegido
      ? `Productos ${formatearTexto(estadoElegido)}`
      : 'Todos nuestros productos'

  const eyebrowCount = items ? `${items.length} disponibles` : 'Cargando...'

  return (
    <div>
      {isHomePage && <CategoriesHighlight />}

      <section id="productos" className={styles.products}>
        <div className={styles.bgGrid} />
        <div className={styles.productsInner}>
          {!isHomePage && (
            <div className={styles.backBar}>
              <button className={styles.backBtn} onClick={() => navigate('/')}>
                Volver al inicio
              </button>
            </div>
          )}

          <header className={styles.productsHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              Catalogo · {eyebrowCount}
            </div>
            <h2 className={styles.productsTitle}>{sectionTitle}</h2>
          </header>

          {isHomePage && destacados.length > 0 && (
            <section className={styles.featuredBlock}>
              <div className={styles.featuredHeader}>
                <div className={styles.featuredEyebrow}>Mira primero</div>
                <h3 className={styles.featuredTitle}>Productos destacados</h3>
                <p className={styles.featuredText}>
                  Seleccionamos estos equipos para que los veas antes que el resto.
                </p>
              </div>
              <ItemList items={destacados} />
            </section>
          )}

          {mostrarCatalogoGeneral && (
            <section className={styles.catalogBlock}>
              {isHomePage && destacados.length > 0 && productosRestantes.length > 0 && (
              <div className={styles.subHeader}>
                <div className={styles.subEyebrow}>Todo el catalogo</div>
                <h3 className={styles.subTitle}>Mas productos para elegir</h3>
              </div>
              )}
              <ItemsListWithLoading
                items={isHomePage && destacados.length > 0 ? productosRestantes : items}
              />
            </section>
          )}
        </div>
      </section>

      {isHomePage && <AboutUs />}
    </div>
  )
}
