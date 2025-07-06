import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRouter({ children }) {
    const location = useLocation()
    return (
        <>
            <Navigate to={'/login'} state={{ from: location }} replace />
            {children}
        </>
    )
}
