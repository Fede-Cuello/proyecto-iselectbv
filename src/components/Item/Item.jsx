import styles from "./Item.module.css";
import { useNavigate } from "react-router";

export default function Item({ prod }) {
  const navigate = useNavigate();
  const moneda = prod.moneda?.[0] || 'USD'
  const simbolo = moneda === 'ARS' ? '$' : 'USD $'

  return (
    <article className={styles.prodCard}>
      <div className={styles.topbar} />
      <div className={styles.imageBox}>
        <img
          src={Array.isArray(prod.imagen) ? prod.imagen[0] : prod.imagen}
          alt={prod.nombre}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{prod.nombre}</div>
        <div className={styles.priceLabel}>Precio</div>
        <div className={styles.price}>{simbolo}{prod.precio?.[0]}</div>
        <button className={styles.cta} onClick={() => navigate(`/item/${prod.id}`)}>
          <span>Ver más</span>
          <span>→</span>
        </button>
      </div>
    </article>
  );
}
