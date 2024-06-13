export const getCurrentYear = (createdAt: string) => {
    const date = new Date(createdAt)
    return date.getFullYear()
}
