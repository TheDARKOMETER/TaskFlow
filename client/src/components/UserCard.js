import React from 'react'
import { useAuth } from '../contexts/authContext'
import { Card } from 'react-bootstrap'

export default function UserCard() {
    const { currentUser } = useAuth()
    return (
        <>
            <Card className='h-100' style={{ display: 'flex', maxWidth: '800px', maxHeight: '700px', minWidth: '250px' }}>
                <Card.Body>
                    <Card.Title className='text-center'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}</Card.Title>
                </Card.Body>
            </Card>
        </>
    )
}
