
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import{
    Input,
    Button,
    CustomInput,
    Form,
    FormGroup
} from 'reactstrap'

export default function CartPerBusiness(props){
    const data = props.cartPerBusinessData
    

    return(
        <>
        <h2>{data.business}</h2>
        {data.products.map(product =>{
            return(
                <div className="d-flex">
                    <Input value={product.qty}/>
                    <p className="productName">{product.name}</p>
                    <p className="productPrice">{product.price}</p>
                    <FontAwesomeIcon icon={ faTrashAlt } onClick={()=>console.log("clicked icon")}/>
                </div>
            )
        }) }
        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
        <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
        </div>

        </>    
    
    )
}