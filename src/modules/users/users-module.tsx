import { DataTable } from '@/components/data-table'
import { userColumns } from './components/users-columns'
import { useTranslation } from 'react-i18next'
import { useGetAllUsers } from './api/use-get-all-users'
import { USERS, USER_MANAGE } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { ErrorAlert } from '@/components/error-alert'
import { TableActions } from '@/components/table-actions'
import { placeholderQuery } from '@/shared/constants'
import { useState } from 'react'
import { RouterButton } from '@/components/router-button'
import i18next from 'i18next'

const routes = [
    { route: '/', label: i18next.t('home') },
    { route: USERS, label: i18next.t('users') },
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
                <RouterButton to={USER_MANAGE} />
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
