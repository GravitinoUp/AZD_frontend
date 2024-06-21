import i18n from '@/shared/i18n/i18n.ts'
import { Limit } from '@/types/limits.ts'
import { ColumnDef } from '@tanstack/react-table'

export const AllLimitsColumns: ColumnDef<Limit>[] = [
    {
        accessorKey: 'limit_uuid',
        header: '№',
    },
    {
        accessorKey: 'created_at',
        header: i18n.t('creation-date'),
    },
    {
        accessorKey: 'updated_at',
        header: i18n.t('last-edit-date'),
    },
    {
        accessorKey: 'branch.branch_name',
        header: 'Филиал',
    },
    {
        accessorKey: 'limit_status.limit_status_name',
        header: i18n.t('status'),
    },
    {
        accessorKey: 'limit_version',
        header: i18n.t('version'),
    },
]
