import { formatIsoDate } from '@/shared/lib/format-iso-date.ts'
import { ColumnDef } from '@tanstack/react-table'

export const userColumns: ColumnDef<unknown>[] = [
    {
        accessorKey: 'number',
        header: '№',
    },
    {
        accessorKey: 'fio',
        header: 'ФИО',
        // TODO: убрать ts-ignore после добавления типизации для колонки
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cell: ({ row }) => formatIsoDate(row.original.created_at),
    },
    {
        accessorKey: 'phone',
        header: 'Номер телефона',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cell: ({ row }) => formatIsoDate(row.original.updated_at),
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'organization.short_name',
        header: 'Компания',
    },
    {
        accessorKey: 'role.role_name',
        header: 'Роль',
    },
]
