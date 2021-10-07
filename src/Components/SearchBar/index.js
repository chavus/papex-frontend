import React, { useState } from 'react'
import './styles.scss'
import { FaSearch } from 'react-icons/fa';
import { Col, Row, Input, FormGroup, Form, Label } from 'reactstrap'

const  SearchBar = (props) => {

    const {productHandler, onSearchClick, productName} = props

    return (
    <div className="search-container">
        <div className="container-input">
            <Form>
                <FormGroup>
                    <Input
                        value={productName}
                        type="text" 
                        className="form-control input-buscar" 
                        placeholder="Búsqueda"
                        onChange={productHandler}
                    />
                        <FaSearch
                        className='search-button'
                        color='white'
                        onClick={onSearchClick}
                     />
                </FormGroup>

            </Form>   
        </div>
   </div>

    )
    
}

export default SearchBar