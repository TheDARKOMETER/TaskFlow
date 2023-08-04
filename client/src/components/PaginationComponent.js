import React, { useEffect, useReducer, useRef, useState } from 'react'

function paginationReducer(state, action) {
    switch (action.type) {
        case "SET_ITEMS_PER_PAGE":
            return { ...state, itemsPerPage: action.payload }
        case "UPDATE_PAGINATION":
            const { itemsPerPage, items } = action.payload
            const pageNumbers = Math.ceil(items.length / itemsPerPage)

            let pages = []
            let initialItems = [...items]
            for (let x = 0; x < pageNumbers; x++) {
                let items = []
                for (let y = 0; y < itemsPerPage; y++) {
                    if (initialItems.length > 0) {
                        items.push(initialItems.shift())
                    } else {
                        break
                    }
                }
                let pageObj = {
                    items: items
                }
                pages.push(pageObj)
            }
            return { ...state, pageNumbers, pages }
        default:
            return state
    }
}

export default function PaginationComponent(props) {
    const [items] = useState(props.items)
    const [paginationState, dispatch] = useReducer(paginationReducer, { itemsPerPage: 4 })
    const [currentPage, setCurrentPage] = useState(0)
    const quantityRef = useRef()
    const { itemsPerPage, pageNumbers, pages } = paginationState

    const pageLinks = () => {
        let pageLinks = []
        console.log(pageNumbers)
        for (let x = 0; x < pageNumbers; x++) {
            pageLinks.push(<a key={x} onClick={() => setCurrentPage(x)} style={
                {
                    marginLeft: '16px',
                    ...(currentPage === x ? { fontWeight: 'bold' } : { fontWeight: '400' })
                }
            }>{x + 1}</a>)
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

    useEffect(() => {
        dispatch({ type: 'UPDATE_PAGINATION', payload: { items, itemsPerPage } })
    }, [itemsPerPage, items])


    useEffect(() => {
        console.log(pages)
    }, [pages])

    const renderList = (page) => {
        try {
            return page.items.map((item, index) => {
                return (
                    <>
                        {item}
                    </>
                )
            })
        } catch {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <>
            {pages && renderList(pages[currentPage])}
            <div>
                {pageLinks()}
            </div>
            <label style={{ marginLeft: '16px', marginRight: '16px' }} htmlFor='quantity'>Items per page</label>
            <input type='number' min='1' max='10' defaultValue='4' ref={quantityRef} onChange={() => {
                dispatch({ type: "SET_ITEMS_PER_PAGE", payload: quantityRef.current.value, currentPage: currentPage })
            }
            } />
        </>
    )
}
