import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'
import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { ErrorAlert } from '@/components/error-alert'
import { TableActions } from '@/components/table-actions'
import { placeholderQuery } from '@/shared/constants'
import { USER_MANAGE, USERS } from '@/shared/router/routes'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useGetAllUsers } from './api/use-get-all-users'
import { userColumns } from './components/users-columns'

const routes = [
    { route: '/', label: 'Главная' },
    { route: USERS, label: 'Пользователи' },
]

export const UsersModule = () => {
    const { t } = useTranslation()

    const [usersQuery, setUsersQuery] = useState(placeholderQuery)
    const { data: users = { count: 0, data: [] }, isLoading, isError } = useGetAllUsers(usersQuery)

    if (isError) {
        return <ErrorAlert className="mx-auto" />
    }

    return (
        <div className="mx-auto w-[95%]">
            <div className="flex-center mt-20 gap-4">
                <h1 className="text-3xl font-bold">{t('users')}</h1>
                <Link to={USER_MANAGE} className="flex-center h-7 w-7 rounded-full bg-primary">
                    <PlusRoundedIcon />
                </Link>
            </div>
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput
                className="my-6"
                value=""
                onChange={(query) => {
                    const searchQuery = String(query).trim()
                    setUsersQuery({
                        ...usersQuery,
                        filter: {
                            last_name: searchQuery !== '' ? searchQuery : undefined,
                        },
                    })
                }}
            />
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
