import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useToken } from '../context/tokenContext.jsx'

export default function GuestRoute({ children }) {
    const { token } = useToken()
    const location = useLocation()

    if (token) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return <>{children}</>
}
