import { DataTable } from '@/components/data-table'
import { organizationColumns } from './components/organization-columns'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'
import { ORGANIZATIONS } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { placeholderQuery } from '@/shared/constants'
import { useEffect, useState } from 'react'
import { usePageTitle } from '@/shared/context/plans-page-title'
import { useGetAllBranches } from './api/use-get-all-branches'

const routes = [
    { route: '/', label: 'Главная' },
    { route: ORGANIZATIONS, label: 'Филиалы' },
]

export const BranchesModule = () => {
    const { t } = useTranslation()
    const { setPageTitle } = usePageTitle()

    const [branchesQuery, setBranchesQuery] = useState(placeholderQuery)
    const { data: branches = { count: 0, data: [] }, isLoading, isError } = useGetAllBranches(branchesQuery)

    useEffect(() => {
        setPageTitle(t('branches'))
    }, [])

    if (isError) {
        return <p>{t('error.default')}</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput
                className="my-6"
                value=""
                onChange={(query) => {
                    const searchQuery = String(query).trim()
                    setBranchesQuery({ ...branchesQuery, filter: { short_name: searchQuery } })
                }}
            />
            <DataTable
                className="mb-10 mt-7"
                columns={organizationColumns}
                data={branches.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
