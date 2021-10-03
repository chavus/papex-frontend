import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './styles.scss'

const OrderDetail = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='order-div'>
        <div className='order-detail rounded border'
           onClick={toggle}>
            <div className='order-client-div'>
                <h3 className='order'>Pedido #1</h3>
               { /*<h4 className='client'>Cliente:</h4> */} 
            </div>
            <div className='price-pending-div'>
                <h5 className='price'>$35.00</h5>
                <div className='pending'>
                    Estado
                </div>
            </div>
        </div>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
          Aqui se vera la informacion del pedido o del negocio
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default OrderDetail;