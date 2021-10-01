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
import ShoppingCart from './Pages/ShoppingCart'
import { createContext } from 'react';

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

  function addToShoppingCart(proudctId){
    // const productData = api.get
    return
  }

  return (
    <UserContext.Provider value={[userData, changeUserData]}>
      <ShoppingCartContext.Provider value={{shoppingCart, changeShoppingCart}}>
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
