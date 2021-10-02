import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import BusinessCard from '../../Components/BusinessCards'
import Search from  '../../Components/Search'
import api from '../../assets/lib/api'
import "./styles.scss"

function Main() {

    const [userData] = useContext(UserContext)
    const [negocios, setNegocios] = useState(null)
    useEffect( async()=> {
        if (userData){
            console.log('yes, you are logged in as', userData.name)
            console.log('this is your id', userData._id)
            // como el usuario está loggeado, enviarle el id al metodo getNearBusinesses
            const by = "userId"
            // const dataUsr = "613a8f2d4970bb933617e945"
            const dataUsr = userData._id
            const radius = 3
            
            const arrayBusiness = await api.getNearBusiness(by, dataUsr, radius)
            console.log("si fui a buscar negocios cercanos: ", arrayBusiness)
            setNegocios(arrayBusiness)
            // const dataB = nearBusiness.map( (item)=>{
            //     console.log("estos son los negocios cercanos: " , item.businessName)
            // })
            
            
        }else{
            navigator.geolocation.getCurrentPosition(
                async(position) => {
                    console.log("Position: ", position.coords.latitude, position.coords.longitude)
                    const by = "userCoord"
                    // const dataUsr = "20.643295,-103.423268"
                    const dataUsr = `${position.coords.latitude},${position.coords.longitude}`
                    const radius = 3
                    
                    const arrayBusiness = await api.getNearBusiness(by, dataUsr, radius)
                    console.log("si fui a buscar negocios cercanos: ", arrayBusiness)
                    setNegocios(arrayBusiness)
                })
        }
        // const apiData = await api.getAllUsers()
        // const arrayBusiness = apiData.filter(user =>{
        //     return user.rol === "Negocio"
        // })
        // setNegocios(arrayBusiness)
        // console.log("en useEffect ", negocios)
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
                  
                    {negocios ? negocios.map((item)=>{
                        
                        return(
                            
                                    <BusinessCard
                                        key={item._id}
                                        id={item._id}
                                        businessName={item.businessName}
                                        address={item.address}
                                        phoneNumber={item.phoneNumber}
                                    />
                                
                            
                        )
                    }) : (<h1>No hay negocios cercanos a su domicilio</h1>)
                    
                    }
                        
                </div>
            </div>
        </>
    
    )
    }
export default Main
