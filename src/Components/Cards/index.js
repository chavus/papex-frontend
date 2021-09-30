import React from 'react';
import './styles.scss'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';


const ProductCard = (props) => {

  const {name, price, imageUrl, category, brand, _id} = props.ProductData

  return (
    <Col xs='12' sm='6' md='4' key={_id}>
       <Card className='product-container'>
           <div className='product-image'>
              <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
           </div>
           <CardBody className='product-body'>
                    <CardTitle tag="h5">{name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{brand}
                    </CardSubtitle>
                    <CardText>${price}.00</CardText>
                    <CardText>{category}</CardText>
                    <div className='button-div'>
                       {/*<ul>
                            <li className="mb-2 text-muted">A domicilio
                            </li>
                            <li className="mb-2 text-muted">Pick up
                            </li>
                       </ul> */  }  
                        <Button className='btn-p-primary'>Añadir</Button>
                    </div>
                    
            </CardBody>
       </Card>
    </Col>
  );
};

export default ProductCard;