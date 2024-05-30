// для форматирования ISO 8601 даты в привычный формат. 2024-01-11T10:36:59.321Z ---> 11.01.2024
export const formatIsoDate = (dateString: string) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
}
