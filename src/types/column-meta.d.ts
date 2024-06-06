import { ColumnMeta } from '@tanstack/react-table'

// Extend ColumnMeta to include rowSpan
declare module '@tanstack/react-table' {
    export interface ColumnMeta<TData, TValue> extends ColumnMeta {
        rowSpan?: number
    }
}
