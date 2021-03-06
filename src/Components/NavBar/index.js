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
import CartNotifications from '../CartNotifications';

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
        <div className='nav-right-side'>
        <NavbarBrand href={userData && userData.rol == "Negocio" ? "/CatalogoNegocio" : "/"} ><img src={papex} className='nav-logo'/></NavbarBrand>
        
        { userData &&
          ( userData.rol == 'Negocio'?
           <Link to='/CatalogoNegocio' className='nav-user'>Hola {userData.businessName}</Link> :
           <Link to='/' className='nav-user'>Hola {userData.name}</Link>)
         }

        </div>
        
         

         
          
          <Nav className="mr-auto nav-links">
        
            <NavItem >
              {userData && 
              <Link to="/MisPedidos" className='nav-link d-none d-sm-block'>Mis Pedidos</Link>}
            </NavItem>
            <NavItem >
              {userData && 
              <Link to="/CreatePost" className='nav-link d-none d-sm-block'>Mi Perfil</Link>}
            </NavItem> 

            { userData && 
             userData.rol == 'Negocio' && <NavItem >
              <Link to="/CatalogoNegocio" className='nav-link d-none d-sm-block'>Catalogo</Link>
            </NavItem>}
           
               { (!userData || userData.rol == 'Cliente') &&
             <NavItem> 
                   <CartNotifications/>
              </NavItem> }
           
           
           {!userData ? <button 
                className='btn-p-secondary nav-btn d-none d-sm-block' 
                onClick={goLogin} > 
                Iniciar Sesi??n
            </button> : 
            <button 
                className='btn-p-secondary nav-btn d-none d-sm-block' 
                onClick={goLogout} > 
                Cerrar Sesi??n
          </button> 
            }
          
            <NavDropdown
              goLogout ={goLogout}
              goLogin = {goLogin}
            />


           
          </Nav>
          
      </Navbar>
    </div>
  );
}

export default PapexNav

