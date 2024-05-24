import ApprovalSheetIcon from '@/assets/icons/tabs/approval-sheet.svg'
import EisIcon from '@/assets/icons/tabs/EIS-public.svg'
import SchedulesIcon from '@/assets/icons/tabs/schedules.svg'
import SummaryScheduleIcon from '@/assets/icons/tabs/summary-schedule.svg'
import { AllSchedulesTab } from '@/modules/schedules/all-schedules-tab/all-schedules-tab.tsx'
import i18next from '@/shared/i18n/i18n.ts'
import { cn } from '@/shared/lib/cn.ts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs.tsx'

const tabsData = [
    {
        value: 'all-schedules',
        icon: <SchedulesIcon />,
        label: i18next.t('all-schedules'),
        content: <AllSchedulesTab />,
    },
    {
        value: 'summary-schedule',
        icon: <SummaryScheduleIcon />,
        label: i18next.t('summary-schedule'),
        content: 'Сводный план-график',
    },
    {
        value: 'EIS',
        icon: <EisIcon />,
        label: i18next.t('publication-in-EIS'),
        content: 'ЕИС',
    },
    {
        value: 'approval-sheet',
        icon: <ApprovalSheetIcon />,
        label: i18next.t('approval-sheet'),
        content: 'Лист согласования',
    },
]

export const SchedulesTabs = () => (
    <Tabs defaultValue={tabsData[0].value} className="mt-7">
        <div className="border-b-2 border-b-[#E6E8E7] pb-[3px]">
            <TabsList className="gap-5">
                {tabsData.map(({ value, icon, label }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className={value === 'all-schedules' ? 'schedules-tab-trigger' : ''}
                    >
                        <span className={cn('mr-1.5')}>{icon}</span>
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </div>
        {tabsData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-28">
                {tab.content}
            </TabsContent>
        ))}
    </Tabs>
)
