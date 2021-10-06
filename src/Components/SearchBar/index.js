import React, { useState } from 'react'
import './styles.scss'
import { FaSearch } from 'react-icons/fa';
import { Col, Row, Input, FormGroup, Form, Label } from 'reactstrap'

const  SearchBar = (props) => {

    const {productHandler, onSearchClick} = props

    return (
    <Col className="row search-container">
        <div className="container-input">
            <Form>
                <FormGroup>
                    <Input
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
   </Col>

    )
    
}

export default SearchBar