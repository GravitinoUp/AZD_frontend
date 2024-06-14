import { DataTable } from '@/components/data-table'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'
import { BRANCHES } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { placeholderQuery } from '@/shared/constants'
import { useEffect, useState } from 'react'
import { useGetAllBranches } from './api/use-get-all-branches'
import { branchColumns } from './components/branch-columns'
import { useOrganizationsPageTitle } from '@/shared/context/organizations-page-title'

const routes = [
    { route: '/', label: 'Главная' },
    { route: BRANCHES, label: 'Филиалы' },
]

export const Branches = () => {
    const { t } = useTranslation()

    const [branchesQuery, setBranchesQuery] = useState(placeholderQuery)
    const { data: branches = { count: 0, data: [] }, isLoading, isError } = useGetAllBranches(branchesQuery)

    const { setPageTitle } = useOrganizationsPageTitle()

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
                columns={branchColumns}
                data={branches.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
