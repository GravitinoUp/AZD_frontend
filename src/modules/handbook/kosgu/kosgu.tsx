import { DataTable } from '@/components/data-table'
import { useTranslation } from 'react-i18next'
import { HANDBOOK, KOSGU } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { ErrorAlert } from '@/components/error-alert'
import { TableActions } from '@/components/table-actions'
import { placeholderQuery } from '@/shared/constants'
import { useState } from 'react'
import { useGetAllKOSGU } from './api/use-get-kosgu'
import { kosguColumns } from './components/kosgu-columns'
import i18next from 'i18next'

const routes = [
    { route: '/', label: i18next.t('home') },
    { route: HANDBOOK, label: i18next.t('handbook') },
    { route: KOSGU, label: i18next.t('kosgu') },
]

export const KOSGUModule = () => {
    const { t } = useTranslation()

    const [query, setQuery] = useState(placeholderQuery)
    const { data: kosgu = { count: 0, data: [] }, isLoading, isError } = useGetAllKOSGU(query)

    if (isError) {
        return <ErrorAlert className="mx-auto" />
    }

    return (
        <div className="mx-auto w-[95%]">
            <h1 className="mt-20 text-3xl font-bold">{t('kosgu')}</h1>
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput
                className="my-6"
                value=""
                onChange={(search) => {
                    const searchQuery = String(search).trim()
                    setQuery({
                        ...query,
                        filter: {
                            kosgu_code: searchQuery !== '' ? searchQuery : undefined,
                        },
                    })
                }}
            />
            <DataTable
                className="mb-10 mt-7"
                columns={kosguColumns}
                data={kosgu.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
