import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <>
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
                <div className='w-100' style={{ maxWidth: '500px' }}>
                    <Outlet />
                </div>
            </Container>
        </>
    )
}
