
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import{
    Input,
    Label,
    FormGroup,

} from 'reactstrap'

export default function CartPerBusiness(props){
    const data = props.cartPerBusinessData
    

    return(
        <div className="cart-business-container">
            <h2>{data.business}</h2>
            {data.products.map(product =>{
                return(
                    <div className="product-line d-flex">
                        <Input className="qty-input" value={product.qty}/>
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">$ {product.price}</p>
                        <FontAwesomeIcon icon={ faTrashAlt } onClick={()=>console.log("clicked icon")}/>
                    </div>
                )
            }) }
        <div className="row mx-0">
            <div className="col-12 col-md-6">
                <Label for="commentText">Comentarios de pedido:</Label>    
                <Input type="textarea" name="text" id="commenttext" />
            </div>
            <div className="subtotal col-12 col-md-6 d-flex justify-content-between">
                <div>
                    <Label for="">Método de entrega:</Label>    
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1"/>{' '}
                        Pickup
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Domicilio  ($30.00)
                    </Label>
                    </FormGroup>
                </div>
                <div className="">
                    <p className="m-0 fw-bold">Subtotal</p>
                    <p className="text-end">$1,250</p>
                </div>
            </div>
        </div>
        </div>    
    
    )
}