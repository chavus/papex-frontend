import react, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './assets/global_style.scss'
import './App.scss';
import api from './assets/lib/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addToCart from './assets/lib/addToCart';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
  Link
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
import ManageProduct  from './Pages/ManageProduct';
import Checkout from './Pages/Checkout';

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

  //// tab sync
  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "shoppingCart") {
      setShoppingCart(JSON.parse(newValue));
    }
  };

  useEffect(() => {
    // setName(localStorage.getItem("name") || "");
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  function changeUserData(data) {
    setUserData(data)
    localStorage.setItem('userData', JSON.stringify(data))
  }

  function changeShoppingCart(data) {
    setShoppingCart(data)
    localStorage.setItem('shoppingCart', JSON.stringify(data))
  }

  const notify = (msg) => toast.success(msg);

  async function addToShoppingCart(productId){
    const res = await api.getProductById(productId)
    const productData = res.data
    const shoppingCartTemp = addToCart(productData, shoppingCart)
    setShoppingCart(shoppingCartTemp)
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartTemp))
    notify(`Agregaste ${productData.name} a tu carrito`)
  }
  
  return (
    <UserContext.Provider value={[userData, changeUserData]}>
      <ShoppingCartContext.Provider value={{shoppingCart, changeShoppingCart, addToShoppingCart}}>
        <div>
          <Link to="/micarrito">
            <ToastContainer/>
          </Link>      

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
            { (!userData || (userData && userData.rol != "Negocio")) &&
            <Route path="/MiCarrito">
              <ShoppingCart/>
            </Route> 
            }
            <Route path="/checkout">
              <Checkout/>
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
            <Route strict exact path="/">
              <Main/>
            </Route>  
                  
          </Switch>
        </div>
        </ShoppingCartContext.Provider>
    </UserContext.Provider>
  );
}


export default App;
