import React from 'react'
import TFNavbar from '../components/TFNavbar'
import Footer from '../components/Footer'
import { Container, Image } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/logo-no-icon.png'

export function MainLayout() {
    return (
        <>
            <TFNavbar />
            <Container fluid className='pe-0 ps-0'>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}

export function AuthLayout() {
    return (
        <>
            <Link to="/" style={{ textDecoration: 'none', color: 'black', position: 'absolute' }} className='ms-2 mt-2'><FontAwesomeIcon style={{ fontSize: 'inherit' }} icon={faChevronLeft} />Home</Link>
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
                <div className='w-100' style={{ maxWidth: '500px' }}>
                    <div style={{ textAlign: 'center' }} className='mb-4'><Image src={logo} alt='Brand Logo' /></div>
                    <Outlet />
                </div>
            </Container>
        </>
    )
}
