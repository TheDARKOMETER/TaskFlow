import React, { createContext, useContext, useState } from 'react'
const PaginatorContext = createContext();

// Custom hook for syntactic sugar so you can access the context values
export function usePage() {
    return useContext(PaginatorContext)
}

export default function PaginatorProvider({ children }) {
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const [filter, setFilter] = useState('all')

    const value = {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        filter,
        setFilter,
    }

    return (
        <PaginatorContext.Provider value={value}>
            {children}
        </PaginatorContext.Provider>
    )
}
