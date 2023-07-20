import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo-min.png'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/authContext';

export default function TFNavbar() {
    const [expanded, setExpanded] = useState(false)
    const [isMobileView, setIsMobileView] = useState(false);
    const { currentUser, logout } = useAuth();
    const onToggle = () => {
        setExpanded(!expanded);
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as per your needs
        };

        handleResize(); // Check initial window width
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <Navbar expand='lg' expanded={expanded} onToggle={onToggle} style={{ fontSize: '1.1rem', fontWeight: '500', borderBottom: 'solid', borderColor: 'black', borderWidth: '1px', textAlign: 'center' }} className='bg-body-tertiary'>
            <Container fluid>
                <NavbarBrand><img src={logo} alt='Brand Logo'></img></NavbarBrand>
                <NavbarToggle aria-controls='basic-navbar-nav' />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                        {(currentUser ? (<Nav.Link href="/dashboard">Dashboard</Nav.Link>) : (null))}
                    </Nav>
                    <Nav>
                        {
                            isMobileView ? (
                                <>
                                    {
                                        !currentUser ? (
                                            <>
                                                <Nav.Link href='/auth/login'>Log In</Nav.Link>
                                                <Nav.Link href='/auth/signup'>Sign Up</Nav.Link>
                                            </>) : (<Nav.Link href='/auth/update-profile'>Update Profile</Nav.Link>)
                                    }

                                </>
                            ) : (
                                <>
                                    {!currentUser ? (
                                        <>
                                            <Nav.Link href='/auth/login'><Button variant='outline-dark'>Log In</Button></Nav.Link>
                                            <Nav.Link href='/auth/signup'><Button variant='dark'>Sign Up</Button></Nav.Link>
                                        </>) : (
                                        <>
                                            <Navbar.Text style={{ display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
                                                Signed in as: {currentUser.displayName ? currentUser.displayName : currentUser.email}
                                            </Navbar.Text>
                                            <NavDropdown title={<FontAwesomeIcon icon={faGear} />} style={{ display: 'flex', alignItems: 'center' }} id="basic-nav-dropdown">
                                                <NavDropdown.Item href="/auth/update-profile">Update Profile</NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link href='/auth/login'><Button variant='dark' onClick={logout}>Log Out</Button></Nav.Link>
                                        </>
                                    )}

                                </>)
                        }

                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar >
    )
}
