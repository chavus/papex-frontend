import react from 'react'

import './assets/global_style.scss'
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Pages
import CatalogoNegocio from './Pages/CatalogoNegocio'
import MisPedidos from './Pages/MisPedidos'
import Perfil from './Pages/Perfil'
import DetalleNegocio from './Pages/DetalleNegocio';
import Login from  './Pages/Login';
import PapexNav from './Components/NavBar';
import Main from './Pages/Main'

function App() {
  return (
    <Router>
      <div>
       <PapexNav/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/CatalogoNegocio">
            <CatalogoNegocio />
          </Route>
          <Route path="/Perfil">
            <Perfil />
          </Route>
          <Route path="/MisPedidos">
            <MisPedidos />
          </Route>
          <Route path="/DetalleNegocio/:id">
            <DetalleNegocio />
          </Route>   
          <Route path="/Login">
            <Login />
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
