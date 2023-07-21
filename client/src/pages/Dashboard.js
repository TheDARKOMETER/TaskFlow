import React, { useEffect, useState } from 'react'
import PageDiv from '../components/PageDiv'
import { useAuth } from '../contexts/authContext'
import { Row, Col, Button, Form, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import RedirectHome from '../components/RedirectHome'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HttpService from '../services/http-service'

export default function Dashboard() {
    const http = new HttpService()

    const { currentUser, getUserToken } = useAuth()
    const [startDate, setStartDate] = useState(new Date())

    const loadData = async () => {
            const uid = await getUserToken()
            http.testTokenAuthorizaion(uid).then(data => {
                console.log(data)
            })
    }

    useEffect(() => {
        loadData()
    })

    return (

        <>
            {currentUser ? (<PageDiv isBackGroundWhite={true}>
                <Row>
                    <Col />
                    <Col md='5'>
                        <h1>Welcome, {currentUser.displayName}</h1>
                        <Card>
                            <Card.Body>
                                <Card.Title>Create a task</Card.Title>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Task Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter task name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Start Date</Form.Label>
                                        <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Due Date</Form.Label>
                                        <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                                    </Form.Group>
                                    <Button variant="dark" type="submit">
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
