import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget'
import logo from '../img/mobile-logo.png'
import { categorias } from '../Router-Dom/categorias';

const NavBar = () => {
  return (
  <Navbar collapseOnSelect bg='dark' variant='dark' expand='sm' className='navBar'>
    <Navbar.Brand as={Link} to='/'>
      <img src={logo} alt='mobilePage-logo' className='navbar__brandLogo'/>{'  '}
      Mobile Imports
    </Navbar.Brand>

    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <Nav.Link as={Link} to='/'>Home</Nav.Link>
        <Nav.Link as={Link} to='/contacto'>Contacto</Nav.Link>
        <NavDropdown title='Productos'>
          {categorias.map(c => {
            return <NavDropdown.Item as={Link} to={c.address} key={c.id}>{c.text}</NavDropdown.Item>
          })}
        </NavDropdown>
        <Nav.Link as={Link} to='/cart'><CartWidget/></Nav.Link>

      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
};

export default NavBar;