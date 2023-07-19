import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import GSignIn from '../assets/1x/btn_google_signin_dark_normal_web.png'

export default function SignUp() {
    return (
        <Card className='h-100' style={{ display: 'flex', maxWidth: '800px', maxHeight:'700px', minWidth: '250px' }}>
            <Card.Body>
                <Card.Title className='text-center'>Sign Up</Card.Title>
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" required />
                    </Form.Group>
                    <Button variant='dark' className='w-100 mt-3 mb-3' type='submit'>Sign Up</Button>
                </Form>
                <div className='w-100 text-center' style={{
                    borderBottom: '1px solid #000',
                    lineHeight: '0.1em',
                    fontSize: '18px',
                    margin: '10px 0 20px'
                }}><span style={{
                    background: '#fff',
                    padding: '0 5px'
                }}>or</span></div>
                <div style={{ textAlign: 'center' }}>
                    <img src={GSignIn} />
                </div>

            </Card.Body>
        </Card>
    )
}
