import { useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { UserContext, ShoppingCartContext } from '../../App'
import { createOrders } from "../ShoppingCart/utils";

export default function Checkout(){
    const status = new URLSearchParams(useLocation().search).get("status")
    const [userData] = useContext(UserContext)
    const {shoppingCart} = useContext(ShoppingCartContext)
    const history = useHistory()
    console.log("In checkout page")
    console.log(status)

    useEffect(async ()=>{
        console.log('in useEffect')
        if (status == 'cancelled'){
            history.push('/miCarrito')
        }else if(status == 'success'){
            const createdOrders = await createOrders(shoppingCart, userData._id)
            console.log(createdOrders)
            history.push('/MisPedidos')
        }
    },[])
    
    return null
}