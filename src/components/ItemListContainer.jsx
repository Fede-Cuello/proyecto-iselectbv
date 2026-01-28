import { useState, useEffect } from 'react'
import ItemList from './ItemList'
import { useParams } from 'react-router'
import { getProducts, getProdByCat, getProdByEstado } from "../firebase/db";
import { withLoading } from '../hoc/withLoading'
import { toast } from 'react-toastify'

const ItemsListWithLoading = withLoading (ItemList) 

export default function ItemListContainer() {
  const [items, setItems] = useState(null)
  const {categoriaElegida, estadoElegido} = useParams ()
 
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
  }, [categoriaElegida, estadoElegido])

  return (
    <div>
      <h2 className="text-center my-3">
        {categoriaElegida
          ? `Productos en categoría "${categoriaElegida}"`
          : estadoElegido
          ? `Productos en estado "${estadoElegido}"`
          : "Todos los productos"}
      </h2>
      <ItemsListWithLoading items={items} />
    </div>
  );
}