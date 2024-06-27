import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PurchaseSchema } from './initiate-purchase'

export const PublishToEISTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-col items-start gap-x-20 gap-y-4 py-10">
                <p className="text-lg font-semibold">Ошибки в форме закупки</p>
                <div className="flex flex-col items-start gap-1">
                    {Object.entries(form.formState.errors).map((value, index) => (
                        <p key={index}>
                            <span className="font-semibold text-destructive">{t(value[0].replaceAll('_', '-'))}:</span>{' '}
                            {value[1].message}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
