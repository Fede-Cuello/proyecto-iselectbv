import Item from "./Item/Item";
import styles from "./ItemList.module.css";

export default function ItemList({ items }) {
  return (
    <div className={styles.grid}>
      {items.map((prod) => (
        <Item key={prod.id} prod={prod} />
      ))}
    </div>
  );
}
