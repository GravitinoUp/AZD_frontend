export const formatInitials = (lastName: string, firstName: string, patronymic?: string | null) => {
    const str = `${lastName} ${firstName}${patronymic && patronymic !== null ? ` ${patronymic}` : ''}`

    return str
        .split(/\s+/)
        .map((w, i) => (i && w ? w.substring(0, 1).toUpperCase() + '.' : w))
        .join(' ')
}
