import { ErrorResponse } from '@/types/fetch'
import { ToastAction } from '@/ui/toast'
import { useToast } from '@/ui/use-toast'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const ERROR_DURATION = 3000

export const useErrorToast = (error?: Error | null, repeatFn?: () => void) => {
    const { toast } = useToast()
    const { t } = useTranslation()

    useEffect(() => {
        if (error) {
            const axiosError = error as AxiosError
            const errorResponse = axiosError.response?.data as ErrorResponse

            toast({
                variant: 'destructive',
                title: t('error.title'),
                description: errorResponse.message ? errorResponse.message : '',
                duration: ERROR_DURATION,
                action:
                    typeof repeatFn === 'undefined' ? (
                        void 0
                    ) : (
                        <ToastAction altText={t('error.default')} onClick={repeatFn}>
                            {t('error.default')}
                        </ToastAction>
                    ),
            })
        }
    }, [error, toast])
}
