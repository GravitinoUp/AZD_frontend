export const getCookieValue = (key: string) =>
    document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        ?.split('=')[1]
