import { formatInitials } from '@/shared/lib/format-initials'
import { User } from '@/types/interface/user'
import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import UserSwitch from './user-switch'

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'user_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'fio',
        header: i18next.t('fio'),
        cell: ({ row }) =>
            formatInitials(
                row.original.person.last_name,
                row.original.person.first_name,
                row.original.person.patronymic
            ),
    },
    {
        accessorKey: 'phone',
        header: i18next.t('phone'),
        cell: ({ row }) => (row.original.phone !== null ? row.original.phone : i18next.t('not.added')),
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'person.post',
        header: i18next.t('post'),
    },
    {
        accessorKey: 'legal_basis.legal_basis_name',
        header: i18next.t('legal.basis'),
    },
    {
        accessorKey: 'role.role_name',
        header: i18next.t('role'),
    },
    {
        accessorKey: 'is_active',
        header: i18next.t('status'),
        cell: ({ row }) => <UserSwitch user={row.original} />,
    },
]
