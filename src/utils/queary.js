import { api } from './api'

export const getDepartments = async () => {
    const res = await api.get('/department')
    return res.data || []
}

export const getBooks = async ({ page = 1, limit = 10, search = '', department = '' }) => {
    const query = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
        ...(department && { department }),
    })

    const res = await api.get(`/book?${query.toString()}`)
    return res.data
}
