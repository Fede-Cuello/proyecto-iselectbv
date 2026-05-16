import { useNavigate } from "react-router";
import { FaMobileAlt, FaApple, FaGamepad, FaSearch } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import styles from "./CategoriesHighlight.module.css";

export default function CategoriesHighlight() {
  const navigate = useNavigate();

  const categories = [
    { name: "Apple", icon: <FaApple />, desc: "iPhone · Watch · AirPods", count: "20", path: "/category/apple", tag: "TOP" },
    { name: "Samsung", icon: <SiSamsung />, desc: "Galaxy S · A · Z Fold", count: "12", path: "/category/samsung", tag: "HOT" },
    { name: "Motorola", icon: <FaMobileAlt />, desc: "Edge · Moto G · Razr", count: "", path: "/category/motorola" },
    { name: "Xiaomi", icon: <FaMobileAlt />, desc: "Redmi · Note · 14 Pro", count: "", path: "/category/xiaomi" },
    { name: "Equipos usados", icon: <FaMobileAlt />, desc: "Equipos revisados y verificados", count: "", path: "/category/seminuevos" },
    { name: "PlayStation", icon: <FaGamepad />, desc: "Consolas y accesorios", count: "", path: "/category/consolas" },
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
              Catalogo · categorias
            </div>

            <h2 className={styles.title}>
              Explora
              <br />
              <span className={styles.grad}>por categoria</span>
            </h2>

            <p className={styles.lead}>Encontra exactamente lo que buscas.</p>
          </div>

          <aside className={styles.panel}>
            <div className={styles.chips}>
              <div className={`${styles.chip} ${styles.chipBig}`}>
                <div className={styles.chipNum}>✓</div>
                <div className={styles.chipLabel}>Tomamos tu equipo en parte de pago</div>
              </div>
              <div className={`${styles.chip} ${styles.chipBig}`}>
                <div className={styles.chipNum}>
                  <FaSearch />
                </div>
                <div className={styles.chipLabel}>Si no esta lo que buscas, lo pedimos para vos</div>
              </div>
              <div className={`${styles.chip} ${styles.chipSmall}`}>
                <div className={styles.chipNum}>24h</div>
                <div className={styles.chipLabel}>Entregas en el dia</div>
              </div>
              <div className={`${styles.chip} ${styles.chipSmall}`}>
                <div className={styles.chipNum}>★</div>
                <div className={styles.chipLabel}>Confianza · +5 años</div>
              </div>
            </div>
            <a
              href="https://wa.me/5493537673531"
              className={styles.ctaWsp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>✦</span> Consultar por WhatsApp
            </a>
            <div className={styles.online}>
              <span className={styles.dotGreen} />
              Respuesta en menos de 1 hora · garantia en todos los equipos
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.categoriesGrid}>
          {categories.map((c) => (
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
