import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../utils/api.js'
import DeleteConfirmDialog from '../../../components/UI/deleteConfirmDialog.jsx'
import { useToken } from '../../../context/tokenContext.jsx'
import useDebounce from '../../../hooks/useDebounce.js'
import Search from '../../../components/UI/Search.jsx'
import Pagination from '../../../components/UI/Pagination.jsx' // Import Pagination

export default function AdminIssue() {
    const [issues, setIssues] = useState([])
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [issueToDelete, setIssueToDelete] = useState(null)
    const [loading, setLoading] = useState(false)
    const [statusUpdating, setStatusUpdating] = useState(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const debouncedSearch = useDebounce(search, 500)

    const { token } = useToken()
    const [tokenReady, setTokenReady] = useState(false)

    useEffect(() => {
        if (token) setTokenReady(true)
    }, [token])

    const loadIssues = useCallback(async () => {
        setLoading(true)
        try {
            const res = await api.get('/issue', {
                params: { search: debouncedSearch, page },
            })
            setIssues(res.data.results || [])
            setTotalPages(res.data.total_page || 1)
        } catch {
            toast.error('Failed to fetch issues')
        } finally {
            setLoading(false)
        }
    }, [debouncedSearch, page])

    useEffect(() => {
        if (tokenReady) {
            void loadIssues()
        }
    }, [tokenReady, loadIssues])

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/issue/${issueToDelete._id}`)
            toast.success(res.data.message)
            // Reload issues for current page after delete
            await loadIssues()
        } catch {
            toast.error('Failed to delete issue')
        } finally {
            setConfirmOpen(false)
        }
    }

    const handleStatusChange = async (id, newStatus) => {
        setStatusUpdating(id)
        try {
            const res = await api.patch(`/issue/${id}/status`, {
                status: newStatus,
            })
            toast.success(res.data.message)
            await loadIssues()
        } catch {
            toast.error('Failed to update status')
        } finally {
            setStatusUpdating(null)
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Book Issues</h1>
            </div>


           <div className={'flex justify-between items-center'}>
               <Search search={search} setSearch={setSearch} />
               <button
                   onClick={() => loadIssues()}
                   className="btn btn-sm btn-primary"
                   disabled={loading}
               >
                   Refresh Data
               </button>
           </div>

            {loading ? (
                <p>Loading issues...</p>
            ) : (
                <>
                    <table className="w-full table-auto border border-gray-300 text-black bg-white shadow">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Book</th>
                            <th className="border px-4 py-2">User</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Issue Date</th>
                            <th className="border px-4 py-2">Return Date</th>
                            <th className="border px-4 py-2 w-[100px]">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {issues.length > 0 ? (
                            issues.map((issue, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        {issue.book?.title || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {issue.user?.username || 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {issue.quantity || 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <select
                                            className="border rounded px-2 py-1 text-sm"
                                            value={issue.status}
                                            disabled={statusUpdating === issue._id}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    issue._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="returned">Returned</option>
                                        </select>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {new Date(issue.issue_date).toLocaleDateString()}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {issue.return_date
                                            ? new Date(issue.return_date).toLocaleDateString()
                                            : '-'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center gap-4 justify-center">
                                            <button
                                                className="text-sm px-3 py-1 bg-red-600 text-white rounded"
                                                onClick={() => {
                                                    setIssueToDelete(issue)
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
                                    colSpan="7"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No issues found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}

            <DeleteConfirmDialog
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this issue?"
            />
        </div>
    )
}
