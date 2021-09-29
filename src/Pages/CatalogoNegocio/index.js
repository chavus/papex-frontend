import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import {
     Row, Col
  } from 'reactstrap';

import {
    Link
} from 'react-router-dom'
import { useParams } from 'react-router';
import './styles.scss'
import ProductCard from "../../Components/Cards";
import api from '../../assets/lib/api'
import Dropdown from '../../Components/CategoryDropdown'

export default function CatalogoNegocio(){
    

    const [userData] = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [businessInfo, setBusinessInfo] = useState({})
    const [userrol, setUserRol] = useState({})
    const businessId = useParams().businessId


    useEffect( async() => {
       const result = await api.getAllProductsByBusiness('6136f36aa0abed586902256e')
       console.log(result.data)
       setProducts(result.data)
       setBusinessInfo(result.data[0].business)
       console.log(Object.values(businessInfo))
       
    }, []);
    
    

    return(

        
    <Col xs='12' className='catalog-cards'>
        <div></div>
        <div className='info-catalog'>
        <h1 className='p-titles mt-2'>{businessInfo.businessName}</h1>
        <p className='p-titles mt-2'>{businessInfo.address}</p>
        <ul className='ml-4'>Métodos de entrega
        { 
          Object.values(businessInfo).length &&  businessInfo.deliveryMethod.map((item) =>{
                return <li>{item}</li>
            })            
          }
        </ul>

        </div>
       
        <div className='product-manegement'>

           <Dropdown/>
          
          { userData.rol == 'Negocio' &&  <Link to='/'>
                <button className='btn-p-secondary'> + Agregar</button>
           </Link>} 
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