import { useToast } from '@/ui/use-toast'
import { useEffect } from 'react'

const SUCCESS_DURATION = 1500

export const useSuccessToast = (successMsg: string, isSuccess: boolean, onSuccess?: () => void) => {
    const { toast } = useToast()

    useEffect(() => {
        if (isSuccess) {
            toast({
                description: successMsg,
                duration: SUCCESS_DURATION,
            })

            if (typeof onSuccess !== 'undefined') {
                onSuccess()
            }
        }
    }, [isSuccess, toast])
}
