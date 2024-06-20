export const removeCookieValue = (key: string) => {
    document.cookie = `${key}=; Max-Age=-1; Path=/`
}
