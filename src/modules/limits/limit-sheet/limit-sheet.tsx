import { SheetInfo } from '@/components/sheet-info'
import { LimitInfoTab } from '@/modules/limits/limit-sheet/limit-sheet-tabs/components/limit-info-tab.tsx'
import { ScrollArea } from '@/ui/scroll-area.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs.tsx'
import { Dispatch, SetStateAction } from 'react'

interface LimitSheetProps {
    title: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const LimitSheet = ({ title, open, setOpen }: LimitSheetProps) => (
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
                    <ScrollArea className="h-[60vh] pr-10">{tab.content}</ScrollArea>
                </TabsContent>
            ))}
        </Tabs>
    </SheetInfo>
)

const tabsData = [
    {
        value: 'common-info',
        label: 'Общая информация',
        content: <LimitInfoTab />,
    },
    {
        value: 'journal',
        label: 'Журнал',
        content: 'Журнал...',
    },
]
