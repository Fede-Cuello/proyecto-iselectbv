import { useState, useEffect } from "react"
import { useParams } from "react-router"
import ItemDetail from "./ItemDetail/ItemDetail"
import { getProduct } from "../firebase/db"
import { withLoadingDetail } from "../hoc/withLoadingDetail"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

const ItemDetailWithLoading = withLoadingDetail(ItemDetail)


export default function ItemDetailContainer() {
    const [detail, setDetail] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      const getProductById = async () => {
        try {
          const producto = await getProduct(id)
          if (producto) {
            setDetail(producto)
          } else {
              toast.warning("Error al cargar el producto")
              navigate("/")
          }
        } catch (error) {
            console.error("Error al cargar el producto:", error)
            toast.error("Hubo un error al cargar el producto")
            navigate("/")
        }
      }

      getProductById()
    }, [id])
    
    return (
        <ItemDetailWithLoading item={detail} />
    )
}