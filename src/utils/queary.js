import { api } from './api'

const getCategoryList = async () => {
    const res = await api.get('/category')
    return res.data
}

const getDepartmentList = async () => {
    const res = await api.get('/department')
    return res.data
}

export { getCategoryList, getDepartmentList }
