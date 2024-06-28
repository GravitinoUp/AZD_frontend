import { useTranslation } from 'react-i18next'
import { HandbookItem } from './components/handbook-item'

const handbookList = [
    {
        title: 'КБК',
        href: '/',
    },
    {
        title: 'ОКПД2',
        href: '/',
    },
    {
        title: 'КТРУ',
        href: '/',
    },
    {
        title: 'Нормирование',
        href: '/',
    },
    {
        title: 'Целевая статья',
        href: '/',
    },
]

export const Handbook = () => {
    const { t } = useTranslation()

    return (
        <div className="mx-auto flex w-[95%] flex-col items-center">
            <h1 className="mb-[160px] mt-20 text-3xl font-bold">{t('handbook')}</h1>
            <div className="flex max-w-[940px] flex-wrap justify-center gap-5">
                {handbookList.map((value, index) => (
                    <HandbookItem key={index} value={value} />
                ))}
            </div>
        </div>
    )
}
