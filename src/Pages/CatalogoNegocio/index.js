import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import {
     Row, Col, DropdownToggle, Label, Input, FormGroup
  } from 'reactstrap';

import {
    Link
} from 'react-router-dom'
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import './styles.scss'
import ProductCard from "../../Components/Cards";
import api from '../../assets/lib/api'
import Dropdown from '../../Components/CategoryDropdown'

export default function CatalogoNegocio(){
    

    const [userData] = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [businessInfo, setBusinessInfo] = useState({})
    const [categoryProduct, setCategoryProduct] = useState('')
    let businessId  = new URLSearchParams(useLocation().search).get("businessId") 
    //console.log('this is use location',businessId)
    if (userData && userData.rol == 'Negocio'){
       businessId = userData._id
    } 

    useEffect( async() => {
       const result = await api.getAllProductsByBusiness(businessId)  
       if (result.data.length > 0 ){
       setProducts(result.data)
       setFilteredProducts(result.data)
       console.log(result.data)
       setBusinessInfo(result.data[0].business) 
       } 
    }, []);

    const categoryFinder = event => {
        const {value} = event.target
        setCategoryProduct(value)
        const filteredCategory = filterProducts(products, value)
        setFilteredProducts(filteredCategory)
    }

    const filterProducts = (someProduct, categoryValue) => {
        console.log(someProduct)
        console.log(categoryValue)
        return someProduct.filter( item => item.category.includes(categoryValue))
    }


    return(

    <div className='catalog-cards container-fluid'>
        <div className="container">

        <div className='info-container'>
        <div className='info-catalog'>
            <h2  
               className='p-titles mt-2'>Catálogo de: 
                { !userData || userData.rol == 'Cliente' ?
                    businessInfo.businessName :
                    userData.businessName  } 
            </h2>
            <p 
                className='p-titles'>
                {!userData || userData.rol == 'Cliente' ?
                    businessInfo.address :
                    userData.address }
            </p>
            <ul p-titles className='delivery-methods ml-4 p-titles'>{businessInfo.deliveryMethod && 'Métodos de entrega'}

            { 
            !userData || userData.rol == 'Cliente' ?
            Object.values(businessInfo).length > 0 &&  businessInfo.deliveryMethod.map((item) =>{
                    return <li>{item}</li>
                    
                }) :  userData.deliveryMethod.map((item) =>{
                    return <li>{item}</li>
                    
                })
            }
            </ul>

        </div>
       
        <div className='product-manegement'>

            <FormGroup className='btn-p-primary' onChange={categoryFinder}>
                <Label for="exampleSelect">Categoría</Label>
                <Input type="select" name="select" >
                    <option 
                        onClick={categoryFinder} 
                        value=''>
                        Todas
                    </option>
                    <option 
                        onClick={categoryFinder} 
                        value='Papel'>
                        Papel
                    </option>
                    <option 
                        onClick={categoryFinder} 
                        value='Libretas y cuadernos'>
                        Libretas y cuadernos
                    </option>
                    <option 
                        onClick={categoryFinder} 
                        value='Arte y diseño'>
                        Arte y diseño
                    </option>
                    <option 
                        onClick={categoryFinder} 
                        value='Articulos de escritorio'>
                        Articulos de escritorio
                    </option>
                    <option 
                        onClick={categoryFinder} 
                        value='Articulos de escritura'>
                        Articulos de escritura
                    </option>
                </Input>
             </FormGroup>
          
          
          { 
            userData &&
            userData.rol == 'Negocio' &&  <Link to='/ManageProduct'>
                <button className='btn-p-secondary'> + Agregar</button>
           </Link>} 
        </div>

        </div>
       
        <Row>
            {   filteredProducts ?
                 
                filteredProducts.map((item) =>{
                    return  <ProductCard
                                ProductData={item}
                                key={item._id}
                            /> 
            })
            :
            <h1>No cuenta con Articulos</h1>
            }
        </Row>
        </div>

    </div>
    )
}