import styles from "./Footer.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topline} />
      <div className={styles.inner}>
        <div className={styles.col}>
          <div className={styles.brand}>
            <div className={styles.logoBox}>
              <img src="/logo-circular.png" alt="" />
            </div>
            <div className={styles.brandName}>IphoneSelectBV</div>
          </div>
          <p className={styles.about}>
            Tienda especializada en celulares, accesorios y consolas. Recibimos usados y coordinamos entregas a todo el país.
          </p>
          <div className={styles.status}>
            <span className={styles.dotGreen} /> Operativo · respuesta inmediata
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.heading}>· Contacto</div>
          <ul className={styles.list}>
            <li><FaWhatsapp /> +54 9 3537 30-1603</li>
            <li><span>◉</span> Villa María, Córdoba</li>
            <li><span>✉</span> hola@iphoneselectbv.com</li>
          </ul>
        </div>

        <div className={styles.col}>
          <div className={styles.heading}>· Horarios</div>
          <ul className={styles.hours}>
            <li><span>Lun – Vie</span><b>9:00 – 20:00</b></li>
            <li><span>Sábado</span><b>9:00 – 14:00</b></li>
            <li><span>Domingo</span><b className={styles.off}>Cerrado</b></li>
          </ul>
        </div>

        <div className={styles.col}>
          <div className={styles.heading}>· Redes</div>
          <div className={styles.social}>
            <a href="https://wa.me/5493537301603" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
          </div>
          <p className={styles.socialSub}>Seguinos para novedades de stock y promos.</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} IphoneSelectBV · Todos los derechos reservados</span>
        <div className={styles.legal}>
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
        </div>
      </div>
    </footer>
  );
}
