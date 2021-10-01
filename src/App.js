import react, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './assets/global_style.scss'
import './App.scss';
import api from './assets/lib/api'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation
} from "react-router-dom";

// Pages
import CatalogoNegocio from './Pages/CatalogoNegocio'
import MisPedidos from './Pages/MisPedidos'
import Perfil from './Pages/Perfil'
import DetalleNegocio from './Pages/DetalleNegocio';
import Login from  './Pages/Login';
import PapexNav from './Components/NavBar';
import Main from './Pages/Main'
import UserRegister from './Pages/Registro';
import SearchPage from './Pages/Busqueda';
import ShoppingCart from './Pages/ShoppingCart'
import { createContext } from 'react';
import ManageProduct  from './Pages/ManageProduct';


//Test
import cartData from './Pages/ShoppingCart/cartTestData2'


//Contexts
export const UserContext = react.createContext()
export const ShoppingCartContext = react.createContext()

function App() {

  let location = useLocation()
  const [userData, setUserData ] = useState(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null)
  const [shoppingCart, setShoppingCart] = useState(localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : [])
  // const [shoppingCart, setShoppingCart] = useState(cartData)
  const [showNavBar, setShowNavBar] = useState(true)
  const history = useHistory()

  function changeUserData(data) {
    setUserData(data)
    localStorage.setItem('userData', JSON.stringify(data))
  }

  function changeShoppingCart(data) {
    setShoppingCart(data)
    localStorage.setItem('shoppingCart', JSON.stringify(data))
  }

  async function addToShoppingCart(productId){
    let shoppingCartTemp = [...shoppingCart]
    const res = await api.getProductById(productId)
    const productData = res.data
    //Check if product business is in cart
    const businessIdx = shoppingCart.findIndex( bizCart => bizCart.business == productData.business._id)
    if (businessIdx == -1) {
      //Initializa biz
      const cart = {
                    business: productData.business._id,
                    products:[{ product: productData._id,  qty:1 }],
                    comments: "",
                    deliveryMethod:"Pickup"
                  }
      shoppingCartTemp.push(cart)
    }else{
      const productIdx = shoppingCart[businessIdx].products.findIndex( product => product.product == productId)
      if (productIdx == -1){
        // No product, add
        shoppingCartTemp[businessIdx].products.push({product:productId, qty:1})
      }else{
        // Add 1 to the qty
        shoppingCartTemp[businessIdx].products[productIdx].qty += 1
      }
    }
    setShoppingCart(shoppingCartTemp)
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartTemp))
  }

  return (
    <UserContext.Provider value={[userData, changeUserData]}>
      <ShoppingCartContext.Provider value={{shoppingCart, changeShoppingCart, addToShoppingCart}}>
        <div>      

          { location.pathname != "/Login" &&
            <PapexNav/>
          }

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/CatalogoNegocio">
              <CatalogoNegocio/>
            </Route>
            <Route path="/Perfil">
              <Perfil/>
            </Route>
            <Route path="/MisPedidos">
                <MisPedidos/>
            </Route>
            <Route path="/MiCarrito">
              <ShoppingCart/>
            </Route> 
            <Route path="/DetalleNegocio/:id">
                <DetalleNegocio/>
            </Route>
              <Route path="/Registro">  
              <UserRegister/>
            </Route>    
            <Route path="/Login">
              <Login/>
            </Route>
            <Route path='/Search'>
              <SearchPage/>
            </Route>                    
            <Route path="/ManageProduct">
              <ManageProduct/>
            </Route>                               
            <Route path="/">
              <Main/>
            </Route>  
                  
          </Switch>
        </div>
        </ShoppingCartContext.Provider>
    </UserContext.Provider>
  );
}


export default App;
