import { useState } from "react";
import styles from "./ItemDetail.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function ItemDetail({ item }) {
  const navigate = useNavigate();
  const [colorIndex, setColorIndex] = useState(0);
  const [storageIndex, setStorageIndex] = useState(0);

  const imagenActual = item.imagen?.[colorIndex];
  const precioActual = item.precio?.[storageIndex];
  const colorLabel = item.coloresNombres?.[colorIndex] || "";

  const categoriaLabel = item.categoria
    ? item.categoria.charAt(0).toUpperCase() + item.categoria.slice(1)
    : "";

  const whatsappMsg = encodeURIComponent(
    `Hola, estoy interesado en el producto: ${item?.nombre}` +
      (colorLabel ? `, Color: ${colorLabel}` : "") +
      (item?.almacenamiento?.[storageIndex] ? `, Almacenamiento: ${item.almacenamiento[storageIndex]}` : "") +
      `, Precio: $${precioActual} USD`
  );

  return (
    <section className={styles.detail}>
      <div className={styles.bgGrid} />
      <div className={styles.detailInner}>
        <nav className={styles.crumb}>
          <span className={styles.crumbDot}>·</span>
          <span className={styles.crumbLink} onClick={() => navigate("/")}>Catálogo</span>
          {categoriaLabel && (
            <>
              <span className={styles.sep}>/</span>
              <span className={styles.crumbLink} onClick={() => navigate(`/category/${item.categoria}`)}>
                {categoriaLabel}
              </span>
            </>
          )}
          <span className={styles.sep}>/</span>
          <span className={styles.current}>{item.nombre}</span>
        </nav>

        <div className={styles.detailGrid}>
          <div className={styles.gallery}>
            <div className={styles.imageBox}>
              {colorLabel && <span className={styles.imageTag}>{colorLabel}</span>}
              <img src={imagenActual} alt={`${item.nombre} ${colorLabel}`} />
            </div>
            {item.colores?.length > 0 && (
              <div className={styles.swatches}>
                {item.colores.map((color, index) => (
                  <button
                    key={index}
                    className={`${styles.swatch} ${colorIndex === index ? styles.swatchActive : ""}`}
                    style={{ background: color }}
                    onClick={() => setColorIndex(index)}
                    title={item.coloresNombres?.[index] || color}
                    aria-label={item.coloresNombres?.[index] || color}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              {categoriaLabel}{item.estado ? ` · ${item.estado}` : ""}
            </div>

            <h1 className={styles.title}>{item.nombre}</h1>

            {colorLabel && (
              <p className={styles.colorLine}>
                Color seleccionado · <span>{colorLabel}</span>
              </p>
            )}

            {item.descripcion && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>· Descripción</div>
                <p className={styles.desc}>{item.descripcion}</p>
              </div>
            )}

            {item.almacenamiento?.length > 0 && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>· Almacenamiento</div>
                <div className={styles.storages}>
                  {item.almacenamiento.map((alm, index) => (
                    <button
                      key={alm}
                      className={`${styles.storageBtn} ${storageIndex === index ? styles.storageBtnActive : ""}`}
                      onClick={() => setStorageIndex(index)}
                    >
                      <span className={styles.storageLabel}>{alm}</span>
                      <span className={styles.storagePrice}>USD {item.precio?.[index]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.priceCard}>
              <div>
                <div className={styles.priceLabel}>Precio final</div>
                <div className={styles.priceValue}>
                  ${precioActual} <span>USD</span>
                </div>
              </div>
              <div className={styles.stockBadge}>
                <span className={styles.dotGreen} /> En stock
              </div>
            </div>

            <div className={styles.ctas}>
              <a
                className={styles.ctaWsp}
                href={`https://wa.me/5493537301603?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> Consultar por WhatsApp
              </a>
              <button className={styles.ctaBack} onClick={() => navigate("/")}>
                ← Volver
              </button>
            </div>

            <div className={styles.meta}>
              <div>
                <div className={styles.metaLabel}>Garantía</div>
                <div className={styles.metaVal}>12 meses</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Despacho</div>
                <div className={styles.metaVal}>24h</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Estado</div>
                <div className={styles.metaVal}>
                  {item.estado
                    ? item.estado.charAt(0).toUpperCase() + item.estado.slice(1)
                    : "Sellado"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
