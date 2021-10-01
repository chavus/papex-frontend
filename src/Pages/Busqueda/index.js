import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import './styles.scss'
import api from '../../assets/lib/api'
import ProductCard from '../../Components/Cards'
import { Col, Row, Input } from 'reactstrap'
import { FaSearch } from 'react-icons/fa';
import { useLocation, useHistory } from 'react-router-dom';

const SearchPage = () => {
    
    const [ userData ] = useContext(UserContext)
    const [ products, setProducts] = useState([])
    const [productName, setProductName] = useState('')
    const [productSearch, setProductSearch] = useState(new URLSearchParams(useLocation().search).get('searchText'))
    
    const history = useHistory()
    console.log('loading')

    useEffect( async () => {
        const result = await api.getAllProductsBySearch(productSearch)
        setProducts(result.data) 
        history.push(`/Search?searchText=${productSearch}`)
    }, [productSearch]);

    const productHandler = event => {
        const {value} = event.target
        setProductName(value)
    }

    const onSearchClick = () => {
        setProductSearch(productName)
    }



    return ( 
     <Col xs='12' className='search-container'>
        <div className="b-container-search">
            <h1>Búsqueda</h1>
                <div className="row search-container">
                    <div className="container-input">
                        <Input
                            type="text" 
                            className="form-control input-buscar" 
                            placeholder="Búsqueda"
                            onChange={productHandler}
                        />
                        
                          <FaSearch
                            className='search-button mt-1'
                            onClick={onSearchClick}
                            />
                       
                           
                        
                    </div>
                </div>
       </div>
       <Row>
            {
                products.map((item) =>{
                    return  <ProductCard
                                ProductData={item}
                                key={item._id}
                            /> })
                }
                
            
        </Row>
     </Col>
      
    )
}

export default SearchPage