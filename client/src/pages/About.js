import React from 'react'
import PageDiv from '../components/PageDiv'
import { Row, Col } from 'react-bootstrap'


export default function About() {
  return (
    <>
      <PageDiv isBackGroundWhite={true}>
        <Row className='text-center'>
          <Col />
          <Col sm='9' style={{ lineHeight: '2' }}>
            <h1>About Us - TaskFlow</h1>
            <p>
              Welcome to TaskFlow, your
              trusted companion in task management
              and productivity enhancement. Our mission
              is to simplify your life by helping you
              organize your tasks, stay on top of your
              to-do lists, and achieve your goals efficiently.
            </p>
          </Col>
          <Col />
        </Row>
      </PageDiv>
      <PageDiv isBackGroundWhite={true}>
        <Row className='text-center'>
          <Col />
          <Col sm='9' style={{ lineHeight: '2' }}>
            <h1>What We Do</h1>
            <p>
              At TaskFlow, we provide a user-friendly and intuitive
              task management solution designed to meet the unique
              needs of individuals, teams, and businesses. Our
              platform offers a range of features to enhance your
              productivity:
            </p>
          </Col>
          <Col />
        </Row>
      </PageDiv>

    </>
  )
}
