import React, { useState, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker';

export default function AddTaskModal({ addTaskHandler }) {
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date())
    const [dueDate, setDueDate] = useState(new Date())
    const taskNameRef = useRef()
    const descriptionRef = useRef()

    const handleClose = (e) => {
        (e === 'closeAddTask') && addTaskHandler(taskNameRef.current.value, descriptionRef.current.value, startDate, dueDate)
        setShow(false)
    }
    const handleShow = () => setShow(true)


    return (
        <>
            <Button variant='dark' onClick={handleShow} >
                Add a New Task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId='taskName'>
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control ref={taskNameRef} type="text" placeholder="Enter task name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='taskDescription'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control required ref={descriptionRef} as='textarea' rows={5} placeholder="Description" />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='taskStartDate'>
                            <Form.Label>Start Date</Form.Label>
                            <div><DatePicker selected={startDate} onChange={(date) => {
                                setStartDate(date);
                            }} /></div>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='taskDueDate'>
                            <Form.Label>Due Date</Form.Label>
                            <div><DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} /></div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => handleClose("closeDefault")}>
                        Close
                    </Button>
                    <Button variant='dark' onClick={() => handleClose("closeAddTask")}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
