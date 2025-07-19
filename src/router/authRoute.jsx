import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useToken } from '../context/tokenContext.jsx'

/**
 * Props:
 * - children: ReactNode
 * - requireAuth: boolean (default: false) — user must be logged in
 * - allowRoles: array of roles to allow (e.g. ['admin', 'user'])
 * - redirectTo: string — where to redirect if access denied (default: '/login')
 * - redirectIfAuthenticated: boolean — redirect authenticated users if true (like GuestRoute)
 */
export default function AuthRoute({
    children,
    requireAuth = false,
    allowRoles = null,
    redirectTo = '/login',
    redirectIfAuthenticated = false,
}) {
    const { token } = useToken()
    const location = useLocation()

    // If route is for guests only, redirect logged-in users
    if (redirectIfAuthenticated && token) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    // If route requires authentication but user is not logged in
    if (requireAuth && !token) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />
    }

    // If allowRoles is specified, check user's role
    if (allowRoles && token) {
        if (!allowRoles.includes(token.role)) {
            // Redirect based on role - for example:
            // admins go to /dashboard, others go to home
            if (token.role === 'admin') {
                return <Navigate to="/dashboard" replace />
            }
            return <Navigate to="/" replace />
        }
    }

    // If requireAuth is false and user not logged in, allow (guest)
    return children
}
