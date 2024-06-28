import { useTranslation } from 'react-i18next'
import { HandbookItem } from './components/handbook-item'
import { KBK, KOSGU, KTRU, OKEI, OKPD } from '@/shared/router/routes'
import i18next from 'i18next'

const handbookList = [
    {
        title: i18next.t('kbk'),
        href: KBK,
    },
    {
        title: i18next.t('okpd'),
        href: OKPD,
    },
    {
        title: i18next.t('ktru'),
        href: KTRU,
    },
    {
        title: i18next.t('okei'),
        href: OKEI,
    },
    {
        title: i18next.t('kosgu'),
        href: KOSGU,
    },
]

export const Handbook = () => {
    const { t } = useTranslation()

    return (
        <div className="mx-auto flex w-[95%] flex-col items-center">
            <h1 className="mb-[160px] mt-20 text-3xl font-bold">{t('handbook')}</h1>
            <div className="flex max-w-[940px] flex-wrap gap-5">
                {handbookList.map((value, index) => (
                    <HandbookItem key={index} value={value} />
                ))}
            </div>
        </div>
    )
}
