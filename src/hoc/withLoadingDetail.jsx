import { Spinner } from "react-bootstrap";

export const withLoadingDetail = (Component) => {
  function ComponentWithLoading(props) {
    if (!props.item) {
      return (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status" variant="primary" />
          <span className="ms-2">Cargando...</span>
        </div>
      )
    }
      return (
        <Component {...props} />
    )
  }
  return ComponentWithLoading
}
