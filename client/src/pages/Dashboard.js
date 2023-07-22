import React, { useEffect, useRef, useState } from 'react'
import PageDiv from '../components/PageDiv'
import { useAuth } from '../contexts/authContext'
import { Row, Col, Button, Form, Card, Alert } from 'react-bootstrap'
import RedirectHome from '../components/RedirectHome'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HttpService from '../services/http-service'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const http = new HttpService()
    const taskNameRef = useRef()
    const descriptionRef = useRef()
    const navigate = useNavigate()

    const { currentUser, getUserToken } = useAuth()
    const [startDate, setStartDate] = useState(new Date())
    const [dueDate, setDueDate] = useState(new Date())
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [uidToken, setUidToken] = useState()

    const loadData = async () => {
        // const uidToken = await getUserToken(currentUser)
        http.loadUserDashboard(uidToken).then(data => {
            console.log(data)
        }).catch((err) => {
            (err.code === "ERR_NETWORK") ? setError("Connection to server lost. Try again later") : navigate('/auth/unauthorized')
        })
    }

    const addTask = () => {
        setError('')
        setMessage('')
        http.addTask(uidToken, taskNameRef.current.value, descriptionRef.current.value, startDate, dueDate, currentUser.uid)
            .then(response => {
                console.log(response)
                setMessage(`Task "${response.description}" has been added successfully.`)
            }).catch(() => {
                setError("An error has occcured")
            })
    }

    useEffect(() => {
        const getUidToken = async () => {
            try {
                const uidToken = await getUserToken(currentUser)
                return uidToken
            } catch {
                setError("An error has occured")
            }
        }
        getUidToken().then(token => {
            setUidToken(token)
        }).catch(err => {
            console.log(err)
        })

    }, [])


    useEffect(() => {
        if (uidToken) {
            loadData()
        }
    }, [uidToken])



    return (

        <>
            {currentUser ? (<PageDiv isBackGroundWhite={true}>
                <Row>
                    <Col />
                    <Col md='5'>
                        <h1>Welcome, {currentUser.displayName ?? currentUser.email}</h1>
                        <Card>
                            <Card.Body>
                                {message && <Alert variant='success'>{message}</Alert>}
                                {error && <Alert variant='danger'>{error}</Alert>}
                                <Card.Title>Create a task</Card.Title>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Task Name</Form.Label>
                                        <Form.Control ref={taskNameRef} type="text" placeholder="Enter task name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control ref={descriptionRef} type="text" placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Start Date</Form.Label>
                                        <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Due Date</Form.Label>
                                        <div><DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} /></div>
                                    </Form.Group>
                                    <Button onClick={addTask} variant="dark">
                                        Create Task
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col />
                </Row>
            </PageDiv>) : (<RedirectHome />)}
        </>
    )
}
