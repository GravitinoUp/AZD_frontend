import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'
import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { ErrorAlert } from '@/components/error-alert'
import { TableActions } from '@/components/table-actions'
import { placeholderQuery } from '@/shared/constants'
import { ROLE_MANAGE, ROLES } from '@/shared/router/routes'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useGetAllRoles } from './api/use-get-all-roles'
import { roleColumns } from './components/roles-columns'

const routes = [
    { route: '/', label: 'Главная' },
    { route: ROLES, label: 'Роли' },
]

export const RolesModule = () => {
    const { t } = useTranslation()

    const [rolesQuery, setRolesQuery] = useState(placeholderQuery)
    const { data: roles = { count: 0, data: [] }, isLoading, isError } = useGetAllRoles(rolesQuery)

    if (isError) {
        return <ErrorAlert className="mx-auto" />
    }

    return (
        <div className="mx-auto w-[95%]">
            <div className="flex-center mt-20 gap-4">
                <h1 className="text-3xl font-bold">{t('roles-and-permissions')}</h1>
                <Link to={ROLE_MANAGE} className="flex-center h-7 w-7 rounded-full bg-primary">
                    <PlusRoundedIcon />
                </Link>
            </div>
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput
                className="my-6"
                value=""
                onChange={(query) => {
                    const searchQuery = String(query).trim()
                    setRolesQuery({
                        ...rolesQuery,
                        filter: {
                            role_name: searchQuery !== '' ? searchQuery : undefined,
                        },
                    })
                }}
            />
            <DataTable
                className="mb-10 mt-7"
                columns={roleColumns}
                data={roles.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
