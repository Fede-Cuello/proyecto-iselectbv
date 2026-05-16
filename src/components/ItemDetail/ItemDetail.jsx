import { useMemo, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import styles from './ItemDetail.module.css'

function formatearTexto(valor = '') {
  if (String(valor).toLowerCase() === 'seminuevos') return 'Equipos usados'
  return String(valor)
    .replace(/-/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(' ')
}

export default function ItemDetail({ item }) {
  const navigate = useNavigate()
  const [colorIndex, setColorIndex] = useState(0)
  const [storageIndex, setStorageIndex] = useState(0)

  const opcionesColor = useMemo(() => {
    if (item.imagenesDetalle?.length) return item.imagenesDetalle

    return (item.imagen || []).map((url, index) => ({
      url,
      color: item.coloresNombres?.[index] || '',
      color_css: item.colores?.[index] || '#d4b495',
    }))
  }, [item])

  const colorActivo = opcionesColor[colorIndex] || opcionesColor[0] || {}
  const precioActual = item.precio?.[storageIndex]
  const monedaActual = item.moneda?.[storageIndex] || 'USD'
  const simboloMoneda = monedaActual === 'ARS' ? '$' : 'USD $'
  const colorLabel = formatearTexto(colorActivo.color)
  const categoriaLabel = formatearTexto(item.categoria)
  const estadoLabel = formatearTexto(item.estado || 'sellados')

  const whatsappMsg = encodeURIComponent(
    `Hola, estoy interesado en el producto: ${item?.nombre}` +
      (colorLabel ? `, Color: ${colorLabel}` : '') +
      (item?.almacenamiento?.[storageIndex]
        ? `, Almacenamiento: ${item.almacenamiento[storageIndex]}`
        : '') +
      `, Precio: ${monedaActual === 'ARS' ? `$${precioActual} Pesos` : `USD $${precioActual}`}`
  )

  return (
    <section className={styles.detail}>
      <div className={styles.bgGrid} />
      <div className={styles.detailInner}>
        <nav className={styles.crumb}>
          <span className={styles.crumbDot}>.</span>
          <span className={styles.crumbLink} onClick={() => navigate('/')}>
            Catalogo
          </span>
          {categoriaLabel && (
            <>
              <span className={styles.sep}>/</span>
              <span
                className={styles.crumbLink}
                onClick={() => navigate(`/category/${item.categoria}`)}
              >
                {categoriaLabel}
              </span>
            </>
          )}
          <span className={styles.sep}>/</span>
          <span className={styles.current}>{item.nombre}</span>
        </nav>

        <div className={styles.detailGrid}>
          <div className={styles.gallery}>
            {colorLabel && <span className={styles.imageTag}>{colorLabel}</span>}
            <div className={styles.imageBox}>
              <img src={colorActivo.url} alt={`${item.nombre} ${colorLabel}`.trim()} />
            </div>

            {opcionesColor.length > 0 && (
              <>
                <div className={styles.swatches}>
                  {opcionesColor.map((color, index) => {
                    const nombre = formatearTexto(color.color) || `Color ${index + 1}`
                    return (
                      <button
                        key={`${nombre}-${index}`}
                        className={`${styles.swatchCard} ${
                          colorIndex === index ? styles.swatchCardActive : ''
                        }`}
                        onClick={() => setColorIndex(index)}
                        type="button"
                      >
                        <span
                          className={`${styles.swatch} ${
                            colorIndex === index ? styles.swatchActive : ''
                          }`}
                          style={{ background: color.color_css || '#d4b495' }}
                          title={nombre}
                          aria-label={nombre}
                        />
                        <span className={styles.swatchLabel}>{nombre}</span>
                      </button>
                    )
                  })}
                </div>
                {colorLabel && (
                  <p className={styles.colorLine}>
                    Color seleccionado <span>{colorLabel}</span>
                  </p>
                )}
              </>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              {categoriaLabel}
              {item.estado ? ` · ${estadoLabel}` : ''}
            </div>

            <h1 className={styles.title}>{item.nombre}</h1>

            {item.descripcion && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>Descripcion</div>
                <p className={styles.desc}>{item.descripcion}</p>
              </div>
            )}

            {item.almacenamiento?.length > 0 && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>Almacenamiento</div>
                <div className={styles.storages}>
                  {item.almacenamiento.map((alm, index) => (
                    <button
                      key={alm}
                      className={`${styles.storageBtn} ${
                        storageIndex === index ? styles.storageBtnActive : ''
                      }`}
                      onClick={() => setStorageIndex(index)}
                      type="button"
                    >
                      <span className={styles.storageLabel}>{alm}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.priceCard}>
              <div>
                <div className={styles.priceLabel}>Precio final</div>
                <div className={styles.priceValue}>
                  {simboloMoneda}{precioActual} {monedaActual === 'ARS' && <span>Pesos</span>}
                </div>
              </div>
              <div className={styles.stockBadge}>
                <span className={styles.dotGreen} /> En stock
              </div>
            </div>

            <div className={styles.ctas}>
              <a
                className={styles.ctaWsp}
                href={`https://wa.me/5493537673531?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> Consultar por WhatsApp
              </a>
              <button className={styles.ctaBack} onClick={() => navigate('/')} type="button">
                Volver
              </button>
            </div>

            <div className={styles.meta}>
              <div>
                <div className={styles.metaLabel}>Garantia</div>
                <div className={styles.metaVal}>12 meses</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Despacho</div>
                <div className={styles.metaVal}>24h</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Estado</div>
                <div className={styles.metaVal}>{estadoLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
