import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../utils/api.js'
import DepartmentFormModal from './elements/departmentFormModal.jsx'
import DeleteConfirmDialog from '../../../components/UI/deleteConfirmDialog.jsx'
import { getDepartments } from '../../../utils/queary.js'

export default function AdminDepartment() {
    const [departments, setDepartments] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectDept, setSelectDept] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deptToDelete, setDeptToDelete] = useState(null)

    const loadDepartments = async () => {
        try {
            const data = await getDepartments()
            setDepartments(data)
        } catch {
            toast.error('Failed to fetch departments')
        }
    }

    useEffect(() => {
        void loadDepartments()
    }, [])

    const handleAddClick = () => {
        setSelectDept(null)
        setModalOpen(true)
    }

    const handleEdit = (department) => {
        setSelectDept(department)
        setModalOpen(true)
    }

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/department/${deptToDelete._id}`)
            toast.success(res.data.message)
            await loadDepartments()
        } catch {
            toast.error('Failed to delete')
        } finally {
            setConfirmOpen(false)
        }
    }

    const handleSubmitBook = async (payload) => {
        try {
            if (selectDept) {
                const res = await api.patch(
                    `/department/${selectDept._id}`,
                    payload
                )
                toast.success(res.data.message)
            } else {
                const res = await api.post('/department', payload)
                toast.success(res.data.message)
            }
            await loadDepartments()
        } catch {
            toast.error('Failed to save department')
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Departments</h1>
                <button
                    onClick={handleAddClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Department
                </button>
            </div>

            <table className="w-full table-auto border border-gray-300 text-black bg-white shadow">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2 w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments?.length > 0 ? (
                        departments.map((department, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">
                                    {department.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {department.description}
                                </td>
                                <td className="border px-4 py-2">
                                    <div className="flex items-center gap-4 justify-center">
                                        <button
                                            className="text-sm px-3 py-1 bg-yellow-500 text-white rounded"
                                            onClick={() =>
                                                handleEdit(department)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-sm px-3 py-1 bg-red-600 text-white rounded"
                                            onClick={() => {
                                                setDeptToDelete(department)
                                                setConfirmOpen(true)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                className="text-center py-6 text-gray-500"
                            >
                                No departments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DepartmentFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                initialData={selectDept}
                onSubmitDept={handleSubmitBook}
            />

            <DeleteConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this department?"
            />
        </div>
    )
}
