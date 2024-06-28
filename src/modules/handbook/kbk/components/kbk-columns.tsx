import { KBK } from '@/types/handbook'
import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'

export const kbkColumns: ColumnDef<KBK>[] = [
    {
        accessorKey: 'kbk_uuid',
        header: 'UUID',
        size: 100,
    },
    {
        accessorKey: 'kbk_name.kbk_value',
        header: i18next.t('name'),
    },
    {
        accessorKey: 'kbk_section.kbk_value',
        header: i18next.t('section'),
    },
    {
        accessorKey: 'kbk_subsection.kbk_value',
        header: i18next.t('subsection'),
    },
    {
        accessorKey: 'kbk_target_article.kbk_value',
        header: i18next.t('target-article'),
    },
    {
        accessorKey: 'kbk_expenses_type.kbk_value',
        header: i18next.t('expenses-type'),
    },
]
