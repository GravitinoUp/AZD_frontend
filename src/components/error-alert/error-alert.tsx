import { cn } from '@/shared/lib/cn.ts'
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ErrorAlertProps {
    title?: string
    description?: string
    className?: string
}

export const ErrorAlert = ({ title, description, className }: ErrorAlertProps) => {
    const { t } = useTranslation()

    return (
        <Alert variant="destructive" className={cn('flex-center w-fit', className)}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="mb-0">{title || t('error.default')}</AlertTitle>
            {description && <AlertDescription>{description}</AlertDescription>}
        </Alert>
    )
}
