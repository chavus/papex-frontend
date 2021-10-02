import React, {useState} from 'react'
import {
    Link,
} from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

import "./styles.scss"

function Search() {
    const [searchTerm, setSearchTerm] = useState("")

    function onSearchChange(event){
        const value = event.target.value
        setSearchTerm(value)
    }

    return (
        <>
            <div className="container-input">
                <input 
                    type="text" 
                    className="form-control input-buscar" 
                    placeholder="Búsqueda"
                    onChange={ onSearchChange }
                 />
                <Link className="search-button" to={`/search?search=${searchTerm}`}><FaSearch /></Link>
            </div>
        </>
    )
}

export default Search
