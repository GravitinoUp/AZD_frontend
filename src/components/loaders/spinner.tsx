import { cn } from '@/shared/lib/cn'
import { Loader2 } from 'lucide-react'

export const LoadingSpinner = ({ className }: { className?: string }) => (
    <Loader2 className={cn('animate-spin', className)} />
)
