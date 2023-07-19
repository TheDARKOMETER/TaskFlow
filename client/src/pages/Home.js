import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SignUp from '../components/SignUp'
import PageDiv from '../components/PageDiv'
import LogoLight from '../assets/logo-simplified-light.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    return (
        <>
            <PageDiv isBackGroundWhite={true}>
                <Row>
                    <Col>
                    </Col>
                    <Col md='7'>
                        <Row>
                            <Col lg='8' md='12'>
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
                                <Link to='/signup' className='w-50 btn btn-dark'>Get Started</Link>


                            </Col>
                            <Col lg='4' md='12' sm='12'>
                                <SignUp />
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row >
            </PageDiv >
            <PageDiv isBackGroundWhite={false}>
                <Row>
                    <Col />
                    <Col md='7'>
                        <div className='text-center'>
                            <Image src={LogoLight} fluid />
                            <h1>
                                {/* <FontAwesomeIcon icon={faCoffee} /> */}
                                Stay Organized and Efficient with TaskFlow
                            </h1>
                            <p>
                                TaskFlow is your go-to task management platform that simplifies
                                your daily workflow. With intuitive features, seamless collaboration,
                                and customizable task tracking, TaskFlow helps you stay organized, prioritize tasks,
                                and accomplish more. Streamline your work, eliminate distractions, and achieve your goals with TaskFlow.
                            </p>
                        </div>

                    </Col>
                    <Col />
                </Row>
            </PageDiv>
        </>
    )
}
