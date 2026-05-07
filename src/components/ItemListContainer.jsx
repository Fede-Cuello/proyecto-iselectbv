import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router";
import { getProducts, getProdByCat, getProdByEstado } from "../firebase/supabaseDb";
import { withLoading } from "../hoc/withLoading";
import { toast } from "react-toastify";
import Hero from "./Hero/Hero";
import CategoriesHighlight from "./CategoriesHighlight/CategoriesHighlight";
import AboutUs from "./AboutUs/AboutUs";
import styles from "./ProductsSection.module.css";

const ItemsListWithLoading = withLoading(ItemList);

export default function ItemListContainer() {
  const [items, setItems] = useState(null);
  const { categoriaElegida, estadoElegido } = useParams();
  const isHomePage = !categoriaElegida && !estadoElegido;

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        let products;
        if (categoriaElegida) {
          products = await getProdByCat(categoriaElegida.toLowerCase());
        } else if (estadoElegido) {
          products = await getProdByEstado(estadoElegido.toLowerCase());
        } else {
          products = await getProducts();
        }
        setItems(products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        toast.error("Error al cargar productos");
        setItems([]);
      }
    };
    getAllProducts();
  }, [categoriaElegida, estadoElegido]);

  const sectionTitle = categoriaElegida
    ? categoriaElegida.charAt(0).toUpperCase() + categoriaElegida.slice(1)
    : estadoElegido
    ? `Productos ${estadoElegido}`
    : "Todos nuestros productos";

  const eyebrowCount = items ? `${items.length} disponibles` : "Cargando...";

  return (
    <div>
      {isHomePage && <Hero />}
      {isHomePage && <CategoriesHighlight />}

      <section id="productos" className={styles.products}>
        <div className={styles.bgGrid} />
        <div className={styles.productsInner}>
          <header className={styles.productsHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              Catálogo · {eyebrowCount}
            </div>
            <h2 className={styles.productsTitle}>{sectionTitle}</h2>
          </header>
          <ItemsListWithLoading items={items} />
        </div>
      </section>

      {isHomePage && <AboutUs />}
    </div>
  );
}
