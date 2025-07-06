import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useToken } from '../context/tokenContext.jsx'

export default function NonAdminRoute({ children }) {
    const { token } = useToken()
    const location = useLocation()

    if (token?.role === 'admin') {
        return <Navigate to="/dashboard" state={{ from: location }} replace />
    }

    return <>{children}</>
}
