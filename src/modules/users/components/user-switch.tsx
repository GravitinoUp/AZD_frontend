import { UserInterface } from '@/types/interface/user'
import { Switch } from '@/ui/switch'

export default function UserSwitch({ user }: { user: UserInterface }) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const updateStatus = () => {}

    return <Switch disabled={true} checked={user.is_active} onCheckedChange={updateStatus} />
}
