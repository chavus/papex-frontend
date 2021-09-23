import react from 'react'
import logo from './logo.svg';
import './App.css';
import './assets/global_style.scss'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

// Pages
import CatalogoNegocio from './Pages/CatalogoNegocio'
import MisPedidos from './Pages/MisPedidos'
import Perfil from './Pages/Perfil'
import DetalleNegocio from './Pages/DetalleNegocio';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/CatalogoNegocio">Catalogo de negocios</Link>
            </li>
            <li>
              <Link to="/Perfil">Perfil</Link>
            </li>
            <li>
              <Link to="/MisPedidos">Mis Pedidos</Link>
            </li>
          </ul>
        </nav>

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
        </Switch>
      </div>
    </Router>
  );
}


export default App;
