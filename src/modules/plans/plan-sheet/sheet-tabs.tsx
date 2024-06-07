import { PlanInfoTab } from '@/modules/plans/plan-sheet/sheet-tabs/components/plan-info-tab.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs.tsx'

const tabsData = [
    {
        value: 'common-info',
        label: 'Общая информация',
        content: <PlanInfoTab />,
    },
    {
        value: 'journal',
        label: 'Журнал',
        content: 'Журнал...',
    },
]
export const SheetTabs = () => (
    <Tabs defaultValue={tabsData[0].value} className="mt-10 px-12">
        <div className="border-b-2 border-b-tabs-content pb-[3px]">
            <TabsList className="gap-5">
                {tabsData.map(({ value, label }) => (
                    <TabsTrigger key={value} value={value}>
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </div>
        {tabsData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-14">
                {tab.content}
            </TabsContent>
        ))}
    </Tabs>
)
