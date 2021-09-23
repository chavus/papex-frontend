
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

const PapexNav = () => {
  

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/Home">Papex</NavbarBrand>
    
          <Nav className="mr-auto" navbar>
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

export default PapexNav