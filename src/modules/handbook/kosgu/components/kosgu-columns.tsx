import { KOSGU } from '@/types/handbook'
import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'

export const kosguColumns: ColumnDef<KOSGU>[] = [
    {
        accessorKey: 'kosgu_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'kosgu_code',
        header: i18next.t('kosgu-code'),
    },
]
