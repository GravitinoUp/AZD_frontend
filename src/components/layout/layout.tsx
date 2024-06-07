import { SideBar } from '@/modules/sidebar'
import { cn } from '@/shared/lib/cn.ts'
import { Toaster } from '@/ui/toaster.tsx'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false)

    return (
        <>
            <SideBar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
            <main className={cn('w-full pb-10 text-center', sidebarExpanded ? 'pl-[380px]' : 'pl-[120px]')}>
                <Outlet />
            </main>
            <Toaster />
        </>
    )
}
