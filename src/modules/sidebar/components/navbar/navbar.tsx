import { InfoLinks } from '@/modules/sidebar/components/navbar/info-links.tsx'
import { NavLinks } from '@/modules/sidebar/components/navbar/nav-links.tsx'

interface NavbarProps {
    expanded?: boolean
}

export const Navbar = ({ expanded }: NavbarProps) => (
    <nav className="pl-[10px]">
        <NavLinks expanded={expanded} />
        <InfoLinks expanded={expanded} />
    </nav>
)
