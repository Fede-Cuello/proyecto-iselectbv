import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router";
import { getProducts, getProdByCat, getProdByEstado } from "../firebase/supabaseDb";
import { withLoading } from "../hoc/withLoading";
import { toast } from "react-toastify";
import Hero from "./Hero/Hero";
import CategoriesHighlight from "./CategoriesHighlight/CategoriesHighlight";
import AboutUs from "./AboutUs/AboutUs";

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

  return (
    <div>
      {isHomePage && <Hero />}
      {isHomePage && <CategoriesHighlight />}

      <div id="productos" style={{ paddingTop: isHomePage ? "0" : "2rem" }}>
        <h2
          className="text-center my-3"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#0A1F44",
            paddingTop: isHomePage ? "3rem" : "0",
          }}
        >
          {categoriaElegida
            ? `${categoriaElegida.charAt(0).toUpperCase() + categoriaElegida.slice(1)}`
            : estadoElegido
              ? `Productos ${estadoElegido}`
              : "Todos nuestros productos"}
        </h2>
        <ItemsListWithLoading items={items} />
      </div>

      {isHomePage && <AboutUs />}
    </div>
  );
}
