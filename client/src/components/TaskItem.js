import React, { useEffect, useMemo } from 'react'
import { Card, Button } from 'react-bootstrap'
import DataService from '../services/data-service'
import { useAuth } from '../contexts/authContext'
import HttpService from '../services/http-service'

export default function TaskItem(props) {

    const startDate = new Date(props.task.startDate)
    const dueDate = new Date(props.task.dueDate)
    const { userToken } = useAuth()
    const ds = useMemo(() => new DataService(new HttpService()), [])

    useEffect(() => {
        userToken && ds.setHttpAuth(userToken)
    }, [userToken, ds])

    const markComplete = () => {
        ds.updateTask({ ...props.task, completed: true })
    }

    const deleteTask = () => {
        ds.deleteTask(props.task._id)
    }

    return (
        <Card style={{ minHeight: '500px' }}>
            <Card.Header as="h5"><div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    color: props.task.completed ? 'green' : props.task.missed ? 'red' : 'goldenrod'
                }}>{props.task.completed
                    ? "(Completed)"
                    : (props.task.missed
                        ? "(Missed)"
                        : "(Due)")}</div>
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
                <Button variant='dark' disabled={props.task.missed || props.task.completed} onClick={markComplete}>Mark as Complete</Button>
                <Button variant='danger' onClick={deleteTask}>Delete Task</Button>
            </Card.Body>
        </Card >
    )
}
