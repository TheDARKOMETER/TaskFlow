import React from 'react'

export default function PageDiv({ children, isBackGroundWhite }) {
    const backgroundColor = isBackGroundWhite ? 'white' : 'black'
    const color = isBackGroundWhite ? 'black' : 'white'

    return (
        <div className='ps-3 pe-3 text-left pt-5 pb-5' style={{ fontSize: '1.22rem', backgroundColor, color }}>
            {children}
        </div>
    )
}
