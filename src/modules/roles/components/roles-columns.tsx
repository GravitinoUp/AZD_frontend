import { Role } from '@/types/user'
import { ColumnDef } from '@tanstack/react-table'
import { RoleActions } from './role-actions'

export const roleColumns: ColumnDef<Role>[] = [
    {
        accessorKey: 'role_id',
        header: 'ID',
        size: 10,
    },
    {
        accessorKey: 'role_name',
        header: 'Роль',
        size: 1000,
    },
    {
        id: 'actions',
        cell: ({ row }) => <RoleActions role={row.original} />,
    },
]
