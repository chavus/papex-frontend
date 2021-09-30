import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import './styles.scss'
import api from '../../assets/lib/api'
import Search from '../../Components/Search'
import ProductCard from '../../Components/Cards'
import { Col, Row } from 'reactstrap'

const SearchPage = () => {
    
    const [ userData ] = useContext(UserContext)
    const [ products, setProducts] = useState([])

    useEffect( async () => {
        const result = await api.getAllProductsBySearch()
        setProducts(result.data)

    }, []);



    return ( 
     <Col xs='12' className='search-container'>
        <div className="b-container">
            <h1>Búsqueda</h1>
                <div className="row search-container">
                    <Search/>
                </div>
       </div>
       <Row>
            {
                /*filteredProducts.map((item) =>{
                    return  <ProductCard
                                ProductData={item}
                                key={item._id}
                            /> */
            }
            
        </Row>
     </Col>
      
    )
}

export default SearchPage