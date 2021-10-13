import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, CardText, 
          CardTitle, CardSubtitle, Input , FormGroup, Label, Col, Alert} from 'reactstrap';
import './styles.scss'
import api from '../../assets/lib/api'

const ClientOrderDetail = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [confirmCode, setConfirmCode] = useState()
  const { business, products, total, parentOrder, createdAt, deliveryCost, _id, confirmation_code, status }  = props.order    
  const [showMessage, setShowMessage] = useState(false)
  const [orderStatus, setOrderStatus] = useState(status)

  //const [order, setOrder] = useState(props.order)

  const [messageClass, setMessageClass] = useState()
  const [messageText, setMessageText] = useState()   
  const date = new Date(createdAt);
  const resultDate = date.toLocaleDateString()

  const onClickClose = async (event) => {
          const idOrder = event.target.dataset.order
          //console.log("orden", idOrder)
          if (confirmCode === confirmation_code){

              //console.log(order)
              let result = await api.patchOrderById(idOrder, {status:"Entregado"}, props.token  )

              //console.log(result)
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
 
    <div className='order-div p-card-borders'>
        <div className='order-detail rounded border'
           onClick={toggle}>
            <div className='order-client-div'>
                <h4 className='order p-titles'>Pedido #{parentOrder}{'-'}{_id.slice(22,24)}</h4>
                <h4 className='order  d-none d-sm-block p-titles'> {business.businessName} </h4>  
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
              <CardTitle tag="h5" className='d-block d-sm-none'>{business.businessName}</CardTitle>
              <CardTitle tag="h5">Código de Confirmación:{' '} {confirmation_code}</CardTitle>
              <CardTitle tag="h5">Fecha Orden: {resultDate}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Costo de Entrega: ${deliveryCost}</CardSubtitle>
              { products.map( (product , index) => {  
                   return (<CardText key={index} tag="h6" className="mb-2 text-muted">  { product.qty } x { product.product.name }  ${ product.price } </CardText>)
                } )                     
              } 
              { /* orderStatus  =="En proceso"   &&            
                <>
                  <FormGroup row>
                    <Label for="confirmationCode" sm={2}>Código de Confirmación</Label>
                    <Col sm={2}>
                      <Input name="confirmationCode" id="confirmationCode" placeholder="" onChange={onChangeConfirmationCode} />
                    </Col>
                  </FormGroup>
                  <Button data-order={_id} onClick={onClickClose} className="btn btn-p-primary" >Cerrar</Button>             
                </>
            */ }
          </CardBody>
        </Card>
        { /*   showMessage &&
                        <div className="d-flex justify-content-center">
                            <Alert color={ messageClass } className=" d-block mt-2 max-width-message " >
                                { messageText }
                            </Alert>                                         
                        </div>    
               */ } 
      </Collapse>
    </div>
  );
}

export default ClientOrderDetail;