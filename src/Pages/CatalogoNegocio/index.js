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
    const businessId = useLocation().search
    //console.log('this is use location',businessId)
   

    useEffect( async() => {
       const result = await api.getAllProductsByBusiness(businessId)
      
       setProducts(result.data)
       setFilteredProducts(result.data)
       setBusinessInfo(result.data[0].business)
       
      
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

    <Col xs='12' className='catalog-cards'>
        <div className='info-container'>
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
            userData.rol == 'Negocio' &&  <Link to='/'>
                <button className='btn-p-secondary'> + Agregar</button>
           </Link>} 
        </div>

        </div>
       
        <Row>
            {
                filteredProducts.map((item) =>{
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