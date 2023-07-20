import React from 'react'
import PageDiv from '../components/PageDiv'
import { useAuth } from '../contexts/authContext'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import RedirectHome from '../components/RedirectHome'

export default function Dashboard() {
    const { currentUser } = useAuth()

    return (

        <>
            {currentUser ? (<PageDiv isBackGroundWhite={true}>
                <Row>
                    <Col />
                    <Col md='8'>
                        <h1>Welcome, {currentUser.displayName}</h1>
                    </Col>
                    <Col />
                </Row>
            </PageDiv>) : (<RedirectHome />)}
        </>
    )
}
