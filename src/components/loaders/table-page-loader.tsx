import { Skeleton } from '@/ui/skeleton'

export const TablePageLoader = () => (
    <div className="mx-auto w-[95%]">
        <div className="flex-center mt-20 gap-4">
            <Skeleton className="h-9 w-[250px] rounded-xl" />
            <Skeleton className="h-7 w-7 rounded-full" />
        </div>
        <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <Skeleton className="h-7 w-[60px] rounded-2xl" />
                <Skeleton className="h-3 w-3 rounded-2xl" />
                <Skeleton className="h-7 w-[60px] rounded-2xl" />
            </div>
            <div className="flex gap-3">
                <Skeleton className="h-10 w-[120px]" />
                <Skeleton className="h-10 w-[120px]" />
            </div>
        </div>
        <Skeleton className="my-6 h-10 w-full rounded-[10px]" />
        <Skeleton className="mb-10 mt-7 h-[391px] w-full rounded-[10px]" />
        <div className="flex justify-between">
            <Skeleton className="h-9 w-[76.94px] rounded-full" />
            <div className="flex items-center gap-1">
                <Skeleton className="h-10 w-[67.48px] rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-10 w-[76.19px] rounded-xl" />
            </div>
        </div>
    </div>
)
