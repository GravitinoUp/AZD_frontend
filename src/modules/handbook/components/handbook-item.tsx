import HandbookAlt from '@/assets/icons/handbook-alt.svg'
import { Link } from 'react-router-dom'

interface HandbookItemProps {
    value: { title: string; href: string }
}

export const HandbookItem = ({ value }: HandbookItemProps) => (
    <Link
        to={value.href}
        className="flex-center h-[300px] w-[300px] flex-col gap-4 rounded-md border border-table bg-gradient-to-b from-white to-[#F5F7FB]"
    >
        <HandbookAlt />
        <div className="rounded-full bg-muted px-3">
            <p className="text-lg font-bold">{value.title}</p>
        </div>
    </Link>
)
