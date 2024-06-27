import { Link, To } from 'react-router-dom'
import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'

interface RouterButtonProps {
    to: To
    state?: unknown
    children?: React.ReactNode
}

export const RouterButton = ({ to, state, children = <PlusRoundedIcon /> }: RouterButtonProps) => (
    <Link to={to} state={state} className="flex-center h-7 w-7 rounded-full bg-primary">
        {children}
    </Link>
)
