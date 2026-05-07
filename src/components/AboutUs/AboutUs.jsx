import styles from "./AboutUs.module.css";
import { FaBoxOpen, FaCheckCircle, FaHeadset, FaTruck } from "react-icons/fa";

export default function AboutUs() {
  const features = [
    { icon: <FaBoxOpen />, title: "Stock real", desc: "Lo que ves en la web está disponible. Sin falsas promesas." },
    { icon: <FaCheckCircle />, title: "Equipos verificados", desc: "Cada unidad pasa por un control técnico antes de salir." },
    { icon: <FaHeadset />, title: "Asesoramiento 1 a 1", desc: "Te ayudamos a elegir el modelo según tu uso real." },
    { icon: <FaTruck />, title: "Envíos coordinados", desc: "Llegamos a todo el país con seguimiento del pedido." },
  ];

  return (
    <section className={styles.about}>
      <div className={styles.bgGrid} />
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            Quiénes somos
          </div>
          <h2 className={styles.title}>
            Más que una tienda,<br />
            <span className={styles.grad}>una decisión informada</span>
          </h2>
          <p className={styles.lead}>
            Trabajamos con Apple, Samsung y PlayStation desde Villa María. Vendemos equipos nuevos sellados y también recibimos usados en parte de pago, todo con la misma exigencia: que el cliente vuelva.
          </p>
          <p className={styles.lead}>
            No somos una multinacional. Somos un equipo chico que conoce cada producto y cada cliente por su nombre.
          </p>
          <div className={styles.stat}>
            <div className={styles.statNum}>5+</div>
            <div>
              <div className={styles.statTitle}>Años en el mercado</div>
              <div className={styles.statSub}>+1.200 clientes en todo el país</div>
            </div>
          </div>
        </div>

        <div className={styles.features}>
          {features.map(f => (
            <div className={styles.feat} key={f.title}>
              <div className={styles.featIcon}>{f.icon}</div>
              <div className={styles.featTitle}>{f.title}</div>
              <div className={styles.featDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
