import React, { useState, useEffect } from 'react'
import BusinessCard from '../../Components/BusinessCards'
import Search from  '../../Components/Search'
import api from '../../lib/api'
import "./styles.scss"

function Main() {

    const [negocios, setNegocios] = useState(null)
    useEffect( async()=> {
       
        const apiData = await api.getAllUsers()
        const arrayBusiness = apiData.filter(user =>{
            return user.rol === "Negocio"
        })
        setNegocios(arrayBusiness)
        console.log("en useEffect ", negocios)
    },[])

    return (
        <>
            <div className="b-container">
            <h1>Página Inicio</h1>
                <div className="row search-container">
                    <Search/>
                </div>
                <div className="row">
                    {console.log("antes de hacer el map: ", negocios)}
                  
                    {negocios && negocios.map((item)=>{
                        
                        return(
                            
                                    <BusinessCard
                                        key={item._id}
                                        id={item._id}
                                        businessName={item.businessName}
                                        address={item.address}
                                        phoneNumber={item.phoneNumber}
                                    />
                                
                            
                        )
                    })}
                        
                </div>
            </div>
        </>
    
    )
    }
export default Main
