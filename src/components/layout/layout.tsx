import { SideBar } from '@/modules/sidebar'
import { cn } from '@/shared/lib/cn.ts'
import { Toaster } from '@/ui/toaster.tsx'
import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { PageLoader } from '../loaders'
import { ErrorBoundary } from '../error-boundary'
import { ErrorAlert } from '../error-alert'

export const Layout = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false)

    return (
        <>
            <SideBar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
            <ErrorBoundary fallback={<ErrorAlert />}>
                <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                    <main className={cn('w-full pb-10 text-center', sidebarExpanded ? 'pl-[380px]' : 'pl-[120px]')}>
                        <Outlet />
                    </main>
                    <Toaster />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}
