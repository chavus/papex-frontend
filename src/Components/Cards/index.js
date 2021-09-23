import React from 'react';
import './styles.scss'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';

const ProductCard = (props) => {
  return (
    <Col xs='12' md='4'>
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
                        <div>
                            <h6 className="mb-2 text-muted">A domicilio
                            </h6>
                            <h6 className="mb-2 text-muted">Pick up
                            </h6>
                        </div>     
                        <Button>Añadir a carrito</Button>
                    </div>
                    
            </CardBody>
       </Card>
    </Col>
  );
};

export default ProductCard;