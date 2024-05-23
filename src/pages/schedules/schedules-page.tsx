import { SchedulesTabs } from '@/modules/schedules'
import { useTranslation } from 'react-i18next'

export const SchedulesPage = () => {
    const { t } = useTranslation()

    return (
        <>
            <div className="h-[70px] border-b border-b-[#ECECEC]" />
            <h1 className="page-title mt-8">{t('schedules')}</h1>
            <SchedulesTabs />
        </>
    )
}
