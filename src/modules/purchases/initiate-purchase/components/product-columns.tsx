import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'

export const productColumns: ColumnDef<any>[] = [
    {
        accessorKey: 'product_id',
        header: 'ID',
    },
    {
        accessorKey: 'product_name',
        header: i18next.t('name'),
    },
    {
        accessorKey: 'code',
        header: 'CODE',
    },
    {
        accessorKey: 'property_name',
        header: 'PROPERTY NAME',
    },
    {
        accessorKey: 'property_value',
        header: 'PROPERTY VALUE',
    },
    {
        accessorKey: 'property_measurement',
        header: 'PROPERTY MEASUREMENT',
    },
    {
        accessorKey: 'product_count',
        header: 'COUNT',
    },
]
