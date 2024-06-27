import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { InputCell } from './input-cell'
import { Product } from '@/types/product'

export const productColumns: ColumnDef<Product>[] = [
    {
        accessorKey: 'product_id',
        header: 'ID',
        cell: InputCell,
    },
    {
        accessorKey: 'product_name',
        header: i18next.t('name'),
        cell: InputCell,
    },
    {
        accessorKey: 'code',
        header: i18next.t('product-code'),
        cell: InputCell,
    },
    {
        accessorKey: 'property_name',
        header: i18next.t('property-name'),
        cell: InputCell,
    },
    {
        accessorKey: 'property_value',
        header: i18next.t('property-value'),
        cell: InputCell,
    },
    {
        accessorKey: 'property_measurement',
        header: i18next.t('measurement'),
        cell: InputCell,
    },
    {
        accessorKey: 'product_count',
        header: i18next.t('count'),
        cell: InputCell,
    },
]
