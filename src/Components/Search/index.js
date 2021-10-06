import React, {useState} from 'react'
import {
    Link,
} from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import "./styles.scss"

function Search(props) {
    const [searchTerm, setSearchTerm] = useState("")


    function onSearchChange(event){
        const value = event.target.value
        setSearchTerm(value)
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="search-contain bg-p-primary p-3 mb-3 p-borders">
                    <form action="">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                            />
                            <Link className="search-button" to={`/Search?searchText=${searchTerm}`}><FaSearch /></Link>
                        </div>
                        
                    </form>
                   
                </div>
            </div>
        </div>
    )
}

export default Search
