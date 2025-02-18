import React from 'react'
import TFNavbar from '../components/TFNavbar'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
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
