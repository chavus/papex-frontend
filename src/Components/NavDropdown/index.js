import React, { useState } from 'react';
import './styles.scss'
import { Dropdown, DropdownMenu, DropdownToggle, NavItem } from 'reactstrap';
import { Link } from "react-router-dom"
import avatar from '../../img/avatarpre.jpg'


const NavDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle>
          <span className="profile">
                    
                    <img src={avatar}/>
            </span>
        </DropdownToggle>
        <DropdownMenu className='drop-menu' >   
          <Link to="/Home" className='nav-link d-none d-sm-block'>Mis Pedidos</Link>
          <Link to="/CreatePost" className='nav-link d-none d-sm-block'>Mi Perfil</Link>
          <Link to="/CatalogoNegocio" className='nav-link d-none d-sm-block'>Catalogo</Link>
        </DropdownMenu>
      </Dropdown> 
    </div>
    
  );
}

export default NavDropdown;