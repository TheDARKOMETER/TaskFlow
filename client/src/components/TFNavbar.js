import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo-min.png'
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';

export default function TFNavbar() {
    const [expanded, setExpanded] = useState(false)
    const [isMobileView, setIsMobileView] = useState(false);
    const { currentUser } = useAuth();
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
        <Navbar expand='lg' expanded={expanded} onToggle={onToggle} style={{ fontSize: '1.2rem', fontWeight: '500', borderBottom: 'solid', borderColor: 'black', borderWidth: '1px', textAlign: 'center' }} className='bg-body-tertiary'>
            <Container fluid>
                <NavbarBrand><img src={logo} alt='Brand Logo'></img></NavbarBrand>
                <NavbarToggle aria-controls='basic-navbar-nav' />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            isMobileView ? (
                                <>
                                    <Nav.Link href='/login'>Log In</Nav.Link>
                                    <Nav.Link href='/signup'>Sign Up</Nav.Link>
                                </>
                            ) : (
                                <>
                                    {!currentUser ? (
                                        <>
                                            <Nav.Link href='/login'><Button variant='outline-dark'>Log In</Button></Nav.Link>
                                            <Nav.Link href='/signup'><Button variant='dark'>Sign Up</Button></Nav.Link>
                                        </>) : (
                                        <>
                                            <Nav.Link href='/signup'><Button variant='dark'>Log Out</Button></Nav.Link>
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
