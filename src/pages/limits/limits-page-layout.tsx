import HandbookIcon from '@/assets/icons/navigation/handbook.svg'
import AllLimitsIcon from '@/assets/icons/tabs/all-limits-tab.svg'
import { useLimitPageTitle } from '@/shared/context/limits-page-title.tsx'
import i18next from '@/shared/i18n/i18n.ts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs.tsx'
import { Outlet } from 'react-router-dom'

export const LimitsPageLayout = () => {
    const { pageTitle } = useLimitPageTitle()

    return (
        <>
            <div className="bordered-space" />
            <h1 className="page-title mt-8">{pageTitle}</h1>
            <Tabs defaultValue={tabsData[0].value} className="mt-7">
                <div className="border-b-2 border-b-tabs-content pb-[3px]">
                    <TabsList className="gap-5">
                        {tabsData.map(({ value, icon, label }) => (
                            <TabsTrigger key={value} value={value}>
                                <span className="tab-icon mr-1.5">{icon}</span>
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
        value: 'all-limits',
        icon: <AllLimitsIcon />,
        label: i18next.t('all-limits'),
        content: <Outlet />,
    },
    {
        value: 'handbook',
        icon: <HandbookIcon />,
        label: i18next.t('handbook'),
        content: 'Справочники',
    },
]
