import React, { useState, useContext } from 'react';
import { UserContext } from '../../App'
import './styles.scss'
import { Dropdown, DropdownMenu, DropdownToggle, NavItem } from 'reactstrap';
import { Link } from "react-router-dom"
import avatar from '../../img/avatarpre.jpg'


const NavDropdown = (props) => {
  
  const [userData] = useContext(UserContext)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className='profile-btn'>
          <span className="profile">        
              <img src={avatar}/>
            </span>
        </DropdownToggle>
        <DropdownMenu className='drop-menu d-lg-none d-xl-block' >   
          <Link 
            to="/Home" 
            className='nav-link'>
              Mis Pedidos
          </Link>
          <Link 
            to="/CreatePost" 
            className='nav-link'>
              Mi Perfil
          </Link>

         { userData &&
          userData.rol == 'Negocio' && <Link 
            to="/CatalogoNegocio" 
            className='nav-link d-none d-sm-block'>
              Catálogo
          </Link>} 
          <button 
                className='btn-p-secondary nav-btn' 
                 > 
                Cerrar Sesión
          </button> 
        </DropdownMenu>
      </Dropdown> 
    </div>
    
  );
}

export default NavDropdown;