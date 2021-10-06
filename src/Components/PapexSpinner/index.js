import { Spinner } from "reactstrap";
import './style.scss'

export default function PapexSpinner(props){
    const { text="Cargando..." } = props
    return(
        <div className="spinner-container d-flex flex-column align-items-center">
            <Spinner children=""/>
            <h5>{text}</h5>

        </div>
    )
}