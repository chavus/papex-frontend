import React,{ useContext } from 'react';
import {Link } from "react-router-dom";
import { ShoppingCartContext } from '../../App'
import { Badge } from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa'; 
import './styles.scss'

const CartNotifications = (props) => {

  const {shoppingCart} = useContext(ShoppingCartContext)  
  let cartQuantity = shoppingCart.map((item) => {
      
    return  item.products.reduce((accum, current) =>{
        return  accum +  current.qty   
      },0)
      
  })  

  let totalCart = cartQuantity.reduce((accum, item) => {
      return accum + item
  },0)

  console.log('este es el shopping cart',shoppingCart)
  console.log('este es el total cart', totalCart)

  return (
    <div className='cart-icon'>
      <Link to='/MiCarrito' className='nav-link' >
        <FaShoppingCart
        className='cart-image'
        />  
        <Badge 
         className='number-articles'
        >{totalCart}
        </Badge> 
      </Link>
    </div>
  );
}

export default CartNotifications;