import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useToken } from '../context/tokenContext.jsx'

export default function AdminRoute({ children }) {
    const { token } = useToken()
    const location = useLocation()

    const isAdmin = token?.role === 'admin'
    const isDashboardRoute = location.pathname.startsWith('/dashboard')

    if (isAdmin && !isDashboardRoute) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}
