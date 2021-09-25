import React from "react"
import {
     Row, Col
  } from 'reactstrap';

import {
    Link
} from 'react-router-dom'
import './styles.scss'
import ProductCard from "../../Components/Cards";
import DropdownButton from "../../Components/Dropdown";


export default function CatalogoNegocio(){
    return(
    <Col xs='12' className='catalog-cards'>
        <h1 className='p-titles mt-2'>Mi Catálogo</h1>
        <div className='product-manegement'>
           <DropdownButton/>
           <button className='btn-p-secondary'> + Agregar</button>
        </div>
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