import React from 'react'
import { FaUsers } from 'react-icons/fa'

export default function AllUser() {

    return (
        <div className="mt-10">
            <div className="flex gap-40 items-center">
                <h3 className="text-xl font-semibold">Total Users : 10</h3>
                <h1 className="text-3xl font-semibold">All Users</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*/!* row 1 *!/*/}
                        {/*{users.map((user, index) => (*/}
                        {/*    <tr key={user._id}>*/}
                        {/*        <th>{index + 1}</th>*/}
                        {/*        <td>{user.name}</td>*/}
                        {/*        <td>{user.email}</td>*/}
                        {/*        {user.role === 'admin' ? (*/}
                        {/*            <p>Admin</p>*/}
                        {/*        ) : (*/}
                        {/*            <td className="btn text-xl">*/}
                        {/*                <FaUsers />*/}
                        {/*            </td>*/}
                        {/*        )}*/}
                        {/*        <td>Delete</td>*/}
                        {/*    </tr>*/}
                        {/*))}*/}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
