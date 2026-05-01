import { Container, Row, Col } from "react-bootstrap";
import styles from "./AboutUs.module.css";
import { FaShieldAlt, FaTruck, FaHeadset, FaCertificate } from "react-icons/fa";

export default function AboutUs() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Garantía",
      description: "Todos nuestros productos cuentan con garantía",
    },
    {
      icon: <FaCertificate />,
      title: "Calidad",
      description: "Equipos verificados y en perfecto estado",
    },
    {
      icon: <FaHeadset />,
      title: "Atención",
      description: "Asesoramiento personalizado por WhatsApp",
    },
    {
      icon: <FaTruck />,
      title: "Entrega",
      description: "Coordinamos envío a todo el país",
    },
  ];

  return (
    <section className={styles.aboutSection}>
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div className={styles.aboutContent}>
              <h2 className={styles.aboutTitle}>¿Por qué IphoneSelectBV?</h2>
              <p className={styles.aboutText}>
                Somos una empresa dedicada a la venta de celulares y accesorios,
                con años de experiencia en el mercado. Nos especializamos en
                marcas premium como Samsung, Apple y PlayStation.
              </p>
              <p className={styles.aboutText}>
                Ofrecemos tanto equipos nuevos sellados como usados en excelente
                estado, todos verificados y con garantía. Tu confianza es
                nuestra prioridad.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <Row className="g-3">
              {features.map((feature, index) => (
                <Col key={index} xs={6}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
