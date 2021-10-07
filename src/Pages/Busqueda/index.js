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

    const history = useHistory()
    
    // useEffect(async ()=>{
    //     // const businessArray = await getNearBusinesses(userData)
    //     // console.log(businessArray);
    // }, [])

    useEffect( async () => {
        const businessArray = await getNearBusinesses(userData)
        const businessArrayIds = businessArray.map(busObj => busObj._id)
        const result = await api.getAllProductsBySearch(productSearch)
        // console.log(result);
        const nearProducts = result.data.filter(product => businessArrayIds.includes(product.business._id))
        // console.log(nearProducts);
        setProducts(nearProducts) 
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
        <div className='container-fluid'>
            <div className='container'>
                <Row >
                    <Col xs='12' className='search-container'>
                        <h1 className='p-titles'>Búsqueda</h1>
                        <div className= "b-container-search">
                                <SearchBar
                                productHandler={productHandler}
                                onSearchClick={onSearchClick}
                                />
                        </div>
                        <Row className='product-display'>
                            { !products && <PapexSpinner text="Buscando productos..."/> }
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