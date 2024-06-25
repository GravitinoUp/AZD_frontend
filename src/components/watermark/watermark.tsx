import { useTranslation } from 'react-i18next'

export const Watermark = () => {
    const { t } = useTranslation()

    return <p className="p-4 text-[#DBDBDB]">{t('watermark')}</p>
}
