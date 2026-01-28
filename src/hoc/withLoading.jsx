import { Spinner } from "react-bootstrap"

export const withLoading = (Component) => {
    function ComponentWithLoading(props) {
        if (!props.items || props.items.length === 0) {
          return (
            <div className="d-flex justify-content-center my-5">
              <Spinner animation="border" role="status" variant="primary" />
              <span className="ms-2">Cargando...</span>
            </div>
          );
        } 
        return (
            <Component {...props}/>
        )
    }
    return ComponentWithLoading
}