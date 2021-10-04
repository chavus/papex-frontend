import React, { useState, useEffect, useContext } from "react"
import {  useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import { Col } from "reactstrap"
import api from '../../assets/lib/api'
import OrderDetail from "../../Components/OrderStatus"
import './styles.scss'

export default function MisPedidos(){

    const [userData] = useContext(UserContext)
    const [orders, setOrders] = useState([])
    let history = useHistory()

    useEffect( async() => {
        if (userData ){
            const result = await api.getAllOrders()
            let orderFiltered
            if (userData.rol == 'Negocio'){
                orderFiltered = result.filter(order => order.business._id == userData._id)
            }else{
                orderFiltered = result.filter(order => order.client._id == userData._id)
            }
            setOrders(orderFiltered)
            console.log(orderFiltered)
        } else {
            history.push('/Login')
        }
       
     }, []);



    return(
        <Col className='my-orders'>
           <h1>Mis Pedidos</h1>
            { userData && 
           userData.rol == 'Negocio' ? 
           orders.map((order) => {
               return  <OrderDetail 
                            order={order}
                            token={userData.token} />
           })
           : <h1>Orden de Cliente</h1>}
       
        </Col>
     
    )
}