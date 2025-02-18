import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import GSignIn from '../assets/1x/btn_google_signin_dark_normal_web.png'
import { useAuth } from '../contexts/authContext'
import { useNavigate, Link } from 'react-router-dom'

export default function UpdateUserInfo() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { updateDisplayName, currentUser, updatePasswordWrapper } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [info, setInfo] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setInfo('')
        setMessage('')
        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []

        if (usernameRef.current.value && usernameRef.current.value !== currentUser.displayName) {
            console.log("Username Update Executing")
            promises.push(updateDisplayName(usernameRef.current.value))
        }
        if (passwordRef.current.value) {
            console.log("Password Update Executing")
            promises.push(updatePasswordWrapper(passwordRef.current.value))
        }

        if (promises.length > 0) {
            Promise.all(promises).then(() => {
                console.log(currentUser.displayName)
                setMessage('Update successful')
            }).catch((err) => {
                setError(err)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setInfo('You must provide an input to update info')
        }


    }

    return (
        <>
            <Card className='h-100' style={{ display: 'flex', maxWidth: '800px', maxHeight: '700px', minWidth: '250px' }}>
                <Card.Body>
                    <Card.Title className='text-center'>Update Info</Card.Title>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {info && <Alert variant='info'>{info}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder='Leave blank to keep username unchanged' ref={usernameRef} type="text" />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control placeholder='Leave blank to keep password unchanged' ref={passwordRef} type="password" />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control placeholder='Leave blank to keep password unchanged' ref={passwordConfirmRef} type="password" />
                        </Form.Group>
                        <Button disabled={loading} variant='dark' className='w-100 mt-3 mb-3' type='submit'>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
