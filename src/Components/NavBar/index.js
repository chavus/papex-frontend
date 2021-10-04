import React,{ useContext } from 'react';
import { UserContext } from '../../App'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import {
  Link,
  useHistory
} from "react-router-dom";
import papex from '../../img/papex.png'
import './styles.scss'
import NavDropdown from '../NavDropdown';

const PapexNav = () => {

  const [userData] = useContext(UserContext)

  let history = useHistory()

  function goLogin(){
    history.push("/Login")
  }

  function goLogout(){
    localStorage.setItem('userData',"")
    history.push("/")
    window.location.reload()
  }

  return (
    <div className='nav-header '>
      <Navbar>
        <NavbarBrand href="/"><img src={papex} className='nav-logo'/></NavbarBrand>
    
          <Nav className="mr-auto nav-links">
            <NavItem >
              <Link to="/Home" className='nav-link d-none d-sm-block'>Mis Pedidos</Link>
            </NavItem>
            <NavItem >
              <Link to="/CreatePost" className='nav-link d-none d-sm-block'>Mi Perfil</Link>
            </NavItem>
            { userData && 
             userData.rol == 'Negocio' && <NavItem >
              <Link to="/CatalogoNegocio" className='nav-link d-none d-sm-block'>Catalogo</Link>
            </NavItem>}
           {!userData ? <button 
                className='btn-p-secondary nav-btn d-none d-sm-block' 
                onClick={goLogin} > 
                Iniciar Sesión
            </button> : 
            <button 
                className='btn-p-secondary nav-btn d-none d-sm-block' 
                onClick={goLogout} > 
                Cerrar Sesión
          </button> 
            }
         
            <NavDropdown/>
          
          </Nav>
          
      </Navbar>
    </div>
  );
}

export default PapexNav

