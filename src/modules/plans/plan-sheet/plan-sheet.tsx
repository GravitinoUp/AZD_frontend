import { SheetTabs } from '@/modules/plans/plan-sheet/sheet-tabs.tsx'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/ui/sheet.tsx'
import { Dispatch, SetStateAction } from 'react'

interface PlanSheetProps {
    title: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const PlanSheet = ({ title, open, setOpen }: PlanSheetProps) => (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
            className="w-[65vw] bg-[#F5F7FB] p-0"
            onOpenAutoFocus={(event) => {
                event.preventDefault()
            }}
        >
            <SheetHeader className="bordered-space"></SheetHeader>
            <SheetTitle title={title} className="line-ellipsis-2 mx-auto mt-14 w-[60%]">
                {title}
            </SheetTitle>
            <SheetTabs />
        </SheetContent>
    </Sheet>
)
