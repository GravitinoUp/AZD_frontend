import { formatIsoDate } from '@/shared/lib/format-iso-date.ts'
import { Plan } from '@/types/plans.ts'
import { Skeleton } from '@/ui/skeleton.tsx'
import { ColumnDef } from '@tanstack/react-table'

export const getCurrentYear = (createdAt: string) => {
    const date = new Date(createdAt)
    return date.getFullYear()
}

export const getTableColumns = (currentYear?: number): ColumnDef<Plan>[] => [
    {
        id: 'init-info',
        columns: [
            {
                accessorKey: 'plan_uuid',
                header: '№ п/п',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'purchase_offer_number',
                header: 'Номер предложения на закупку (Электронный бюджет)',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'purchase.purchase_identification_code',
                header: 'Идентификационный код закупки',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        header: 'Объект закупки',
        columns: [
            {
                header: 'Товар, работа, услуга по Общероссийскому классификатору продукции по видам экономической деятельности ОК 034-2014 (КПЕС 2008) (ОКПД2)',
                columns: [
                    {
                        accessorKey: 'okpd.okpd_code',
                        header: 'Код',
                    },
                    {
                        accessorKey: 'okpd.okpd_name',
                        header: 'Наименование',
                    },
                ],
            },
            {
                accessorKey: 'object_name',
                header: 'Наименование объекта закупки',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        id: 'okei_code',
        columns: [
            {
                header: 'Код по ОКЕИ ОК 015-94 (МК 002-97) Общероссийский классификатор единиц измерения',
                accessorKey: 'okei_code',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        header: 'Плановое значение/Детализация объекта закупки с учетом норм положенности',
        columns: [
            {
                id: 'current-year',
                header: () => (currentYear ? `${currentYear} год` : <Skeleton className="mx-auto h-5 w-[80px]" />),
                columns: [
                    {
                        accessorKey: 'current_year_plan_count',
                        header: 'Количество',
                    },
                    {
                        accessorKey: 'current_year_plan_avg_price',
                        header: 'Средняя цена за единицу, руб.',
                    },
                ],
            },
            {
                id: 'first-year',
                header: () => (currentYear ? `${currentYear + 1} год` : <Skeleton className="mx-auto h-5 w-[80px]" />),
                columns: [
                    {
                        accessorKey: 'first_year_plan_count',
                        header: 'Количество',
                    },
                    {
                        accessorKey: 'first_year_plan_avg_price',
                        header: 'Средняя цена за единицу, руб.',
                    },
                ],
            },
            {
                id: 'second-year',
                header: () => (currentYear ? `${currentYear + 2} год` : <Skeleton className="mx-auto h-5 w-[80px]" />),
                columns: [
                    {
                        accessorKey: 'second_year_plan_count',
                        header: 'Количество',
                    },
                    {
                        accessorKey: 'second_year_plan_avg_price',
                        header: 'Средняя цена за единицу, руб.',
                    },
                ],
            },
            {
                header: 'Последующие годы',
                columns: [
                    {
                        accessorKey: 'next_years_plan_count',
                        header: 'Количество',
                    },
                    {
                        accessorKey: 'next_years_plan_avg_price',
                        header: 'Средняя цена за единицу, руб.',
                    },
                ],
            },
        ],
    },
    {
        id: 'planned-year-price',
        columns: [
            {
                accessorKey: 'start_max_price',
                header:
                    'Начальная (максимальная) цена контракта, цена контракта, заключаемого с единственным поставщиком (подрядчиком,\n' +
                    'исполнителем) (рублей)',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        header: 'Объем финансового обеспечения, в том числе планируемые платежи',
        columns: [
            {
                accessorKey: 'placeholder123',
                header: 'Всего',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'current_year_limit',
                header: () =>
                    currentYear ? (
                        `На текущий финансовый год (${currentYear} год)`
                    ) : (
                        <Skeleton className="mx-auto h-5 w-[80px]" />
                    ),
                meta: {
                    rowSpan: 2,
                },
            },
            {
                header: 'На плановый период',
                columns: [
                    {
                        accessorKey: 'first_year_limit',
                        header: () =>
                            currentYear ? (
                                `На первый год (${currentYear} год)`
                            ) : (
                                <Skeleton className="mx-auto h-5 w-full max-w-[80px]" />
                            ),
                    },
                    {
                        accessorKey: 'second_year_limit',
                        header: () =>
                            currentYear ? (
                                `На второй год (${currentYear + 1} год)`
                            ) : (
                                <Skeleton className="mx-auto h-5 w-full max-w-[80px]" />
                            ),
                    },
                ],
            },
            {
                accessorKey: 'next_years_limit',
                header: 'Последующие годы',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        id: 'additional-info',
        columns: [
            {
                accessorKey: 'placement_month',
                header: 'Месяц размещения извещения или заключения контракта у ед. поставщика',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'way.way_name',
                header: 'Способ',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'small_business',
                header: 'Осуществление закупки у субъектов малого предпринимательства и социально ориентированных некоммерческих организаций (да или нет)',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'initiator',
                header: 'Инициатор закупки',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'branch.full_name',
                header: 'Филиал',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        header: 'Заключено государственных контрактов, договоров, закуплено продукции на сумму, не превышающую ста тысяч рублей (руб.)',
        columns: [
            {
                accessorKey: 'price_value',
                header: 'В стоимостном выражении (руб.)',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'savings',
                header: 'Экономия по результатам размещения заказа (руб.)',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'contract_number',
                header: '№ Контракта',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'contract_date',
                header: 'Дата Контракта',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'contragent',
                header: 'Контрагент',
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
    {
        id: 'approval-letter',
        columns: [
            {
                accessorKey: 'approval_letter',
                header: 'Письмо согласования/ письмо уведомления (номер и дата)',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'updated_at',
                header: 'Дата внесения изменений',
                cell: ({ row }) => formatIsoDate(row.original.updated_at),
                meta: {
                    rowSpan: 2,
                },
            },
        ],
    },
]
