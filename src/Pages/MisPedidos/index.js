import React, { useState, useEffect, useContext } from "react"
import {  useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import { Col, Row } from "reactstrap"
import api from '../../assets/lib/api'
import OrderDetail from "../../Components/OrderStatus"
import ClientOrderDetail from "../../Components/OrderStatusClients"
import './styles.scss'
import { result } from "lodash"

export default function MisPedidos(){

    const [userData] = useContext(UserContext)
    const [orders, setOrders] = useState([])
    let history = useHistory()

    useEffect( async() => {
        if (userData){
            const result = await api.getAllOrders()
            let orderFiltered
            if (userData.rol == 'Negocio'){
                // console.log("in negocio")
                // console.log(result)
                // console.log(userData)
                // console.log(result.map(order => [order._id, order.business]))
                orderFiltered = result.filter(order => order.business._id == userData._id)
            }else{
                orderFiltered = result.filter(order => order.client._id == userData._id)
            }
            orderFiltered.reverse()
            setOrders(orderFiltered)
            console.log(orderFiltered)
        } else {
            history.push('/Login')
        }

     }, []);


    return(
        <div className="container-fluid">
            <div className="container">


        {/* <div className='my-orders'> */}
           <h2 className='p-titles'>Mis Pedidos</h2>
           {/* <div className='container-orders'> */}
           { userData && 
           userData.rol == 'Negocio' ? 
           orders.map((order) => {
               return  <OrderDetail 
                            key={order._id}
                            order={order}
                            token={userData.token} 
                            />
           })
           :  orders.map((order) => {
            return  <ClientOrderDetail 
                         key={order._id}
                         order={order}
                         token={userData.token} 
                         />
        })}

           </div>
          
       
        </div>
        // </div>
        // </div>
    )
}