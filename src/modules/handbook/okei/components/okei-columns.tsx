import { OKEI } from '@/types/handbook'
import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'

export const okeiColumns: ColumnDef<OKEI>[] = [
    {
        accessorKey: 'okei_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'okei_code',
        header: i18next.t('okei-code'),
    },
    {
        accessorKey: 'okei_full_name',
        header: i18next.t('full-name'),
    },
    {
        accessorKey: 'okei_short_name',
        header: i18next.t('short-name'),
    },
]
