import { DataTable } from '@/components/data-table'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'
import { PURCHASES } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { placeholderQuery } from '@/shared/constants'
import { useState } from 'react'
import { useGetAllPurchases } from './api/use-get-all-purchases'
import { purchaseColumns } from './components/purchase-columns'
import i18next from 'i18next'

const routes = [
    { route: '/', label: i18next.t('home') },
    { route: PURCHASES, label: i18next.t('all-purchase') },
]

export const AllPurchases = () => {
    const { t } = useTranslation()

    const [purchasesQuery, setPurchasesQuery] = useState(placeholderQuery)
    const { data: purchases = { count: 0, data: [] }, isLoading, isError } = useGetAllPurchases(purchasesQuery)

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
                    setPurchasesQuery({
                        ...purchasesQuery,
                        filter: { short_name: searchQuery !== '' ? searchQuery : undefined },
                    })
                }}
            />
            <DataTable
                className="mb-10 mt-7"
                columns={purchaseColumns}
                data={purchases.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
