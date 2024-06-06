import { TablePagination } from '@/components/table-pagination/table-pagination.tsx'
import { cn } from '@/shared/lib/cn.ts'
import { ScrollArea, ScrollBar } from '@/ui/scroll-area.tsx'
import { Skeleton } from '@/ui/skeleton.tsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table.tsx'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo } from 'react'

const SKELETON_ITEMS_COUNT = 10

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
    withBackground?: boolean
    onRowClick?: (rowData: TData) => void
    className?: string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    withBackground,
    onRowClick,
    className,
}: DataTableProps<TData, TValue>) {
    const tableData = useMemo(() => (isLoading ? Array(SKELETON_ITEMS_COUNT).fill({}) : data), [isLoading, data])

    const tableColumns = useMemo(
        () =>
            isLoading
                ? columns.map((column) => ({
                      ...column,
                      cell: () => <Skeleton className="h-6 w-[100px]" />,
                  }))
                : columns,
        [isLoading, columns]
    )

    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    })

    return (
        <>
            <div className={cn(withBackground && 'rounded-[10px] border border-table py-5', className)}>
                <ScrollArea type="always" className="w-full">
                    <Table className="mx-4 w-[calc(100%-2rem)]">
                        <TableHeader className="bg-secondary">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        const rowSpan = header.column.columnDef.meta?.rowSpan

                                        if (
                                            !header.isPlaceholder &&
                                            rowSpan !== undefined &&
                                            header.id === header.column.id
                                        ) {
                                            return null
                                        }

                                        return (
                                            <TableHead
                                                key={header.id}
                                                className="border text-center font-bold text-primary"
                                                colSpan={header.colSpan}
                                                rowSpan={rowSpan}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        className="border-none hover:bg-white"
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                        onClick={(e) => {
                                            const clickedColumnId = (e.target as HTMLTableRowElement).getAttribute(
                                                'data-column-id'
                                            )

                                            if (
                                                typeof onRowClick !== 'undefined' &&
                                                clickedColumnId !== null &&
                                                !isLoading
                                            ) {
                                                onRowClick(row.original)
                                            }
                                        }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} data-column-id={cell.column.id} style={{ width: cell.column.getSize() }}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Ничего не найдено
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" className="text-red-400" />
                </ScrollArea>
            </div>
            <TablePagination />
        </>
    )
}
