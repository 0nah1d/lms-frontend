import { toast } from 'react-toastify'

export const handleApiError = (
    error,
    fallbackMessage = 'Something went wrong'
) => {
    const msg =
        error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        fallbackMessage

    toast.error(msg)
}
