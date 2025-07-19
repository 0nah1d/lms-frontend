import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layout/dashboardLayout.jsx'
import MainLayout from '../layout/mainLayout.jsx'
import AllUser from '../pages/admin/allUser.jsx'
import AdminBooks from '../pages/admin/book/adminBooks.jsx'
import Dashboard from '../pages/admin/dashboard.jsx'
import AdminDepartment from '../pages/admin/department/adminDepartment.jsx'
import AdminIssue from '../pages/admin/issue/adminIssue.jsx'
import Login from '../pages/auth/login.jsx'
import Registration from '../pages/auth/registration.jsx'
import About from '../pages/common/about.jsx'
import BookDetails from '../pages/common/bookDetails.jsx'
import Contact from '../pages/common/contact.jsx'
import Home from '../pages/common/home/home.jsx'
import Information from '../pages/common/information.jsx'
import Librarian from '../pages/common/librarian/librarian.jsx'
import Wishlist from '../pages/common/wishlist.jsx'
import Bba from '../pages/department/bba.jsx'
import Civil from '../pages/department/civil.jsx'
import Cse from '../pages/department/cse.jsx'
import Eee from '../pages/department/eee.jsx'
import English from '../pages/department/english.jsx'
import Islamic from '../pages/department/islamic.jsx'
import Law from '../pages/department/law.jsx'
import { getBookById } from '../utils/queary.js'
import AuthRoute from './authRoute.jsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/login',
                element: (
                    <AuthRoute redirectIfAuthenticated={true}>
                        <Login />
                    </AuthRoute>
                ),
            },
            {
                path: '/register',
                element: (
                    <AuthRoute redirectIfAuthenticated={true}>
                        <Registration />
                    </AuthRoute>
                ),
            },

            { path: '/', element: <Home /> },
            { path: '/cse', element: <Cse /> },
            { path: '/bba', element: <Bba /> },
            { path: '/civil', element: <Civil /> },
            { path: '/eee', element: <Eee /> },
            { path: '/english', element: <English /> },
            { path: '/islamic', element: <Islamic /> },
            { path: '/law', element: <Law /> },
            { path: '/about', element: <About /> },
            { path: '/information', element: <Information /> },
            { path: '/contact', element: <Contact /> },
            { path: '/librarian', element: <Librarian /> },

            {
                path: '/book/:id',
                element: (
                    <AuthRoute requireAuth={true} allowRoles={['student']}>
                        <BookDetails />
                    </AuthRoute>
                ),
                loader: async ({ params }) => getBookById(params.id),
            },
            {
                path: '/wishlist',
                element: (
                    <AuthRoute requireAuth={true} allowRoles={['student']}>
                        <Wishlist />
                    </AuthRoute>
                ),
            },
        ],
    },

    {
        path: '/dashboard',
        element: (
            <AuthRoute requireAuth={true} allowRoles={['admin']}>
                <DashboardLayout />
            </AuthRoute>
        ),
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/dashboard/all-users', element: <AllUser /> },
            { path: '/dashboard/books', element: <AdminBooks /> },
            { path: '/dashboard/department', element: <AdminDepartment /> },
            { path: '/dashboard/issue', element: <AdminIssue /> },
        ],
    },
])
