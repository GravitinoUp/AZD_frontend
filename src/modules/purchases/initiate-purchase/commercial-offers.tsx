import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { useTranslation } from 'react-i18next'
import { InputField } from '@/components/input-field'
import { Skeleton } from '@/ui/skeleton'
import { ErrorAlert } from '@/components/error-alert'
import { CommandMultiSelect } from '@/components/command'

export const CommercialOffersTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    const formattedOrganizations = [
        { label: 'O 1', value: 1 },
        { label: 'O 2', value: 2 },
        { label: 'O 3', value: 3 },
    ]

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-col gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="commercial_offer_text"
                    render={({ field }) => <InputField label={t('commercial-offer-text')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="commercial_offers"
                    render={({ field }) => (
                        <FormItem className="flex flex-45 flex-col items-start space-y-2">
                            <FormLabel>{t('send-commercial-offer')}</FormLabel>
                            {false && <Skeleton className="h-12 w-full" />}
                            {false && <ErrorAlert />}
                            {true && !false && (
                                <CommandMultiSelect
                                    selectedValues={field.value ? field.value : []}
                                    setSelectedValues={field.onChange}
                                    items={formattedOrganizations}
                                />
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
