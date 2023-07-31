import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PageDiv from '../components/PageDiv'
import { useAuth } from '../contexts/authContext'
import { Row, Col, Card, Alert } from 'react-bootstrap'
import RedirectHome from '../components/RedirectHome'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
import TaskItem from '../components/TaskItem'
import DataService from '../services/data-service'
import NotificationService, { NOTIF_TASK_CHANGED } from '../services/notification-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import AddTaskModal from '../modals/AddTaskModal'

export default function Dashboard() {

    //  STATES

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [uidToken, setUidToken] = useState()
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    //  SERVICES
    const ns = useMemo(() => new NotificationService(), [])
    const ds = useMemo(() => new DataService(), [])

    //  REFS
    // const taskNameRef = useRef()
    // const descriptionRef = useRef()  

    //  AUTH CONTEXT
    const { currentUser, getUserToken } = useAuth()

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
                <Col sm='4' key={task._id}>
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
                                    <AddTaskModal addTaskHandler={addTask} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col />
                    </Row>
                    <Row className='pb-5'>
                        <Col className='text-center'>
                            <h1>Your tasks</h1>
                        </Col>
                    </Row>
                    <Row>
                        {renderTasks()}
                    </Row>
                </PageDiv>
            ) : (<RedirectHome />)}
        </>
    )
}
