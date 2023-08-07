import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import PageDiv from '../components/PageDiv'
import { useAuth } from '../contexts/authContext'
import { Row, Col, Card, Alert } from 'react-bootstrap'
import RedirectHome from '../components/RedirectHome'
import "react-datepicker/dist/react-datepicker.css";
import DataService from '../services/data-service'
import NotificationService, { NOTIF_TASK_CHANGED } from '../services/notification-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import AddTaskModal from '../modals/AddTaskModal'
import HttpService from '../services/http-service'
import PaginationComponent from '../components/PaginationComponent'
import { usePage } from '../contexts/PaginatorContext'


function dashboardReducer(state, action) {
    switch (action.type) {
        case "SET_TASK_STATS":
            const { allCount, missedCount, dueCount, completedCount } = action.payload
            return { ...state, allCount, missedCount, dueCount, completedCount }
        default:
            return state
    }
}

export default function Dashboard() {

    //  STATES
    const { filter, currentPage, itemsPerPage } = usePage()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [uidToken, setUidToken] = useState()
    const [loading, setLoading] = useState(true)

    //  SERVICES
    const ns = useMemo(() => new NotificationService(), [])
    const ds = useMemo(() => new DataService(new HttpService(), filter, currentPage, itemsPerPage), [filter, currentPage, itemsPerPage])

    //  REDUCER
    const [dashboardState, dispatch] = useReducer(dashboardReducer, { missedTasks: 0, completedTasks: 0, allTasks: 0, dueTasks: 0 })
    const { allCount, missedCount, dueCount, completedCount } = dashboardState


    //  AUTH CONTEXT
    const { currentUser, getUserToken } = useAuth()

    const addTask = (name, description, start, due) => {
        setError('')
        setMessage('')
        setLoading(true)
        console.log(filter)
        ds.addTask(name, description, start, due, filter, currentPage, itemsPerPage)
            .then(() => {
                setLoading(false)
                setMessage(`Task "${name}" has been added successfully.`)
            }).catch(() => {
                setError(`An error has occcured while adding a task`)
            }).finally(() => {
                setLoading(false)
            })
    }

    const handleTaskChanged = useCallback(() => {
        ds.fetchStats().then(response => {
            console.log(response)
            dispatch({ type: "SET_TASK_STATS", payload: response })
        }).catch(() => {
            setError("An error occured when setting stats")
        })
    }, [ds])

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
                setError("An error has occured while fetching your authentication token")
            }
        }
        getUidToken().then(token => {
            setUidToken(token)
        }).catch(err => {
            setError("An error occured while fetching your token")
        })
        ns.addObserver(NOTIF_TASK_CHANGED, handleTaskChanged)
    }, [currentUser, getUserToken, ns, handleTaskChanged])


    useEffect(() => {
        setLoading(true)
        if (uidToken) {
            ds.setHttpAuth(uidToken)
            ds.fetchStats().then(response => {
                console.log(response)
                dispatch({ type: "SET_TASK_STATS", payload: response })
            })
            setLoading(false)
        }
    }, [uidToken, ds])

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
                                    <Card.Text>You have {dueCount} task(s) due</Card.Text>
                                    <Card.Text>Missed Tasks: {missedCount}</Card.Text>
                                    <Card.Text>Completed Tasks: {completedCount}</Card.Text>
                                    <Card.Text>Total Tasks: {allCount}</Card.Text>
                                    <AddTaskModal addTaskHandler={addTask} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col />
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        {!loading && <PaginationComponent errorHandler={setError} ns={ns} ds={ds} />}
                    </Row>
                </PageDiv>
            ) : (<RedirectHome />)}
        </>
    )
}
