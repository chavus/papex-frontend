import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import papex from '../../img/papex.png'
import './styles.scss'

const PapexNav = () => {
  

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand href="/Home"><img src={papex} className='nav-logo'/></NavbarBrand>
    
          <Nav className="mr-auto navbar">
            <NavItem >
              <Link to="/Home" className='nav-link'>Mis Pedidos</Link>
            </NavItem>
            <NavItem >
              <Link to="/CreatePost" className='nav-link'>Mi Perfil</Link>
            </NavItem>
            <NavItem >
              <Link to="/CatalogoNegocio" className='nav-link'>Catalogo</Link>
            </NavItem>
          </Nav>
          
      </Navbar>
    </div>
  );
}

<<<<<<< HEAD
export default PapexNav
=======
export default PapexNav

>>>>>>> main
