import React from 'react'
import { Card } from 'react-bootstrap'

export default function TaskItem(props) {
    return (
        <Card>
            <Card.Header as="h5">Featured</Card.Header>
            <Card.Body>
                <Card.Title>{props.task.title}</Card.Title>
                <Card.Subtitle style={{ fontSize: '0.6rem' }}>ID: {props.task._id}</Card.Subtitle>

                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                    {props.task.description}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Text>Start Date: {props.task.startDate}</Card.Text>
                <Card.Text>Due Date: {props.task.dueDate}</Card.Text>
                <Card.Text>Completed: {props.task.completed}</Card.Text>
            </Card.Body>
        </Card >
    )
}
