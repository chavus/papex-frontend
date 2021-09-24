import React from "react"
import {
     Row, Col
  } from 'reactstrap';

import {
    Link
} from 'react-router-dom'
import './styles.scss'
import ProductCard from "../../Components/Cards";




export default function CatalogoNegocio(){
    return(
    <Col xs='12' className='catalog-cards'>
        <h2>Catalogo</h2>
        <Row>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/><ProductCard/><ProductCard/>
            <ProductCard/>
            
        </Row>
    </Col>
    )
}