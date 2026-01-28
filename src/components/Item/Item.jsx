import {Card , ListGroup , Button }  from "react-bootstrap"
import styles from "./Item.module.css"
import { useNavigate } from "react-router"


export default function Item({ prod }) {
  const navigate = useNavigate()
  
  return (
    <Card className={`${styles.itemCard} h-100`}>
      <Card.Img
        variant="top"
        src={prod.imagen}
        alt={prod.nombre}
        className={styles.itemImage}
      />
      <Card.Body>
        <Card.Title className={styles.itemCardTitle}>{prod.nombre}</Card.Title>
        <Card.Text className={styles.itemCardText}>
          Precio: {prod.precio[0]} USD
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <p className={styles.medidasText}>{prod.descripcion}</p>
        </ListGroup.Item>
      </ListGroup>
      <Button onClick={() => navigate(`/item/${prod.id}`)} className={styles.botonVerMas}>Ver mas</Button>
    </Card>
  );
}
