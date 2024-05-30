import i18n from '@/shared/i18n/i18n.ts'
import { formatIsoDate } from '@/shared/lib/format-iso-date.ts'
import { ColumnDef } from '@tanstack/react-table'

export const schedulesColumns: ColumnDef<unknown>[] = [
    {
        accessorKey: 'number',
        header: '№',
    },
    {
        accessorKey: 'created_at',
        header: i18n.t('creation-date'),
        // TODO: убрать ts-ignore после добавления типизации для колонки
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cell: ({ row }) => formatIsoDate(row.original.created_at),
    },
    {
        accessorKey: 'updated_at',
        header: i18n.t('last-edit-date'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cell: ({ row }) => formatIsoDate(row.original.updated_at),
    },
    {
        accessorKey: 'branch.short_name',
        header: i18n.t('branch'),
    },
    {
        accessorKey: 'okpd_uuid',
        header: 'ОКПД',
    },
    {
        accessorKey: 'contragent',
        header: 'Контрагент',
    },
]
