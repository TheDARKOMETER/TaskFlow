import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function TaskItem(props) {
    const startDate = new Date(props.task.startDate)
    const dueDate = new Date(props.task.dueDate)
    return (
        <Card style={{ minHeight: '500px' }}>
            <Card.Header as="h5"><div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div>Task</div>
                <div style={{ fontSize: '0.6rem' }}>ID: {props.task._id}</div>
            </div></Card.Header>
            <Card.Body>
                <Card.Title>{props.task.title}</Card.Title>
                <Card.Subtitle style={{ fontSize: '0.6rem' }}></Card.Subtitle>

                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                    {props.task.description}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Text>Start Date: {startDate.toLocaleDateString()}</Card.Text>
                <Card.Text>Due Date: {dueDate.toLocaleDateString()}</Card.Text>
                <Card.Text>Completed: <span style={{
                    ...(props.task.completed ? { color: 'green' } : { color: 'red' }),
                    fontWeight: 'bold'
                }}>{props.task.completed ? "Yes" : "No"}</span></Card.Text>
                <Card.Text>Missed: <span style={{
                    ...(props.task.missed ? { color: 'red' } : { color: 'green' }),
                    fontWeight: 'bold'
                }}>{props.task.missed ? "Yes" : "No"}</span></Card.Text>
                <Button variant='dark'>Mark as Complete</Button>
            </Card.Body>
        </Card >
    )
}
