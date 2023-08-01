import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import PageDiv from '../components/PageDiv'
import { useAuth } from '../contexts/authContext'
import { Row, Col, Card, Alert, Button } from 'react-bootstrap'
import RedirectHome from '../components/RedirectHome'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
import TaskItem from '../components/TaskItem'
import DataService from '../services/data-service'
import NotificationService, { NOTIF_TASK_CHANGED } from '../services/notification-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import AddTaskModal from '../modals/AddTaskModal'
import HttpService from '../services/http-service'

function dashboardReducer(state, action) {
    switch (action.type) {
        case "SET_TASK_STATS":
            const { tasks } = action.payload
            let missedTasks = []
            let completedTasks = []
            tasks.forEach(task => {
                task.missed && missedTasks.push(task)
                task.completed && completedTasks.push(task)
            });
            return { ...state, missedTasks, completedTasks }
        default:
            return state
    }
}

export default function Dashboard() {

    //  STATES
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [uidToken, setUidToken] = useState()
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState()
    const navigate = useNavigate()

    //  REDUCER
    const [dashboardState, dispatch] = useReducer(dashboardReducer, { missedTasks: 0, completedTasks: 0 })
    const { missedTasks, completedTasks } = dashboardState


    //  SERVICES
    const ns = useMemo(() => new NotificationService(), [])
    const ds = useMemo(() => new DataService(new HttpService()), [])

    //  AUTH CONTEXT
    const { currentUser, getUserToken } = useAuth()



    //  FUNCTIONS
    const loadData = useCallback(async () => {
        try {
            ds.getTasks().then(data => {
                setTasks(data)
            }).catch((err) => {
                (err.code === "ERR_NETWORK") ? setError("Connection to server lost. Try again later") : navigate('/auth/unauthorized')
            })
        } catch (err) {
            setError("An error has occured")
        } finally {
            setLoading(false)
        }
    }, [ds, navigate])

    const renderTasks = () => {
        return tasks.map((task) => {
            return (
                <Col sm='4' className='mt-2 mb-2' key={task._id}>
                    <TaskItem task={task} />
                </Col>
            )
        });
    };


    const addTask = (name, description, start, due) => {
        setError('')
        setMessage('')
        ds.addTask(name, description, start, due)
            .then(response => {
                console.log(response)
                setMessage(`Task "${name}" has been added successfully.`)
            }).catch((err) => {
                setError(`An error has occcured ${err}`)
            })
    }

    const onTaskChanged = (newTasks) => {
        setTasks(newTasks)
    }

    const btnLinkStyle = {
        fontSize: '1em',
        color: 'black',
        textDecoration: 'none'
    }


    /* You dont really need to get the token here anymore
    as I already have a hook to get the current user token,
    but I'll just leave it here because I struggled just to
    do this. You may also use this as a reviewer on the use
    of async functions */


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
        ns.addObserver(NOTIF_TASK_CHANGED, onTaskChanged)
    }, [currentUser, getUserToken, ns])


    useEffect(() => {
        if (uidToken) {
            ds.setHttpAuth(uidToken)
            loadData()
        }
    }, [uidToken, loadData, ds])

    useEffect(() => {
        tasks && dispatch({ type: 'SET_TASK_STATS', payload: { tasks } })
    }, [tasks])

    return (
        <>
            {currentUser ? (
                <PageDiv isBackGroundWhite={true}>
                    <Row className='pb-5'>
                        <Col />
                        <Col md='5'>
                            <h1>Welcome, {currentUser.displayName ?? currentUser.email}</h1>
                            <Card>
                                <Card.Body>
                                    {loading && <Alert variant='info'>{<FontAwesomeIcon style={{ marginRight: '1.2rem' }} icon={faSpinner} spin />}Loading tasks</Alert>}
                                    {message && <Alert variant='success'>{message}</Alert>}
                                    {error && <Alert variant='danger'>{error}</Alert>}
                                    <Card.Title>Your Stats</Card.Title>
                                    <Card.Text>You have {tasks.length} task(s) due</Card.Text>
                                    <Card.Text>Missed Tasks: {missedTasks.length}</Card.Text>
                                    <Card.Text>Completed Tasks: {completedTasks.length}</Card.Text>
                                    <AddTaskModal addTaskHandler={addTask} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col />
                    </Row>
                    <Row className='pb-5'>
                        <Col className='text-center'>
                            <h1>Your tasks</h1>
                            <div>
                                <Button style={btnLinkStyle} variant='link' onClick={() => setFilter('all')}>All Tasks</Button>
                                <Button style={btnLinkStyle} variant='link' onClick={() => setFilter('due')}>Due Tasks</Button>
                                <Button style={btnLinkStyle} variant='link' onClick={() => setFilter('missed')}>Missed Tasks</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        {renderTasks()}
                    </Row>
                </PageDiv>
            ) : (<RedirectHome />)}
        </>
    )
}
