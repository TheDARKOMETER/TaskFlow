import React from 'react'
import TFNavbar from '../components/TFNavbar'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

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
            <Link to="/" className='btn btn-outline-dark'>Home</Link>
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
                <div className='w-100' style={{ maxWidth: '500px' }}>
                    <Outlet />
                </div>
            </Container>
        </>
    )
}
