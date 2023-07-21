import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import GSignIn from '../assets/1x/btn_google_signin_dark_normal_web.png'
import { useAuth } from '../contexts/authContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import HttpService from '../services/http-service'



export default function SignIn() {
    const http = new HttpService()
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signin, getUserToken } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            // const uid = await getUserToken()
            // const response = await http.testGetToken(uid)
            // http.testTokenAuthorizaion(uid).then(data => {
            //     console.log(data)
            // })
            // console.log(response)
            navigate('/')
        } catch (err) {
            setError(`Failed to log in ${err}`)
        }
        setLoading(false)
    }

    return (
        <>
            <Card className='h-100' style={{ display: 'flex', maxWidth: '800px', maxHeight: '700px', minWidth: '250px' }}>
                <Card.Body>
                    <Card.Title className='text-center'>Log In</Card.Title>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" required />
                        </Form.Group>
                        <Button disabled={loading} variant='dark' className='w-100 mt-3 mb-3' type='submit'>Log In</Button>
                    </Form>
                    <div className='text-center mb-3'><Link to='/auth/forgot-password'>Forgot Password?</Link></div>
                    <div className='w-100 text-center' style={{
                        borderBottom: '1px solid #000',
                        lineHeight: '0.1em',
                        fontSize: '16px',
                        margin: '10px 0 20px'
                    }}><span style={{
                        background: '#fff',
                        padding: '0 5px'
                    }}>or</span></div>
                    <div style={{ textAlign: 'center' }}>
                        <img src={GSignIn} alt='temporary gsign in button for aesthetic' />
                    </div>
                </Card.Body>
            </Card>
            <div className='text-center mt-3'>Need an Account? <Link to='/auth/signup'>Sign Up</Link></div>
        </>
    )
}
