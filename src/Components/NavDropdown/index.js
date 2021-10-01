import React, { useState, useContext } from 'react';
import { UserContext } from '../../App'
import './styles.scss'
import { Dropdown, DropdownMenu, DropdownToggle, NavItem } from 'reactstrap';
import { Link } from "react-router-dom"
import avatar from '../../img/avatarpre.jpg'


const NavDropdown = () => {
  
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
        <DropdownMenu className='drop-menu' >   
          <Link 
            to="/Home" 
            className='nav-link d-none d-sm-block'>
              Mis Pedidos
          </Link>
          <Link 
            to="/CreatePost" 
            className='nav-link d-none d-sm-block'>
              Mi Perfil
          </Link>

         { userData &&
          userData.rol == 'Negocio' && <Link 
            to="/CatalogoNegocio" 
            className='nav-link d-none d-sm-block'>
              Catálogo
          </Link>} 
        </DropdownMenu>
      </Dropdown> 
    </div>
    
  );
}

export default NavDropdown;