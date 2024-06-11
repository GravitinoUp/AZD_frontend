import { DataTable } from '@/components/data-table'
import { organizationColumns } from './components/organization-columns'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'
import { useGetAllOrganizations } from './api/use-get-all-organizations'
import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'
import { ORGANIZATIONS, ORGANIZATION_MANAGE } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { Link } from 'react-router-dom'
import { placeholderQuery } from '@/shared/constants'
import { useState } from 'react'

const routes = [
    { route: '/', label: 'Главная' },
    { route: ORGANIZATIONS, label: 'Организации и филиалы' },
]

export const OrganizationsModule = () => {
    const { t } = useTranslation()

    const [organizationsQuery, setOrganizationsQuery] = useState(placeholderQuery)
    const {
        data: organizations = { count: 0, data: [] },
        isLoading,
        isError,
    } = useGetAllOrganizations(organizationsQuery)

    if (isError) {
        return <p>{t('error.default')}</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <div className="flex-center mt-20 gap-4">
                <h1 className="text-3xl font-bold">{t('organizations')}</h1>
                <Link to={ORGANIZATION_MANAGE} className="flex-center h-7 w-7 rounded-full bg-primary">
                    <PlusRoundedIcon />
                </Link>
            </div>
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput
                className="my-6"
                value=""
                onChange={(query) => {
                    const searchQuery = String(query).trim()
                    setOrganizationsQuery({ ...organizationsQuery, filter: { short_name: searchQuery } })
                }}
            />
            <DataTable
                className="mb-10 mt-7"
                columns={organizationColumns}
                data={organizations.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
