import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'
import { Link, To } from 'react-router-dom'

interface RouterButtonProps {
    to: To
    children?: React.ReactNode
}

export const RouterButton = ({ to, children = <PlusRoundedIcon /> }: RouterButtonProps) => (
    <Link to={to} className="flex-center h-7 w-7 rounded-full bg-primary hover:opacity-65">
        {children}
    </Link>
)
