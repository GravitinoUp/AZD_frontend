import { Limit } from '@/types/limits.ts'
import { Skeleton } from '@/ui/skeleton.tsx'
import { ColumnDef } from '@tanstack/react-table'

export const getLimitColumns = (currentYear?: number): ColumnDef<Limit>[] => [
    {
        id: 'base-info',
        columns: [
            {
                accessorKey: 'limit_uuid',
                header: '№ п/п',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'limit_name',
                header: 'Наименование показателя',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'line_code',
                header: 'Код строки',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        header: 'Код по бюджетной классификации Российской Федерации',
        columns: [
            {
                header: 'Раздел',
                accessorKey: 'kbk.kbk_section.kbk_type',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                header: 'Подраздел',
                accessorKey: 'kbk.kbk_subsection.kbk_type',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                header: 'Целевая статья',
                accessorKey: 'kbk.kbk_target_article.kbk_type',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                header: 'Вид расходов',
                accessorKey: 'kbk.kbk_expenses_type.kbk_type',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        id: 'kosgu-code',
        columns: [
            {
                header: 'Код аналитического показателя (КОСГУ)',
                accessorKey: 'kosgu.kosgu_code',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        header: 'Сумма',
        columns: [
            {
                id: 'current-year',
                header: () =>
                    typeof currentYear !== 'undefined' ? (
                        `На ${currentYear} год (на текущий финансовый год)`
                    ) : (
                        <Skeleton className="mx-auto h-5 w-full max-w-[120px]" />
                    ),
                columns: [
                    {
                        header: 'В рублях (рублевом эквиваленте)',
                        accessorKey: 'current_year_rub_value',
                    },
                    {
                        header: 'В валюте',
                        accessorKey: 'current_year_currency_value',
                    },
                    {
                        header: 'Код валюты по ОКВ',
                        accessorKey: 'current_year_currency_code',
                    },
                ],
            },
            {
                id: 'first-year',
                header: () =>
                    typeof currentYear !== 'undefined' ? (
                        `На ${currentYear + 1} год (на первый год планового периода)`
                    ) : (
                        <Skeleton className="mx-auto h-5 w-full max-w-[120px]" />
                    ),
                columns: [
                    {
                        header: 'В рублях (рублевом эквиваленте)',
                        accessorKey: 'first_year_rub_value',
                    },
                    {
                        header: 'В валюте',
                        accessorKey: 'first_year_currency_value',
                    },
                    {
                        header: 'Код валюты по ОКВ',
                        accessorKey: 'first_year_currency_code',
                    },
                ],
            },
            {
                id: 'second-year',
                header: () =>
                    typeof currentYear !== 'undefined' ? (
                        `На ${currentYear + 2} год (на второй год планового периода)`
                    ) : (
                        <Skeleton className="mx-auto h-5 w-full max-w-[120px]" />
                    ),
                columns: [
                    {
                        header: 'В рублях (рублевом эквиваленте)',
                        accessorKey: 'second_year_rub_value',
                    },
                    {
                        header: 'В валюте',
                        accessorKey: 'second_year_currency_value',
                    },
                    {
                        header: 'Код валюты по ОКВ',
                        accessorKey: 'second_year_currency_code',
                    },
                ],
            },
        ],
    },
]
