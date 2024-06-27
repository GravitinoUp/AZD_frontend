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
        accessorKey: 'entity_name',
        header: i18next.t('entity'),
    },
]
