import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import TokenProvider from './context/tokenContext.jsx'
import './index.css'
import { router } from './router/router.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <TokenProvider>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </QueryClientProvider>
    </TokenProvider>
)
