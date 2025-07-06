import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/mainLayout.jsx'
import Home from '../pages/common/home/home.jsx'
import About from '../pages/common/about.jsx'
import Cse from '../pages/department/cse.jsx'
import Bba from '../pages/department/bba.jsx'
import Civil from '../pages/department/civil.jsx'
import Eee from '../pages/department/eee.jsx'
import English from '../pages/department/english.jsx'
import Islamic from '../pages/department/islamic.jsx'
import Law from '../pages/department/law.jsx'
import BookDetails from '../pages/common/bookDetails.jsx'
import Information from '../pages/common/information.jsx'
import Contact from '../pages/common/contact.jsx'
import Login from '../pages/auth/login.jsx'
import PrivateRouter from './privateRouter.jsx'
import DashboardLayout from '../layout/dashboardLayout.jsx'
import Dashboard from '../pages/admin/dashboard.jsx'
import AllUser from '../pages/admin/allUser.jsx'
import Librarian from '../pages/common/librarian/librarian.jsx'
import Registration from '../pages/auth/registration.jsx'
import AdminBooks from '../pages/admin/book/adminBooks.jsx'
import AdminDepartment from '../pages/admin/department/adminDepartment.jsx'
import { getBookById } from '../utils/queary.js'
import AdminIssue from '../pages/admin/issue/adminIssue.jsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Registration />,
            },
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/cse',
                element: <Cse />,
            },
            {
                path: '/bba',
                element: <Bba />,
            },
            {
                path: '/civil',
                element: <Civil />,
            },
            {
                path: '/eee',
                element: <Eee />,
            },
            {
                path: '/english',
                element: <English />,
            },
            {
                path: '/islamic',
                element: <Islamic />,
            },
            {
                path: '/law',
                element: <Law />,
            },
            {
                path: '/book/:id',
                element: <BookDetails />,
                loader: async ({ params }) => {
                    return await getBookById(params.id)
                },
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/information',
                element: <Information />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/librarian',
                element: <Librarian />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRouter>
                <DashboardLayout />
            </PrivateRouter>
        ),
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/dashboard/all-users',
                element: <AllUser />,
            },
            {
                path: '/dashboard/books',
                element: <AdminBooks />,
            },
            {
                path: '/dashboard/department',
                element: <AdminDepartment />,
            },
            {
                path: '/dashboard/issue',
                element: <AdminIssue />,
            },
        ],
    },
])
