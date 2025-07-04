import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRouter({ children }) {
    return (
        <>
            <Navigate
                to={'/login'}
                state={{ from: location }}
                replace
            ></Navigate>
            {children}
        </>
    )
}
