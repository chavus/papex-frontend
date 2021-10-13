import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, CardText, 
          CardTitle, CardSubtitle, Input , FormGroup, Label, Col, Alert} from 'reactstrap';
import './styles.scss'
import api from '../../assets/lib/api'
import { createPortal } from 'react-dom';

const OrderDetail = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [confirmCode, setConfirmCode] = useState()
  const { client, products, total, parentOrder, createdAt, deliveryCost, _id, confirmation_code, status, comment }  = props.order    
  const [showMessage, setShowMessage] = useState(false)
  const [orderStatus, setOrderStatus] = useState(status)  
  const [messageClass, setMessageClass] = useState()
  const [messageText, setMessageText] = useState()   
  const date = new Date(createdAt);
  const resultDate = date.toLocaleDateString()

  const onClickClose = async (event) => {
          const idOrder = event.target.dataset.order

          if (confirmCode === confirmation_code){

              let result = await api.patchOrderById(idOrder, {status:"Entregado"}, props.token  )

              console.log(result)
              if (result.success){
                setOrderStatus("Entregado")
                console.log(result.data)
                displayMessage("primary", "Código correcto")              
              }
              else{
                  console.log(result.data)
                  displayMessage("danger", result.data)  
              }              
          }
          else {
              displayMessage("warning", "Código incorrecto")
          }
  }

  const onChangeConfirmationCode = (event) =>{
      setConfirmCode (event.target.value)
  }

  function displayMessage (messageClass, message)
    {
      setMessageClass(messageClass)
      setMessageText(message)
      setShowMessage(true)
      setTimeout(  () => {   
        setShowMessage(false)
      }, 2000 )  
    }
  
  return (
 
    <Col className='order-div p-card-borders'>
        <div className='order-detail rounded border'
           onClick={toggle}>
            <div className='order-client-div'>
                <h4 className='order p-titles'>Pedido #{parentOrder}{'-'}{_id.slice(22,24)}</h4>
                <h4 className='client d-none d-sm-block p-titles'>Cliente: { client.name }  { client.lastName } </h4>  
            </div>
            <div className='price-pending-div'>
                <h5 className='price'><span className='d-none d-sm-block'>Total:</span>${total}</h5>
                <div className={`pending  ${ orderStatus /*order.status*/ == "En proceso"? `btn-p-secondary` : ` btn-success ` } `}>
                    { orderStatus /*order.status*/}
                </div>
            </div>
        </div>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
              <CardTitle tag="h5" className='d-block d-sm-none'>Cliente: { client.name }  { client.lastName }</CardTitle>
              <CardTitle tag="h5">Fecha Orden: {resultDate}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Costo de Entrega: ${deliveryCost}</CardSubtitle>
              { products.map( (product , index) => {  
                   return (<CardText key={index} tag="h6" className="mb-2 text-muted">  { product.qty } x { product.product.name }  ${ product.price } </CardText>)
                } )                     
              } 
              { orderStatus =="En proceso"   &&            
                <>
                  <FormGroup row className='d-flex align-items-center'>
                    <Label for="confirmationCode" sm={2}>Código de Confirmación:</Label>
                    <Col sm={2}>
                      <Input name="confirmationCode" id="confirmationCode" placeholder="" onChange={onChangeConfirmationCode} />
                    </Col>   
                  </FormGroup>
                  <FormGroup row className='d-flex align-items-center'>
                    <Label for="confirmationCode" sm={2}>Comentarios:</Label>
                    <Col sm={2}>
                    <CardSubtitle tag="h6" className="text-muted">{!comment ? 'Ninguno': comment}</CardSubtitle>
                    </Col> 
                    </FormGroup>
                  <Button data-order={_id} onClick={onClickClose} className="btn btn-p-primary mt-2" >Cerrar</Button>  
                        
                </>
             }
          </CardBody>
        </Card>
        {   showMessage &&
                        <div className="d-flex justify-content-center align-items-center">
                            <Alert color={ messageClass } className=" d-block mt-2 max-width-message " >
                                { messageText }
                            </Alert>                                         
                        </div>    
                } 
      </Collapse>
    </Col>
  );
}

export default OrderDetail;