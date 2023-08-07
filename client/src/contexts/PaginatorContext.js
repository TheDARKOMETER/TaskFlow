import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import NotificationService, { NOTIF_TASK_CHANGED } from '../services/notification-service';
import DataService from '../services/data-service';

const PaginatorContext = createContext();

// Custom hook for syntactic sugar so you can access the context values
export function usePage() {
    return useContext(PaginatorContext)
}

export default function PaginatorProvider({ children }) {
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const [filter, setFilter] = useState('all')
    const ns = new NotificationService()

    const updateStats = () => {
        
    }

    useEffect(() => {
        ns.addObserver(NOTIF_TASK_CHANGED, updateStats)
    }, [ns, NOTIF_TASK_CHANGED, updateStats])

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
