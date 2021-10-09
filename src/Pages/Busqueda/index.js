import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import './styles.scss'
import api from '../../assets/lib/api'
import ProductCard from '../../Components/Cards'
import { Col, Row, Input } from 'reactstrap'
import { useLocation, useHistory } from 'react-router-dom';
import getNearBusinesses from '../../assets/lib/nearBusinesses';
import PapexSpinner from '../../Components/PapexSpinner'
import SearchBar from '../../Components/SearchBar'

const SearchPage = () => {
    
    const [ userData ] = useContext(UserContext)
    const [ products, setProducts] = useState(null)
    const [productName, setProductName] = useState('')
    const [productSearch, setProductSearch] = useState(new URLSearchParams(useLocation().search).get('searchText'))

    useEffect(()=>{
        setProductName(productSearch)
    },[])

    const history = useHistory()
    
    useEffect( async () => {
        setProducts(null) 
        if (productSearch == ''){
            setProducts([])
        }else{
            const businessArray = await getNearBusinesses(userData)
            const businessArrayIds = businessArray.map(busObj => busObj._id)
            const result = await api.getAllProductsBySearch(productSearch)
            const nearProducts = result.data.filter(product => businessArrayIds.includes(product.business._id))
            setProducts(nearProducts) 
            history.push(`/Search?searchText=${productSearch}`)
        }
    }, [productSearch]);

    const productHandler = event => {
        const {value} = event.target
        setProductName(value)
    }

    const onSearchClick = () => {
        setProductSearch(productName)
    }

    return ( 
        <div className='container-fluid'>
            <div className='container'>
                <Row >
                    <Col xs='12' className='search-container'>
                        <h2 className='p-titles'>Buscar por producto</h2>
                        <div className= "b-container-search">
                                <SearchBar
                                productName = {productName}
                                productHandler={productHandler}
                                onSearchClick={onSearchClick}
                                />
                        </div>
                        <Row className='product-display'>
                            { !products && <PapexSpinner text="Buscando productos..."/> }
                            { products && !products.length && <h2>No se encontraron productos...</h2>}
                            {
                                products && products.map((item) =>{
                                    return  <ProductCard
                                                ProductData={item}
                                                key={item._id}
                                            /> })
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
           
           
        </div> 
    )
}

export default SearchPage