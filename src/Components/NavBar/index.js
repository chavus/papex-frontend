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
import oscar from '../../img/oscar.jpg'
import './styles.scss'

const PapexNav = () => {
  

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
            <NavItem >
              <Link to="/CatalogoNegocio" className='nav-link d-none d-sm-block'>Catalogo</Link>
            </NavItem>
            <button className='btn-p-secondary nav-btn d-none d-sm-block'>Cerrar Sesión</button>
         
              <button className='profile-btn'>
									<span className="profile">
										<img src={oscar}/>
									</span>
						   </button>
           
          </Nav>
          
      </Navbar>
    </div>
  );
}

export default PapexNav

