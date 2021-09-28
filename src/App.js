import react from 'react'

import react, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './assets/global_style.scss'
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
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

function App() {

  const [userData, setUserData ] = useState(null)
  const [showNavBar, setShowNavBar] = useState(true)
  const history = useHistory()

  useEffect(()=>{
    const userDataRaw = localStorage.getItem("userData") 
    const userData = userDataRaw ? JSON.parse(userDataRaw) : null 
    setUserData(userData) 
          
  },[])

  function changeUserData(myUserData){
    setUserData(myUserData)
  }

  function changeShowNavBar(value){
    setShowNavBar(value)
  }

  return (
    <Router>
      <div>      

        { showNavBar &&
          <PapexNav
            userData = { userData }
          />
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

            <Login             
              changeUserData = {changeUserData}
              changeShowNavBar = { changeShowNavBar }
            />
          </Route>                    
          <Route path="/">
            <Main/>
          </Route>  
                 
        </Switch>
      </div>
    </Router>
  );
}


export default App;
