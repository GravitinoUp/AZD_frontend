import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { Branch } from '@/types/branch'
import { BranchActions } from './branch-actions'

export const branchColumns: ColumnDef<Branch>[] = [
    {
        accessorKey: 'branch_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'branch_name',
        header: i18next.t('name'),
    },
    {
        accessorKey: 'branch_address',
        header: i18next.t('address'),
    },
    {
        id: 'actions',
        cell: ({ row }) => <BranchActions branch={row.original} />,
    },
]
