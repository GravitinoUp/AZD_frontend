import i18next from 'i18next'

export const placeholderQuery = { offset: { count: 10, page: 1 }, filter: {}, sorts: {} }

export const FILE_SIZE_UNITS = {
    BYTE: i18next.t('units.byte'),
    KB: i18next.t('units.kb'),
    MB: i18next.t('units.mb'),
    GB: i18next.t('units.gb'),
}
