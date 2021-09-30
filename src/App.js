import react, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './assets/global_style.scss'
import './App.scss';

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

//Contexts
export const UserContext = react.createContext()

function App() {

  let location = useLocation()
  const [userData, setUserData ] = useState(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null)
  const [showNavBar, setShowNavBar] = useState(true)
  const history = useHistory()

  useEffect(()=>{
    console.log(location.pathname)
  },[location])

  function changeUserData(data) {
    setUserData(data)
    localStorage.setItem('userData', JSON.stringify(data))
  }

  function changeShowNavBar(value){
    setShowNavBar(value)
  }

  return (
    <UserContext.Provider value={[userData, changeUserData]}>
        <div>      

          { location.pathname != "/Login" &&
            <PapexNav/>
          }

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/CatalogoNegocio">
              <CatalogoNegocio              
              />
            </Route>
            <Route path="/Perfil">
              <Perfil 
        
              />
            </Route>
            <Route path="/MisPedidos">
                <MisPedidos 
        
                />
            </Route>
            <Route path="/DetalleNegocio/:id">
                <DetalleNegocio 
      
                />
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
            <Route path="/">
              <Main/>
            </Route>  
                  
          </Switch>
        </div>
    </UserContext.Provider>
  );
}


export default App;
