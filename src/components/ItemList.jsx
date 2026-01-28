import { Container, Row, Col } from "react-bootstrap"
import Item from "./Item/Item"




export default function ItemList({items}) {
  return (
    <Container className="my-5">
      <Row className="g-4">
        {items.map((prod) => (
           <Col key={prod.id} xs={6} sm={4} md={3}>
            <Item prod={prod} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

