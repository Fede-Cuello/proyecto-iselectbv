import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./CategoriesHighlight.module.css";
import { useNavigate } from "react-router";
import { FaMobileAlt, FaApple, FaGamepad, FaWhatsapp } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";

export default function CategoriesHighlight() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Samsung",
      icon: <SiSamsung />,
      description: "Los mejores Galaxy",
      path: "/category/samsung",
    },
    {
      name: "Apple",
      icon: <FaApple />,
      description: "iPhones originales",
      path: "/category/apple",
    },
    {
      name: "PlayStation",
      icon: <FaGamepad />,
      description: "Consolas y juegos",
      path: "/category/consolas",
    },
    {
      name: "Nuevos",
      icon: <FaMobileAlt />,
      description: "Equipos sellados",
      path: "/estado/sellados",
    },
  ];

  return (
    <section className={styles.categoriesSection}>
      <Container>
        {/* Logo arriba */}
        <div className={styles.logoContainer}>
          <img
            src="/logo-circular.png"
            alt="IphoneSelectbv"
            className={styles.logo}
            onClick={() => navigate("/")}
          />

          {/* WhatsApp en la esquina */}
          <a
            href="https://wa.me/5493537301603?text=Hola%20quiero%20consultar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
          >
            <FaWhatsapp className={styles.whatsappIcon} />
            <span className={styles.whatsappText}>Contacto</span>
          </a>
        </div>

        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explorá por categoría</h2>
          <p className={styles.sectionSubtitle}>
            Encontrá exactamente lo que buscás
          </p>
        </div>

        <Row className="g-4">
          {categories.map((category) => (
            <Col key={category.name} xs={6} md={3}>
              <Card
                className={styles.categoryCard}
                onClick={() => navigate(category.path)}
              >
                <Card.Body className={styles.categoryCardBody}>
                  <div className={styles.categoryIcon}>{category.icon}</div>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.categoryDescription}>
                    {category.description}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
