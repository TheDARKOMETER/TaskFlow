import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { NOTIF_TASK_CHANGED } from '../services/notification-service';
import TaskItem from './TaskItem'
import { Col, Row, Button } from 'react-bootstrap'
import { usePage } from '../contexts/PaginatorContext'
function paginationReducer(state, action) {
    switch (action.type) {
        case "UPDATE_PAGINATION":
            const { items, totalPages, errorHandler, filter } = action.payload
            console.log(items)
            const pageNumbers = totalPages
            let taskItemComponents = []
            try {
                taskItemComponents = items.map(task => <TaskItem errorHandler={errorHandler} ns={action.ns} ds={action.ds} task={task} key={task._id} />);
            } catch (err) {
                console.log("Mapping error")
                errorHandler("An error occured")
                return
            }
            return { ...state, pageNumbers, taskItemComponents, filter }
        default:
            return state
    }
}

export default function PaginationComponent(props) {

    const { filter, setFilter, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage } = usePage()

    const [paginationState, dispatch] = useReducer(paginationReducer, { itemsPerPage: 6 })
    const quantityRef = useRef()
    const ds = useMemo(() => props.ds, [props.ds])
    const ns = useMemo(() => props.ns, [props.ns])
    const { pageNumbers, taskItemComponents } = paginationState

    const btnLinkStyle = {
        fontSize: '1em',
        color: 'black',
        textDecoration: 'none'
    }

    const pageLinks = () => {
        let pageLinks = []
        for (let x = 0; x < pageNumbers; x++) {
            pageLinks.push(<Button variant='link' key={x} onClick={() => setCurrentPage(x)} style={
                {
                    ...btnLinkStyle,
                    marginLeft: '16px',
                    ...(currentPage === x ? { fontWeight: 'bold', color: 'white', backgroundColor: 'black', borderRadius: '70%' } : { fontWeight: '400' })
                }
            }>{x + 1}</Button>)
        }
        if (currentPage + 1 > 5 && pageNumbers > 9) {
            let pagesLeft = pageNumbers - (currentPage + 1)
            if (pagesLeft > 4) {
                // The argument for start in slice is inclusive, however the argument for end is not inclusive (exclusive), hence why it is 5 as opposed to 4
                pageLinks = pageLinks.slice(currentPage - 4, currentPage + 5)
            } else {
                pageLinks = pageLinks.slice(pageNumbers - 9)
            }
        }
        if (pageNumbers > 9) {
            pageLinks = pageLinks.slice(0, 9)
        }
        return pageLinks
    }

    const onTaskChanged = useCallback(() => {
        ds.getTasks(filter, currentPage + 1, itemsPerPage).then(({ tasks, totalPages }) => {
            if (currentPage + 1 > totalPages) {
                setCurrentPage(pageNumbers - 1)
            }
            dispatch({ type: 'UPDATE_PAGINATION', ns, ds, payload: { items: tasks, totalPages, errorHandler: props.errorHandler, filter } })
        }).catch((err) => {
            props.errorHandler("An error occured when getting tasks, try reloading")
        })
    }, [ds, filter, currentPage, itemsPerPage, pageNumbers, ns, props, setCurrentPage])

    useEffect(() => {
        onTaskChanged()
        ns.addObserver(NOTIF_TASK_CHANGED, onTaskChanged)
        return () => {
            ns.removeObserver(NOTIF_TASK_CHANGED, onTaskChanged)
        }
    }, [itemsPerPage, filter, currentPage, ns, onTaskChanged])

    const renderList = () => {
        try {
            if (taskItemComponents.length > 0) {
                return taskItemComponents.map((item, index) => {
                    return (
                        <Col sm='4' className='mt-2 mb-2' key={index}>
                            {item}
                        </Col>
                    )
                })
            } else {
                return (
                    <h1 className='text-center'>
                        (No tasks)
                    </h1>
                )
            }
        } catch (err) {
            props.errorHandler(err)
            return null
        }
    }

    return (
        <>
            <Row className='pb-5'>
                <Col className='text-center'>
                    <h1>Your tasks</h1>
                    <div>
                        <Button style={{ ...btnLinkStyle, textDecoration: filter === 'all' ? 'underline' : 'none' }} variant='link' onClick={() => setFilter('all')}>All Tasks</Button>
                        <Button style={{ ...btnLinkStyle, textDecoration: filter === 'due' ? 'underline' : 'none' }} variant='link' onClick={() => setFilter('due')}>Due Tasks</Button>
                        <Button style={{ ...btnLinkStyle, textDecoration: filter === 'missed' ? 'underline' : 'none' }} variant='link' onClick={() => setFilter('missed')}>Missed Tasks</Button>
                        <Button style={{ ...btnLinkStyle, textDecoration: filter === 'completed' ? 'underline' : 'none' }} variant='link' onClick={() => setFilter('completed')}>Completed Tasks</Button>
                    </div>
                </Col>
            </Row>
            {Array.isArray(taskItemComponents) && renderList()}
            <div style={{ textAlign: 'center' }} className='pt-4 pb-4'>
                {Array.isArray(taskItemComponents) && pageLinks()}
            </div >
            <label style={{ marginLeft: '16px', marginRight: '16px' }} htmlFor='quantity'>Items per page</label>
            <input type='number' min='1' max='10' defaultValue={itemsPerPage} ref={quantityRef} onChange={() => {
                setItemsPerPage(quantityRef.current.value)
            }
            } />
        </>
    )
}
