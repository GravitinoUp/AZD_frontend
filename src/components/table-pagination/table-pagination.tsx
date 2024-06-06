import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { useState } from 'react'

const ITEMS_PER_PAGE_LIST = [10, 20, 30, 40, 50]

export const TablePagination = () => {
    const [pageSize, setPageSize] = useState(String(ITEMS_PER_PAGE_LIST[0]))

    return (
        <div className="mt-6 flex items-center">
            <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="h-9 w-[80px] items-start rounded-[20px] border-table px-4">
                    <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                    {ITEMS_PER_PAGE_LIST.map((pageSize) => (
                        <SelectItem key={pageSize} value={String(pageSize)}>
                            {pageSize}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Pagination className="justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
