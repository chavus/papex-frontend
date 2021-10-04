import React, { useState, useContext } from 'react';
import { UserContext } from '../../App'
import './styles.scss'
import { Dropdown, DropdownMenu, DropdownToggle, NavItem } from 'reactstrap';
import { Link } from "react-router-dom"
import avatar from '../../img/avatarpre.jpg'


const NavDropdown = (props) => {
  
  const [userData] = useContext(UserContext)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {goLogout, goLogin} = props

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className='profile-btn '>
          <span className="profile">        
              <img src={avatar}/>
            </span>
        </DropdownToggle>
        <DropdownMenu className='drop-menu ' >   
          { userData && 
          <Link 
          to="/MisPedidos" 
          className='nav-link'>
            Mis Pedidos
        </Link> }
        { userData &&
        <Link 
        to="/CreatePost" 
        className='nav-link'>
          Mi Perfil
         </Link>  }
        

         { userData &&
          userData.rol == 'Negocio' && <Link 
            to="/CatalogoNegocio" 
            className='nav-link d-none d-sm-block'>
              Catálogo
          </Link>} 

          {!userData ? <button 
                className='btn-p-secondary nav-btn' 
                onClick={goLogin} > 
                Iniciar Sesión
            </button> : 
            <button 
                className='btn-p-secondary nav-btn' 
                onClick={goLogout} > 
                Cerrar Sesión
          </button> 
            }
        </DropdownMenu>
      </Dropdown> 
    </div>
    
  );
}

export default NavDropdown;