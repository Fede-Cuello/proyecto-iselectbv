import styles from "./Item.module.css";
import { useNavigate } from "react-router";

export default function Item({ prod }) {
  const navigate = useNavigate();

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
        <div className={styles.price}>{prod.precio?.[0]} USD</div>
        <button className={styles.cta} onClick={() => navigate(`/item/${prod.id}`)}>
          <span>Ver más</span>
          <span>→</span>
        </button>
      </div>
    </article>
  );
}
