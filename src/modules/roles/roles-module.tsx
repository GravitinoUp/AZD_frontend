import { DataTable } from '@/components/data-table'
import { roleColumns } from './components/roles-columns'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'
import { Button } from '@/ui/button'
import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'
import { ROLES, ROLE_MANAGE } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { useGetAllRoles } from './api/useGetAllRoles'
import { useNavigate } from 'react-router-dom'
import { placeholderQuery } from '@/shared/constants'
import { useState } from 'react'

const routes = [
    { route: '/', label: 'Главная' },
    { route: ROLES, label: 'Роли' },
]

export const RolesModule = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [rolesQuery, setRolesQuery] = useState(placeholderQuery)
    const { data: roles = { count: 0, data: [] }, isLoading, isError } = useGetAllRoles(rolesQuery)

    if (isError) {
        return <p>{t('error.default')}</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <div className="flex-center mt-20 gap-4">
                <h1 className="text-3xl font-bold">{t('roles-and-permissions')}</h1>
                <Button className="h-7 w-7" size="icon" onClick={() => navigate(ROLE_MANAGE)}>
                    <PlusRoundedIcon />
                </Button>
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
