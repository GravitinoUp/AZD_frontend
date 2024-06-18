import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/ui/sheet.tsx'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface SheetInfoProps {
    title: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    children?: ReactNode
}

export const SheetInfo = ({ title, open, setOpen, children }: SheetInfoProps) => (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
            className="w-[65vw] bg-[#F5F7FB] p-0"
            onOpenAutoFocus={(event) => {
                event.preventDefault()
            }}
        >
            <SheetHeader className="bordered-space"></SheetHeader>
            <SheetTitle title={title} className="line-ellipsis-2 mx-auto mt-14 w-[60%] text-center">
                {title}
            </SheetTitle>
            {children}
        </SheetContent>
    </Sheet>
)
