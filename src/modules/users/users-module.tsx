import { DataTable } from '@/components/data-table'
import { userColumns } from './components/users-columns'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'
import { useGetAllUsers } from './api/use-get-all-users'
import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'
import { USERS, USER_MANAGE } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { Link } from 'react-router-dom'
import { RouterButton } from '@/components/router-button'

const routes = [
    { route: '/', label: 'Главная' },
    { route: USERS, label: 'Пользователи' },
]

export const UsersModule = () => {
    const { t } = useTranslation()

    const { data: users = { count: 0, data: [] }, isLoading, isError } = useGetAllUsers()

    if (isError) {
        return <p>{t('error.default')}</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <div className="flex-center mt-20 gap-4">
                <h1 className="text-3xl font-bold">{t('users')}</h1>
                <RouterButton to={USER_MANAGE} />
            </div>
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput className="my-6" value="" onChange={() => void 0} />
            <DataTable
                className="mb-10 mt-7"
                columns={userColumns}
                data={users.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
