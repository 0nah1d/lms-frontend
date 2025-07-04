import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/navbar.jsx'
import Footer from '../components/footer/footer.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function MainLayout() {
    return (
        <div className="roboto">
            <Navbar />
            <Outlet />
            <Footer />
            <ToastContainer />
        </div>
    )
}
