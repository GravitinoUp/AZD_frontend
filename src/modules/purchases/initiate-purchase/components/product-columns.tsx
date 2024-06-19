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
        header: 'CODE',
        cell: InputCell,
    },
    {
        accessorKey: 'property_name',
        header: 'PROPERTY NAME',
        cell: InputCell,
    },
    {
        accessorKey: 'property_value',
        header: 'PROPERTY VALUE',
        cell: InputCell,
    },
    {
        accessorKey: 'property_measurement',
        header: 'PROPERTY MEASUREMENT',
        cell: InputCell,
    },
    {
        accessorKey: 'product_count',
        header: 'COUNT',
        cell: InputCell,
    },
]
