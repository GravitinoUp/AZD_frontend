import { OKPD } from '@/types/handbook'
import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'

export const okpdColumns: ColumnDef<OKPD>[] = [
    {
        accessorKey: 'okpd_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'okpd_code',
        header: i18next.t('okpd-code'),
    },
    {
        accessorKey: 'okpd_name',
        header: i18next.t('name'),
    },
    {
        accessorKey: 'okpd_data_json',
        header: i18next.t('json'),
    },
]
