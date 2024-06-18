import { FILE_SIZE_UNITS } from '../constants'

export const formatFileSize = (sizeInBytes?: number) => {
    if (!sizeInBytes) {
        return ''
    }

    let i = 0
    let formattedSize = sizeInBytes

    const byteUnits = Object.values(FILE_SIZE_UNITS)

    while (formattedSize > 1024 && i < 3) {
        formattedSize /= 1024
        i++
    }

    return `${formattedSize.toFixed(i !== 0 ? 2 : 0)} ${byteUnits[i]}`
}
