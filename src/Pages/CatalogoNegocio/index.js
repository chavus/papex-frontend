import React,{useEffect, useState} from "react"
import {
     Row, Col
  } from 'reactstrap';

import {
    Link
} from 'react-router-dom'
import { useParams } from 'react-router';
import './styles.scss'
import ProductCard from "../../Components/Cards";
import DropdownButton from "../../Components/Dropdown";
import api from '../../assets/lib/api'


export default function CatalogoNegocio(){
    
    const [products, setProducts] = useState([])
    const [userrol, setUserRol] = useState({})
    const businessId = useParams().businessId


    useEffect( async() => {
       const result = await api.getAllProductsByBusiness('6136f36aa0abed586902256e')
       console.log(result.data)
       setProducts(result.data)
       console.log(products[0].business.name)
    }, []);

   // const {name, deliveryMethod } = products[0].business

    return(
    <Col xs='12' className='catalog-cards'>
        <h1 className='p-titles mt-2'></h1>
        <div className='product-manegement'>
           <DropdownButton/>
           <button className='btn-p-secondary'> + Agregar</button>
        </div>
        <Row>
            {
                products.map((item) =>{
                    return  <ProductCard
                                ProductData={item}
                                key={item._id}
                            />
            })
            }
        </Row>
    </Col>
    )
}