import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "./ItemDetail.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function ItemDetail({ item }) {
  const navigate = useNavigate();
  const [imagenActual, setImagenActual] = useState(item.imagen[0]);
  const [precioActual, setPrecioActual] = useState(item.precio[0]);

  const handleAlmacenamientoChange = (index) => {
    setPrecioActual(item.precio[index]);
  };

  return (
    <Container className="mt-4">
      <Card className={styles.itemDetailCard}>
        <Row className="g-0">
          {/* Imagen a la izquierda */}
          <Col md={6} className={styles.imageCol}>
            <Card.Img
              src={imagenActual}
              alt={item.nombre}
              className={styles.detailImage}
            />
            {/* Selector de colores debajo de la imagen */}
            {item.colores.length > 0 && (
              <div className={styles.colorSelector}>
                {item.colores.map((color, index) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`${styles.colorButton} ${
                      imagenActual === item.imagen[index]
                        ? styles.activeColor
                        : ""
                    }`}
                    onClick={() => setImagenActual(item.imagen[index])}
                    title={color}
                  />
                ))}
              </div>
            )}
          </Col>

          {/* Información a la derecha */}
          <Col md={6} className={styles.infoCol}>
            <Card.Body>
              <Card.Header className={styles.title}>{item.nombre}</Card.Header>
              <Card.Text className={styles.description}>
                {item.descripcion}
              </Card.Text>

              {/* Selector de almacenamiento */}
              {item.almacenamiento.length > 0 && (
                <div className={styles.storageSelector}>
                  {item.almacenamiento.map((alm, index) => (
                    <button
                      key={alm}
                      className={`${styles.storageButton} ${
                        precioActual === item.precio[index]
                          ? styles.activeStorage
                          : ""
                      }`}
                      onClick={() => handleAlmacenamientoChange(index)}
                    >
                      {alm}
                    </button>
                  ))}
                </div>
              )}

              <h5 className={styles.price}>Precio: ${precioActual}</h5>

              <div className={styles.buttonRow}>
                <Button
                  variant="success"
                  href={`https://wa.me/5493537301603?text=${encodeURIComponent(
                    `Hola, estoy interesado en el producto: ${item?.nombre}, Descripción: ${item?.descripcion}, Precio: $${precioActual}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionButton}
                >
                  <FaWhatsapp />
                  Consultar por WhatsApp
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => navigate("/")}
                  className={styles.actionButton}
                >
                  Volver a inicio
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
