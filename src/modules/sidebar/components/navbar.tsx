import { InfoLinks } from '@/modules/sidebar/components/info-links.tsx'
import { NavLinks } from '@/modules/sidebar/components/nav-links.tsx'
import { cn } from '@/shared/lib/cn.ts'

interface NavbarProps {
    expanded?: boolean
}

export const Navbar = ({ expanded }: NavbarProps) => (
    <nav className={cn('w-full', expanded ? 'pl-[10px]' : 'flex flex-col items-center')}>
        <NavLinks expanded={expanded} />
        <InfoLinks expanded={expanded} />
    </nav>
)
