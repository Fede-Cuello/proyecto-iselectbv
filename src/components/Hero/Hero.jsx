import { Container, Button } from "react-bootstrap";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <Container className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>IphoneSelectBV</h1>
          <p className={styles.heroSubtitle}>
            Tu tienda de confianza en celulares y accesorios
          </p>
          <p className={styles.heroDescription}>
            Encontrá los mejores equipos Samsung, Apple, PlayStation y más.
            Nuevos y usados con garantía.
          </p>
          <div className={styles.heroButtons}>
            <Button
              variant="primary"
              size="lg"
              className={styles.heroCTA}
              onClick={() => {
                const productosSection = document.getElementById("productos");
                productosSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver productos
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              className={styles.heroContactBtn}
              href="https://wa.me/5493537673531?text=Hola%20quiero%20consultar"
              target="_blank"
            >
              Contactanos
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
