
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import{
    Input,
    Label,
    FormGroup,
    Button

} from 'reactstrap'

export default function CartPerBusiness(props){
    const {business, products, comments, deliveryMethod} = props.cartPerBusinessData

    return(
        <div className="cart-business-container">
            <h2>{business.businessName}</h2>
            {products.map(product =>{
                return(
                    <div className="product-line d-flex">
                        <Input className="qty-input" value={product.qty}
                                data-business-id={ business._id }
                                data-product-id={ product.product._id}
                                onChange={ props.onQtyChange}/>
                        <p className="product-name">{product.product.name}</p>
                        <p className="product-price">$ {product.product.price}</p>
                        <Button
                            data-business-id={ business._id }
                            data-product-id={ product.product._id }
                            onClick={ props.onDeleteClick }
                            >
                                <FontAwesomeIcon icon={ faTrashAlt }/>
                            </Button>
                    </div>
                )
            }) }
        <div className="row mx-0">
            <div className="col-12 col-md-6">
                <Label for="commentText">Comentarios de pedido:</Label>    
                <Input type="textarea" name="text" id="commenttext" value={comments} 
                       data-business-id={ business._id }
                       onChange={ props.onCommentChange }
                       onBlur={ props.onCommentBlur }/>
            </div>
            <div className="subtotal col-12 col-md-6 d-flex justify-content-between">
                <div>
                    <Label for="">Método de entrega:</Label>    
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name={`deliveryMethod-${business._id}`} value="Pickup" 
                        data-business-id={ business._id }
                        checked={deliveryMethod == "Pickup" && true} 
                        onChange={props.onDeliveryChange}/>
                        Pickup
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name={`deliveryMethod-${business._id}`} value="Delivery" 
                        data-business-id={ business._id }
                        checked={deliveryMethod == "Delivery" && true}
                        onChange={props.onDeliveryChange}/>
                        Domicilio  ($30.00)
                    </Label>
                    </FormGroup>
                </div>
                <div className="">
                    <p className="m-0 fw-bold">Subtotal</p>
                    <p className="text-end">$ { products.reduce( (subtotal, currProd) =>{
                       return subtotal + currProd.product.price*currProd.qty
                    },deliveryMethod == "Delivery" ? 30 : 0 )}</p>
                </div>
            </div>
        </div>
        </div>    
    
    )
}