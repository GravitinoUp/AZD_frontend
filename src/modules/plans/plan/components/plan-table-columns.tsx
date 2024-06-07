import { formatIsoDate } from '@/shared/lib/format-iso-date.ts'
import { Plan } from '@/types/plans.ts'
import { ColumnDef } from '@tanstack/react-table'

export const planTableColumns: ColumnDef<Plan>[] = [
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
                // purchase_identification_code
                accessorKey: 'purchase_uuid',
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
                // okpd.okpd_code okpd.okpd_name
                accessorKey: 'okpd_code',
                header: 'Общероссийскому классификатору продукции по видам экономической деятельности ОК 034-2014 (КПЕС 2008)',
                meta: {
                    rowSpan: 2,
                },
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
                // TODO: убрать хардкод в годах
                header: 'На текущий финансовый год  (2023 год)',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                header: 'На плановый период',
                columns: [
                    {
                        accessorKey: 'first_year_limit',
                        header: 'На первый год (2024 год)',
                    },
                    {
                        accessorKey: 'second_year_limit',
                        header: 'На второй год (2025 год)',
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
                accessorKey: 'public_purchase_discussion',
                header: 'Информация о проведении обязательного общественного обсуждения закупки',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'authorized_institution',
                header: 'Наименование уполномоченного органа (учреждения)',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'organizer_name',
                header: 'Наименование организатора проведения совместного конкурса или аукциона',
                meta: {
                    rowSpan: 2,
                },
            },
            {
                accessorKey: 'placement_month',
                header: 'Месяц размещения извещения или заключения контракта у ед. поставщика',
                meta: {
                    rowSpan: 2,
                },
            },
            // way.way_name
            {
                accessorKey: 'way_id',
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
