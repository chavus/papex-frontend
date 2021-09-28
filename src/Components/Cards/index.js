import React from 'react';
import './styles.scss'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';


const ProductCard = () => {
  return (
    <Col xs='12' sm='6' md='4'>
       <Card className='product-container'>
           <div className='product-image'>
              <CardImg top width="100%" src="https://picsum.photos/seed/picsum/200/300" alt="Card image cap" />
           </div>
           <CardBody className='product-body'>
                    <CardTitle tag="h5">Producto</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">detalle
                    </CardSubtitle>
                    <CardText>Precio</CardText>
                    <CardText>Disponibles</CardText>
                    <div className='button-div'>
                        <ul>
                            <li className="mb-2 text-muted">A domicilio
                            </li>
                            <li className="mb-2 text-muted">Pick up
                            </li>
                        </ul>     
                        <Button className='btn-p-primary'>Editar</Button>
                    </div>
                    
            </CardBody>
       </Card>
    </Col>
  );
};

export default ProductCard;