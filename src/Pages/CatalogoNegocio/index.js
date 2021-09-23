import React from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
  } from 'reactstrap';

import {
    Link
} from 'react-router-dom'
import ProductCard from "../../Components/Cards";




export default function CatalogoNegocio(){
    return(
        <Col xs='12'>
        <h2>Catalogo</h2>
        <Row>
            <ProductCard/>
            
        </Row>
    </Col>
    )
}