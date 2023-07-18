import React from 'react'
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo-min.png'
import { Button } from 'react-bootstrap';

export default function TFNavbar() {
    return (
        <Navbar style={{ fontSize: '1.2rem', fontWeight: '500', borderBottom:'solid', borderColor:'black', borderWidth:'1px' }} className='bg-body-tertiary'>
            <Container fluid>
                <NavbarBrand><img src={logo} alt='Brand Logo'></img></NavbarBrand>
                <NavbarToggle aria-controls='basic-navbar-nav' />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">About Us</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href='/login'><Button variant='outline-dark'>Log In</Button></Nav.Link>
                        <Nav.Link href='/signup'><Button variant='dark'>Sign Up</Button></Nav.Link>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}
