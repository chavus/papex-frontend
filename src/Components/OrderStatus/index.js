import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, CardText, 
          CardTitle, CardSubtitle, Input , FormGroup, Label, Col} from 'reactstrap';
import './styles.scss'

const OrderDetail = (props) => {



  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { client, products, total, parentOrder, createdAt, deliveryCost, _id }  = props.order    
  const date = new Date(createdAt);
  const resultDate = date.toLocaleDateString()

  const onClickClose = (event) => {
          console.log(event.target.dataset.order)
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
                <div className='pending'>
                    Estado
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
              <FormGroup row>
                <Label for="confirmationCode" sm={2}>Código de Confirmación</Label>
                <Col sm={2}>
                  <Input name="confirmationCode" id="confirmationCode" placeholder="" />
                </Col>
              </FormGroup>
              <Button data-order={_id} onClick={onClickClose} className="btn btn-p-primary" >Cerrar</Button>             
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default OrderDetail;