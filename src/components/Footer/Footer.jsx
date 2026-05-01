import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className={styles.footerTitle}>IphoneSelectBV</h5>
            <p className={styles.footerText}>
              Tu tienda de confianza en celulares y accesorios. Calidad y
              garantía en cada producto.
            </p>
          </Col>

          <Col md={4}>
            <h5 className={styles.footerTitle}>Contacto</h5>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaWhatsapp className={styles.contactIcon} />
                <a
                  href="https://wa.me/5493537301603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  +54 9 3537 30-1603
                </a>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>Villa María, Córdoba</span>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <h5 className={styles.footerTitle}>Síguenos</h5>
            <div className={styles.socialLinks}>
              <a
                href="https://wa.me/5493537301603"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <FaFacebook />
              </a>
            </div>
            <p className={styles.footerText} style={{ marginTop: "1rem" }}>
              Horarios: Lun - Sáb: 9:00 - 20:00
            </p>
          </Col>
        </Row>

        <hr className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            © 2025 IphoneSelectBV. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
