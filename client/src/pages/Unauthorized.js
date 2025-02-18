import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { faSadCry } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Unauthorized() {

    return (
        <>
            <Row>
                <Col />
                <Col style={{ textAlign: 'center' }} md='8'>
                    <FontAwesomeIcon style={{fontSize:'76px'}} icon={faSadCry} />
                    <h1>Unauthorized Access</h1>
                </Col>
                <Col />
            </Row>
        </>
    )
}
