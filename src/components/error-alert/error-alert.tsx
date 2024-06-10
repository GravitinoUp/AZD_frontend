import { useTranslation } from 'react-i18next'

interface ErrorAlertProps {
    error?: string
}

export const ErrorAlert = ({ error }: ErrorAlertProps) => {
    const { t } = useTranslation()

    return (
        <div className="flex-center h-12 w-full rounded-md border text-destructive">
            {error ? error : t('error.default')}
        </div>
    )
}
