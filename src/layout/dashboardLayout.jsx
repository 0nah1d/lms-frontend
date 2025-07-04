import React from 'react'
import {FaAddressBook, FaBook, FaHome, FaUsers} from 'react-icons/fa'
import {NavLink, Outlet} from 'react-router-dom'

export default function DashboardLayout() {
    return (
        <div className="flex gap-10">
            <div className="w-[280px] bg-gray-100 pt-10 min-h-screen px-10">
                <h1 className="text-3xl font-semibold mb-8 text-black">
                    Library <br/> Management
                </h1>

                <div className="space-y-2 list-none font-semibold text-black">
                    <li className="flex items-center gap-2">
                        <FaHome></FaHome>
                        <NavLink to={'/'}>Admin Home</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaAddressBook/>
                        <NavLink to={'/dashboard/add-books'}>Add Book</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaBook></FaBook>
                        <NavLink to={''}>Manage Book</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaUsers></FaUsers>
                        <NavLink to={'/dashboard/all-users'}>All Users</NavLink>
                    </li>
                </div>
            </div>

            <div className="w-full pr-10">
                <Outlet/>
            </div>
        </div>
    )
}
