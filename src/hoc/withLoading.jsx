import { Spinner } from "react-bootstrap"

export const withLoading = (WrappedComponent) => {
  function ComponentWithLoading(props) {
    if (props.items === null) {
      return (
        <div className="d-flex justify-content-center align-items-center my-5" style={{ color: "rgba(255,255,255,0.5)", gap: "12px" }}>
          <Spinner animation="border" role="status" variant="light" size="sm" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Cargando...
          </span>
        </div>
      );
    }

    if (props.items.length === 0) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center my-5" style={{ gap: "12px", padding: "60px 0" }}>
          <div style={{ fontSize: "40px", opacity: 0.3 }}>◻</div>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.15em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0
          }}>
            No hay productos disponibles
          </p>
        </div>
      );
    }

    return WrappedComponent(props);
  }
  return ComponentWithLoading;
}
