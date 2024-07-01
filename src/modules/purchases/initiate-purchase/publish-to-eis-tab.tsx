import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PurchaseSchema } from './initiate-purchase'
import WarningIcon from '@/assets/icons/warning.svg'
import { Button } from '@/ui/button'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'

export const PublishToEISTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    const errors = Object.entries(form.formState.errors)

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-col items-start gap-x-20 gap-y-4 py-10">
                <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">{t('publish-to-eis-description')}</p>
                    <Button className="h-12 select-none gap-4" disabled={errors.length > 0}>
                        <PlusCircleIcon />
                        {t('action.check.and.publish')}
                    </Button>
                </div>
                {errors.length > 0 && (
                    <div className="flex w-full flex-col items-start gap-1 rounded-[10px] border border-destructive bg-destructive-light p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <WarningIcon />
                            <p className="font-semibold">{t('error.form')}</p>
                        </div>
                        {errors.map((value, index) => (
                            <p key={index}>
                                <span className="font-semibold text-destructive">
                                    {t(value[0].replaceAll('_', '-'))}:
                                </span>{' '}
                                {value[1].message}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
