import { cn } from '@/shared/lib/cn'
import React from 'react'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('animate-pulse rounded-md bg-[#e8e8e8]', className)} {...props} />
}

export { Skeleton }
