import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/authContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
            setEmailSent(true)
        } catch (err) {
            setError(`Failed to reset password | ${err}`)
        }
        setLoading(false)
    }

    return (
        <>
            <Card className='h-100' style={{ display: 'flex', maxWidth: '800px', maxHeight: '700px', minWidth: '250px' }}>
                <Card.Body>
                    <Card.Title className='text-center'>Sign Up</Card.Title>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" required />
                        </Form.Group>
                        <Button disabled={emailSent || loading} variant='dark' className='w-100 mt-3 mb-3' type='submit'>Reset Password</Button>
                    </Form>
                    <div className='text-center'>
                        <Link to='/auth/login'>Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='text-center mt-3'>Need an Account? <Link to='/auth/signup'>Sign Up</Link></div>
        </>
    )
}
