import React from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'

export default function Home() {
    return (
        <>
            <div className='ps-3 pe-3 text-left pt-5' style={{ fontSize: '1.22rem' }}>
                <Row>
                    <Col>
                    </Col>
                    <Col md='7'>
                        <Row>
                            <Col md='7  '>
                                <h1 style={{ fontSize: '64px' }} className='mb-3'>Streamline Your Tasks and Boost Productivity with TaskFlow&nbsp;
                                    <span style={{
                                        background: 'linear-gradient(to top, rgba(9, 132, 227, 0.5) 80%, transparent 50%)',
                                        height: '70px',
                                        display: 'inline-block',
                                        fontWeight: '700'
                                    }}>FOR FREE!</span>
                                </h1>
                                <p>Are you tired of juggling multiple tasks, deadlines, and team collaborations?
                                    Say goodbye to productivity roadblocks and hello to TaskFlow – your ultimate
                                    task management solution. TaskFlow empowers individuals, teams, and businesses
                                    to stay organized, focused, and on top of their work.</p>

                            </Col>
                            <Col>
                                <Card className='h-100' style={{ display: 'flex', maxWidth:'800px' }}>
                                    <Card.Body>
                                        <Card.Title className='text-center'>Sign Up</Card.Title>
                                        <Form>
                                            <Form.Group id="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" required />
                                            </Form.Group>
                                            <Form.Group id="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" required />
                                            </Form.Group>
                                            <Form.Group id="password-confirm">
                                                <Form.Label>Password Confirmation</Form.Label>
                                                <Form.Control type="password" required />
                                            </Form.Group>
                                            <Button variant='dark' className='w-100 mt-3 mb-3' type='submit'>Sign Up</Button>
                                        </Form>
                                        <div className='w-100 text-center' style={{
                                            borderBottom: '1px solid #000',
                                            lineHeight: '0.1em',
                                            fontSize:'18px',
                                            margin: '10px 0 20px'
                                        }}><span style={{
                                            background:'#fff',
                                            padding:'0 5px'
                                        }}>or</span></div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row >
            </div >
        </>
    )
}
