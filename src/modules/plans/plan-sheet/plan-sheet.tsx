import { SheetInfo } from '@/components/sheet-info'
import { PlanInfoTab } from '@/modules/plans/plan-sheet/components/plan-info-tab.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs.tsx'
import { Dispatch, SetStateAction } from 'react'

interface PlanSheetProps {
    title: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const PlanSheet = ({ title, open, setOpen }: PlanSheetProps) => (
    <SheetInfo title={title} open={open} setOpen={setOpen}>
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
    </SheetInfo>
)

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
