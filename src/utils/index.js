export const objectToArray = (obj) => {
    let fieldsErrors = []

    Object.entries(obj).forEach((entry) => {
        const [key, value] = entry
        fieldsErrors.push({
            name: key,
            message: value,
        })
    })
    return fieldsErrors
}

export const imageToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
