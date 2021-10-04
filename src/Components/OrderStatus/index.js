import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, CardText, 
          CardTitle, CardSubtitle, Input , FormGroup, Label, Col, Alert} from 'reactstrap';
import './styles.scss'
import api from '../../assets/lib/api'

const OrderDetail = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [confirmCode, setConfirmCode] = useState()
  const { client, products, total, parentOrder, createdAt, deliveryCost, _id, confirmation_code, status }  = props.order    
  const [showMessage, setShowMessage] = useState(false)
  const [orderStatus, setOrderStatus] = useState(status)

  const [order, setOrder] = useState(props.order)

  const [messageClass, setMessageClass] = useState()
  const [messageText, setMessageText] = useState()   
  const date = new Date(createdAt);
  const resultDate = date.toLocaleDateString()

  const onClickClose = async (event) => {
          const idOrder = event.target.dataset.order
          console.log("orden", idOrder)
          if (confirmCode === confirmation_code){

              let orderTemp = {...order}
              orderTemp.status ="Entregado"
              setOrder(orderTemp)

              setOrderStatus("Entregado")
              let result = await api.patchOrderById(idOrder, order, props.token  )
              console.log(result)
              if (result.success){
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
 
    <div className='order-div'>
        <div className='order-detail rounded border'
           onClick={toggle}>
            <div className='order-client-div'>
                <h3 className='order'>Pedido #{parentOrder}</h3>
                <h2 className='client'>Cliente: { client.name }  { client.lastName } </h2>  
            </div>
            <div className='price-pending-div'>
                <h5 className='price'>${total}</h5>
                <div className={`pending  ${ order.status == "En proceso"? `btn-p-secondary` : ` btn-success ` } `}>
                    {order.status}
                </div>
            </div>
        </div>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
              <CardTitle tag="h5">Fecha Orden {resultDate}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Costo de Entrega: ${deliveryCost}</CardSubtitle>
              { products.map( product => {  
                   return (<CardText tag="h6" className="mb-2 text-muted">  { product.qty } x { product.product.name }  ${ product.price } </CardText>)
                } )                     
              } 


              {  order.status =="En proceso"   &&            
                <>
                  <FormGroup row>
                    <Label for="confirmationCode" sm={2}>Código de Confirmación</Label>
                    <Col sm={2}>
                      <Input name="confirmationCode" id="confirmationCode" placeholder="" onChange={onChangeConfirmationCode} />
                    </Col>
                  </FormGroup>
                  <Button data-order={_id} onClick={onClickClose} className="btn btn-p-primary" >Cerrar</Button>             
                </>
             }
          </CardBody>
        </Card>
        {   showMessage &&
                        <div className="d-flex justify-content-center">
                            <Alert color={ messageClass } className=" d-block mt-2 max-width-message " >
                                { messageText }
                            </Alert>                                         
                        </div>    
                } 
      </Collapse>
    </div>
  );
}

export default OrderDetail;