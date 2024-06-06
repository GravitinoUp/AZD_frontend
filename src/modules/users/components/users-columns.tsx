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
        header: 'ФИО',
        cell: ({ row }) =>
            formatInitials(
                row.original.person.last_name,
                row.original.person.first_name,
                row.original.person.patronymic
            ),
    },
    {
        accessorKey: 'phone',
        header: 'Номер телефона',
        cell: ({ row }) => (row.original.phone !== null ? row.original.phone : i18next.t('not.added')),
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'person.post',
        header: 'Должность',
    },
    {
        accessorKey: 'legal_basis.legal_basis_name',
        header: 'Юридическое обоснование',
    },
    {
        accessorKey: 'role.role_name',
        header: 'Роль',
    },
    {
        accessorKey: 'is_active',
        header: 'Статус',
        cell: ({ row }) => <UserSwitch user={row.original} />,
    },
]
