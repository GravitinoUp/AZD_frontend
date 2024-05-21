import { InfoLinks } from '@/modules/sidebar/components/navbar/info-links.tsx'
import { NavLinks } from '@/modules/sidebar/components/navbar/nav-links.tsx'
import { cn } from '@/shared/lib/cn.ts'

interface NavbarProps {
    expanded?: boolean
}

export const Navbar = ({ expanded }: NavbarProps) => (
    <nav className={cn('w-full pl-[10px]', !expanded && 'flex flex-col items-center')}>
        <NavLinks expanded={expanded} />
        <InfoLinks expanded={expanded} />
    </nav>
)
