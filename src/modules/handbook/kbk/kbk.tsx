import { DataTable } from '@/components/data-table'
import { useTranslation } from 'react-i18next'
import { HANDBOOK, KBK } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { ErrorAlert } from '@/components/error-alert'
import { TableActions } from '@/components/table-actions'
import { placeholderQuery } from '@/shared/constants'
import { useState } from 'react'
import { kbkColumns } from './components/kbk-columns'
import { useGetAllKBK } from './api/use-get-kbk'
import i18next from 'i18next'

const routes = [
    { route: '/', label: i18next.t('home') },
    { route: HANDBOOK, label: i18next.t('handbook') },
    { route: KBK, label: i18next.t('kbk') },
]

export const KBKModule = () => {
    const { t } = useTranslation()

    const [query, setQuery] = useState(placeholderQuery)
    const { data: kbk = { count: 0, data: [] }, isLoading, isError } = useGetAllKBK(query)

    if (isError) {
        return <ErrorAlert className="mx-auto" />
    }

    return (
        <div className="mx-auto w-[95%]">
            <h1 className="mt-20 text-3xl font-bold">{t('kbk')}</h1>
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput
                className="my-6"
                value=""
                onChange={(search) => {
                    const searchQuery = String(search).trim()
                    setQuery({
                        ...query,
                        filter: {
                            okpd_code: searchQuery !== '' ? searchQuery : undefined,
                        },
                    })
                }}
            />
            <DataTable
                className="mb-10 mt-7"
                columns={kbkColumns}
                data={kbk.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
