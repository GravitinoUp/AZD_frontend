import { ScrollArea } from '@/ui/scroll-area.tsx'
import { ReactNode } from 'react'

interface WithScrollAreaProps {
    isScrollable?: boolean
    className?: string
    children: ReactNode
}

export const WithScrollArea = ({ isScrollable, className, children }: WithScrollAreaProps) => {
    if (isScrollable) {
        return <ScrollArea className={className}>{children}</ScrollArea>
    }

    return <>{children}</>
}
