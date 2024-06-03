import { RecursivePartial } from '@/shared/lib/recursive-partial'

interface OffsetInterface {
    count: number
    page: number
}

interface QueryInterface {
    offset: OffsetInterface
}

interface PeriodInterface {
    date_start: string
    date_end: string
}

export interface ResultInterface<T = void> {
    status: boolean
    data?: T
}

export interface DataInterface<T> {
    count: number
    data: T
}

export interface PayloadInterface<FilterType, SortType> extends QueryInterface {
    filter: RecursivePartial<FilterType>
    sorts: SortType
    period?: PeriodInterface
}
