import { useTranslation } from 'react-i18next'
import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'

export const TechnicalSpecificationTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10"></div>
        </div>
    )
}
