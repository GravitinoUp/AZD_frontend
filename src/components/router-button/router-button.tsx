import { Link, To } from 'react-router-dom'
import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'

interface RouterButtonProps {
    to: To
    children?: React.ReactNode
}

export const RouterButton = ({ to, children = <PlusRoundedIcon /> }: RouterButtonProps) => (
    <Link to={to} className="flex-center h-7 w-7 rounded-full bg-primary">
        {children}
    </Link>
)
