import DashboardIcon from '@/assets/icons/navigation/dashboard-nav-icon.svg'
import ChevronLeft from '@/assets/icons/navigation/navbar-chevron-left.svg'
import ChevronRight from '@/assets/icons/navigation/navbar-chevron-right.svg'
import { WithScrollArea } from '@/components/with-scroll-area'
import { AppLogo } from '@/modules/sidebar/components/app-logo.tsx'
import { Navbar } from '@/modules/sidebar/components/navbar'
import { UserCard } from '@/modules/sidebar/components/user-card.tsx'
import { cn } from '@/shared/lib/cn.ts'
import { DASHBOARD } from '@/shared/router/routes.ts'
import { Button } from '@/ui/button.tsx'
import { Separator } from '@/ui/separator.tsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const SideBar = () => {
    const { t } = useTranslation()
    const [expanded, setExpanded] = useState(false)

    return (
        <div
            className={cn(
                'relative h-screen w-full bg-primary duration-300 ease-in-out',
                expanded ? 'max-w-[380px]' : 'max-w-[120px]',
                expanded ? 'pl-[10px]' : 'flex flex-col items-center'
            )}
        >
            <WithScrollArea isScrollable={expanded} className="h-[95%] pr-6">
                <div className={cn('flex flex-col', expanded ? 'w-[340px]' : 'w-[120px] items-center')}>
                    <AppLogo expanded={expanded} />
                    <UserCard expanded={expanded} />
                    <Link to={DASHBOARD} className={cn('flex gap-3 hover:opacity-60', expanded && 'ml-[10px]')}>
                        <DashboardIcon />
                        {expanded && <span className="text-base text-white">{t('dashboard')}</span>}
                    </Link>
                    <Separator className={cn('mt-8 bg-[#2B394A]', expanded && 'ml-[10px]')} />
                    <Navbar expanded={expanded} />
                </div>
            </WithScrollArea>
            <Button
                variant="ghost"
                className={cn('absolute right-[-70px] top-0 h-[64px] w-[70px] rounded-none bg-[#F3F3F3]')}
                onClick={() => setExpanded(!expanded)}
            >
                <span
                    className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full hover:opacity-60',
                        expanded ? 'bg-white' : 'bg-primary'
                    )}
                >
                    {expanded ? <ChevronLeft /> : <ChevronRight />}
                </span>
            </Button>
        </div>
    )
}
