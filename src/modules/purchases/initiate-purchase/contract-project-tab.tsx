import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { useTranslation } from 'react-i18next'
import { FormField, FormItem, FormLabel } from '@/ui/form'
import { FileContainer } from '@/components/file-container'

export const ContractProjectTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-col gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="document"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                            <FormLabel>{t('action.attach.document')}</FormLabel>
                            <FileContainer selectedFile={field.value} setSelectedFile={field.onChange} />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
