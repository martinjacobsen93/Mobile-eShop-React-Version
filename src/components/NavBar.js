import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget'
import logo from '../img/mobile-logo.png'

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
          <NavDropdown.Item as={Link} to='/products/Samsung'>Samsung</NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/products/Motorola'>Motorola</NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/products/Xiaomi'>Xiaomi</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to='/productos'>Todas las marcas</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={Link} to='/cart'><CartWidget/></Nav.Link>

      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
};

export default NavBar;

























//   return (
//     <Navbar bg="dark" variant='dark' expand="lg">
//   <Container>
//     <Navbar.Brand as={Link} to='/'>React-Bootstrap</Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="me-auto">
//         <Nav.Link as={Link} to='/'>Home</Nav.Link>
//         <Nav.Link as={Link} to='/contacto'>Contacto</Nav.Link>
//         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//           <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//           <NavDropdown.Divider />
//           <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//         </NavDropdown>
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>
//   )