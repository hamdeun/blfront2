import React from 'react';
import './NavBar.css'
import { useState } from 'react';
import {Container,Nav, Navbar,NavDropdown}  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FaBars} from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SideBar } from '../SideBar/SideBar';



function NavBar() {
    const[sidebar,setSideBar]=useState(false);
    const showSidebar=()=>setSideBar(!sidebar);
    
    
  return (
    <div className='navbar-container'>
    
    <Navbar expand="lg" className="navbar">
    <div className='sidebar-icon'>
    <Link to='#' className='menu-bar'>
    <FaBars  size={30} onClick={showSidebar} />
    </Link>
    </div>
      <Container>
        <Navbar.Brand href="#home"><img src="" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="options">
            <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
               Déconnexion
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='/' className='menu-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            {SideBar.map((item, index) => {
              return (
                
                <li key={index} className={item.cName} >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>

    </nav>
    </div>
  );
}

export default NavBar;