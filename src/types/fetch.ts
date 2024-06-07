import { RecursivePartial } from '@/shared/lib/recursive-partial.ts'

interface Offset {
    count: number
    page: number
}

interface Query {
    offset: Offset
}

interface Period {
    date_start: string
    date_end: string
}

export interface Result<T = void> {
    status: boolean
    data?: T
}

export interface Data<T> {
    count: number
    data: T
}

export interface Payload<FilterType, SortType> extends Query {
    filter: RecursivePartial<FilterType>
    sorts: SortType
    period?: Period
}

export type SortOptions = 'ASC' | 'DESC' | null | undefined

export interface ErrorResponse {
    message: string
    url: string
    method: string
    error: string
    statusCode: number
}