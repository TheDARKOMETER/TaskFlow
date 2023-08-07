import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import PageDiv from '../components/PageDiv'
import { useAuth } from '../contexts/authContext'
import { Row, Col, Card, Alert, Button } from 'react-bootstrap'
import RedirectHome from '../components/RedirectHome'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
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
    }
}

export default function Dashboard() {



    //  STATES
    const { filter, currentPage, itemsPerPage } = usePage()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [uidToken, setUidToken] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()



    //  SERVICES
    const ns = useMemo(() => new NotificationService(), [])
    const ds = useMemo(() => new DataService(new HttpService(), filter, currentPage, itemsPerPage), [filter, currentPage, itemsPerPage])

    //  REDUCER
    const [dashboardState, dispatch] = useReducer(dashboardReducer, { missedTasks: 0, completedTasks: 0, allTasks: 0, dueTasks: 0 })
    const { allCount, missedCount, dueCount, completedCount } = dashboardState


    //  AUTH CONTEXT
    const { currentUser, getUserToken } = useAuth()

    //  FUNCTIONS
    // const loadData = useCallback(async () => {
    //     try {
    //         ds.getTasks(filter).then(data => {
    //             dispatch({ type: "SET_CLIENT_TASK", payload: data, ds, errorHandler: setError })
    //         }).catch((err) => {
    //             (err.code === "ERR_NETWORK") ? setError("Connection to server lost. Try again later") : navigate('/auth/unauthorized')
    //         })
    //     } catch (err) {
    //         setError("An error has occured")
    //     } finally {
    //         setLoading(false)
    //     }
    // }, [ds, navigate, filter])


    const addTask = (name, description, start, due) => {
        setError('')
        setMessage('')
        setLoading(true)
        ds.addTask(name, description, start, due, filter, currentPage, itemsPerPage)
            .then(() => {
                setLoading(false)
                setMessage(`Task "${name}" has been added successfully.`)
            }).catch((err) => {
                setError(`An error has occcured ${err}`)
            }).finally(() => {
                setLoading(false)
            })
    }

    const onTaskChanged = () => {
        ds.fetchStats().then(response => {
            console.log(response)
            dispatch({ type: "SET_TASK_STATS", payload: response })
        })
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

    // useEffect(() => {
    //     // Sets task when allTasks changes, thus updating the state and re-rendering the component
    //     if (uidToken) {
    //         loadData()
    //     }
    // }, [uidToken, loadData, allTasks])


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
                                    <AddTaskModal addTaskHandler={addTask} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col />
                    </Row>
                    {/* <Row className='pb-5'>
                            <Col className='text-center'>
                                <h1>Your tasks</h1>
                                <div>
                                    <Button style={{ ...btnLinkStyle, textDecoration: filter === 'all' ? 'underline' : 'none' }} variant='link' onClick={() => setFilter('all')}>All Tasks</Button>
                                    <Button style={{ ...btnLinkStyle, textDecoration: filter === 'due' ? 'underline' : 'none' }} variant='link' onClick={() => setFilter('due')}>Due Tasks</Button>
                                    <Button style={{ ...btnLinkStyle, textDecoration: filter === 'missed' ? 'underline' : 'none' }} variant='link' onClick={() => setFilter('missed')}>Missed Tasks</Button>
                                    <Button style={{ ...btnLinkStyle, textDecoration: filter === 'completed' ? 'underline' : 'none' }} variant='link' onClick={() => setFilter('completed')}>Completed Tasks</Button>
                                </div>
                            </Col>
                        </Row> */}
                    <Row className='d-flex justify-content-center'>
                        {!loading && <PaginationComponent errorHandler={setError} ns={ns} ds={ds} />}
                    </Row>
                </PageDiv>
            ) : (<RedirectHome />)}
        </>
    )
}
