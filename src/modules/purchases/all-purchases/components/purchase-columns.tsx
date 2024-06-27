import { ColumnDef } from '@tanstack/react-table'
import { Purchase } from '@/types/purchase'
import { PurchaseActions } from './purchases-actions'
import i18next from 'i18next'

export const purchaseColumns: ColumnDef<Purchase>[] = [
    {
        accessorKey: 'purchase_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'purchase_name',
        header: i18next.t('name'),
    },
    {
        accessorKey: 'purchase_step.purchase_step_name',
        header: i18next.t('step'),
    },
    {
        accessorKey: 'purchase_type.purchase_type_name',
        header: i18next.t('purchase-type-id'),
    },
    {
        id: 'actions',
        cell: ({ row }) => <PurchaseActions purchase={row.original} />,
    },
]
