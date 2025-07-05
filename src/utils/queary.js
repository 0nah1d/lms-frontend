import {api} from './api'

const getDepartmentList = async () => {
    const res = await api.get('/department')
    return res.data
}

export {getDepartmentList}
