import styles from "./CategoriesHighlight.module.css";
import { useNavigate } from "react-router";
import { FaMobileAlt, FaApple, FaGamepad } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";

export default function CategoriesHighlight() {
  const navigate = useNavigate();

  const categories = [
    { name: "Samsung", icon: <SiSamsung />, desc: "Galaxy S · A · Z Fold", count: "12", path: "/category/samsung", tag: "HOT" },
    { name: "Apple", icon: <FaApple />, desc: "iPhone · Watch · AirPods", count: "20", path: "/category/apple", tag: "TOP" },
    { name: "PlayStation", icon: <FaGamepad />, desc: "Consolas y accesorios", count: "8", path: "/category/consolas" },
    { name: "Usados", icon: <FaMobileAlt />, desc: "Equipos revisados y verificados", count: "15", path: "/estado/usados" },
  ];

  return (
    <>
      <section className={styles.catalogHeader}>
        <div className={styles.bgGrid} />
        <div className={styles.glow} />
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.brand}>
              <div className={styles.logoBox} onClick={() => navigate("/")}>
                <img src="/logo-circular.png" alt="IphoneSelectBV" />
              </div>
              <div>
                <div className={styles.brandName}>IphoneSelectBv</div>
                <div className={styles.brandSub}>tienda oficial</div>
              </div>
            </div>

            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              Catálogo · categorías
            </div>

            <h2 className={styles.title}>
              Explorá<br />
              <span className={styles.grad}>por categoría</span>
            </h2>

            <p className={styles.lead}>
              Encontrá exactamente lo que buscás.
            </p>
          </div>

          <aside className={styles.panel}>
            <div className={styles.chips}>
              <div className={styles.chip}>
                <div className={styles.chipNum}>✓</div>
                <div className={styles.chipLabel}>Recibimos usados</div>
              </div>
              <div className={styles.chip}>
                <div className={styles.chipNum}>24h</div>
                <div className={styles.chipLabel}>Entregas en el día</div>
              </div>
              <div className={styles.chip}>
                <div className={styles.chipNum}>→</div>
                <div className={styles.chipLabel}>Lo traemos a pedido</div>
              </div>
              <div className={styles.chip}>
                <div className={styles.chipNum}>★</div>
                <div className={styles.chipLabel}>Confianza · +5 años</div>
              </div>
            </div>
            <a href="https://wa.me/5493537301603" className={styles.ctaWsp} target="_blank" rel="noopener noreferrer">
              <span>✆</span> Consultar por WhatsApp
            </a>
            <div className={styles.online}>
              <span className={styles.dotGreen} />
              Respuesta en menos de 1 hora · garantía en todos los equipos
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.categoriesGrid}>
          {categories.map(c => (
            <article className={styles.catCard} key={c.name} onClick={() => navigate(c.path)}>
              {c.tag && <span className={styles.catCardTag}>{c.tag}</span>}
              <span className={`${styles.corner} ${styles.cornerTl}`} />
              <span className={`${styles.corner} ${styles.cornerTr}`} />
              <span className={`${styles.corner} ${styles.cornerBl}`} />
              <span className={`${styles.corner} ${styles.cornerBr}`} />
              <div className={styles.catHalo} />
              <div className={styles.catIcon}>{c.icon}</div>
              <div className={styles.catName}>{c.name}</div>
              <div className={styles.catDesc}>{c.desc}</div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
