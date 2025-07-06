import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../utils/api.js'
import { toast } from 'react-toastify'

const TokenContext = createContext({
    token: null,
    setToken: () => {},
    logout: () => {},
})

const TokenProvider = ({ children }) => {
    const [token, setTokenState] = useState(null)

    useEffect(() => {
        const validateStoredToken = async () => {
            const stored = localStorage.getItem('accessToken')

            try {
                const tokenObj = JSON.parse(stored)
                const accessToken = tokenObj?.tokenObj?.accessToken

                if (!accessToken) {
                    setTokenState(null)
                    return
                }

                api.defaults.headers.common['Authorization'] =
                    `Bearer ${accessToken}`

                await api.get('/check-token')

                setTokenState(tokenObj?.tokenObj)
            } catch {
                toast.warning('Your session is expired. Please re login')
                logout()
            }
        }

        void validateStoredToken()
    }, [])

    const setToken = (tokenObj) => {
        if (!tokenObj?.accessToken) return

        const accessToken = tokenObj?.accessToken

        localStorage.setItem('accessToken', JSON.stringify({ tokenObj }))
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        setTokenState(tokenObj)
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        delete api.defaults.headers.common['Authorization']
        setTokenState(null)
    }

    return (
        <TokenContext.Provider value={{ token, setToken, logout }}>
            {children}
        </TokenContext.Provider>
    )
}

export const useToken = () => useContext(TokenContext)

export default TokenProvider
