import {Container, Nav, Navbar} from "react-bootstrap"
import styles from "./NavBar.module.css"
import { NavLink } from "react-router"
import { FaWhatsapp } from "react-icons/fa"


export default function NavBar() {
  return(
<header className={styles.navBarContainer}>
      {/* Parte superior: logo centrado y contacto a la derecha */}
      <Navbar>
        <Container fluid className="d-flex justify-content-between align-items-center">
          <div className="flex-grow-1 d-flex justify-content-center">
            <Navbar.Brand as={NavLink} to={"/"} className={styles.navBarBrand}>
              <img
                src="/logo-circular.png"
                alt="IphoneselectBV Logo"
                className={styles.logo}
              />
              <span className="ms-2 d-none d-md-inline">IphoneSelectBV</span>
            </Navbar.Brand>
          </div>

          {/* Contacto a la derecha */}
          <div className="position-absolute end-0 me-3">
            <a
              href="https://wa.me/5493537673531?text=Hola%20quiero%20consultar"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
              aria-label="WhatsApp"
            >
              <span className={styles.whatsappText}>Contacto</span>
              <FaWhatsapp className={styles.whatsappIcon} />
            </a>
          </div>
        </Container>
      </Navbar>

      {/* Parte inferior: menú fijo con categorías */}
      <Nav className={`justify-content-center ${styles.navBarMenu}`}>
        {/* Estado */}
        <Nav.Item>
          <NavLink to="/category/samsung" className={styles.navBarLink}>
            Samsung
          </NavLink>
          <NavLink to="/category/apple" className={styles.navBarLink}>
            Apple
          </NavLink>
          <NavLink to="/estado/sellados" className={styles.navBarLink}>
            Nuevos
          </NavLink>
          <NavLink to="/category/seminuevos" className={styles.navBarLink}>
            Semi nuevos
          </NavLink>
          <NavLink to="/estado/usados" className={styles.navBarLink}>
            Usados
          </NavLink>
          <NavLink to="/category/consolas" className={styles.navBarLink}>
            PlayStation
          </NavLink>
        </Nav.Item>

      

      </Nav>
    </header>
  )
}
