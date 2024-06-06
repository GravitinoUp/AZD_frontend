import ApprovalSheetIcon from '@/assets/icons/tabs/approval-sheet.svg'
import EisIcon from '@/assets/icons/tabs/EIS-public.svg'
import PlansIcon from '@/assets/icons/tabs/plans.svg'
import SummaryPlanIcon from '@/assets/icons/tabs/summary-plan.svg'
import { usePageTitle } from '@/shared/context/plans-page-title.tsx'
import i18next from '@/shared/i18n/i18n.ts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs.tsx'
import { Outlet } from 'react-router-dom'

export const PlansPage = () => {
    const { pageTitle } = usePageTitle()

    return (
        <>
            <div className="h-[70px] border-b border-b-[#ECECEC]" />
            {pageTitle && <h1 className="page-title mt-8">{pageTitle}</h1>}
            <Tabs defaultValue={tabsData[0].value} className="mt-7">
                <div className="border-b-2 border-b-[#E6E8E7] pb-[3px]">
                    <TabsList className="gap-5">
                        {tabsData.map(({ value, icon, label }) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className={value === 'all-plans' ? 'plans-tab-trigger' : ''}
                            >
                                <span className="mr-1.5">{icon}</span>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                {tabsData.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-16">
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </>
    )
}

const tabsData = [
    {
        value: 'all-plans',
        icon: <PlansIcon />,
        label: i18next.t('all-plans'),
        content: <Outlet />,
    },
    {
        value: 'summary-plan',
        icon: <SummaryPlanIcon />,
        label: i18next.t('summary-plan'),
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
