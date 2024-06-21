import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { Organization } from '@/types/organization'
import { OrganizationActions } from './organization-actions'

export const organizationColumns: ColumnDef<Organization>[] = [
    {
        accessorKey: 'organization_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'short_name',
        header: i18next.t('name'),
    },
    {
        accessorKey: 'register_number',
        header: i18next.t('organization.register.number'),
    },
    {
        accessorKey: 'bic',
        header: i18next.t('organization.bic'),
    },
    {
        accessorKey: 'address',
        header: i18next.t('address'),
    },
    {
        accessorKey: 'mail_address',
        header: i18next.t('mail.address'),
    },
    {
        accessorKey: 'phone',
        header: i18next.t('phone'),
    },
    {
        accessorKey: 'ogrn',
        header: i18next.t('organization.ogrn'),
    },
    {
        accessorKey: 'inn',
        header: i18next.t('organization.inn'),
    },
    {
        accessorKey: 'kpp',
        header: i18next.t('organization.kpp'),
    },
    {
        accessorKey: 'okpo',
        header: i18next.t('organization.okpo'),
    },
    {
        accessorKey: 'region',
        header: i18next.t('region'),
    },
    {
        accessorKey: 'fax',
        header: i18next.t('organization.fax'),
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'additional_info',
        header: i18next.t('additional.info'),
    },
    {
        accessorKey: 'web_site',
        header: i18next.t('web.site'),
    },
    {
        id: 'actions',
        cell: ({ row }) => <OrganizationActions organization={row.original} />,
    },
]
