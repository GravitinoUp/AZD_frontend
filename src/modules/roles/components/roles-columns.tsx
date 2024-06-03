import { RoleInterface } from '@/types/interface/user'
import { ColumnDef } from '@tanstack/react-table'

export const roleColumns: ColumnDef<RoleInterface>[] = [
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
]
