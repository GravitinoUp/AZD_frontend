export const setCookieValue = (key: string, value: string, lifetime: string) =>
    (document.cookie = `${key}=${value}${lifetime !== '' ? `; Max-Age=${lifetime}` : ''}; Path=/`)
