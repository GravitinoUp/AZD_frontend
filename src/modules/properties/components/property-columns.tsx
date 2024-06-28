import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { Property } from '@/types/property'

export const propertyColumns: ColumnDef<Property>[] = [
    {
        accessorKey: 'property_name_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'property_name',
        header: i18next.t('name'),
    },
    {
        accessorKey: 'values',
        header: i18next.t('values'),
        cell: ({ row }) => {
            const result = row.original.values.reduce((acc, item) => `${acc}, ${item.property_value}`, '')
            return <p>{result.substring(2, result.length)}</p>
        },
    },
    // {
    //     id: 'actions',
    //     cell: ({ row }) => <PropertyActions property={row.original} />,
    // },
]
