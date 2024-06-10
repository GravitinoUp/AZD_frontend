import { LoadingSpinner } from '@/components/loaders/spinner.tsx'
import { cn } from '@/shared/lib/cn'

export const PageLoader = ({ className }: { className?: string }) => (
    <div className={cn('flex h-[100%] w-full items-center justify-center', className)}>
        <LoadingSpinner className="h-16 w-16 text-primary" />
    </div>
)
