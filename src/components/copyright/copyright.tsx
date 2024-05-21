import { useTranslation } from 'react-i18next'

export const Copyright = () => {
    const { t } = useTranslation()

    return <p className="text-sm text-[#D2CFCF]">{t('copyright')}</p>
}
