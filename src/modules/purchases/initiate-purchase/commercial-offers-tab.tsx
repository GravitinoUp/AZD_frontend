import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { useTranslation } from 'react-i18next'
import { TextareaField } from '@/components/input-field'
import { Skeleton } from '@/ui/skeleton'
import { ErrorAlert } from '@/components/error-alert'
import { CommandMultiSelect } from '@/components/command'
import { useGetAllOrganizations } from '@/modules/organizations/all-organizations/api/use-get-all-organizations'
import { placeholderQuery } from '@/shared/constants'

export const CommercialOffersTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    const {
        data: organizations = { count: 0, data: [] },
        isFetching,
        isError,
        isSuccess,
    } = useGetAllOrganizations(placeholderQuery)
    const formattedOrganizations = organizations.data.map((value) => ({
        label: value.short_name,
        value: value.organization_uuid,
    }))

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-col gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="commercial_offer_text"
                    render={({ field }) => <TextareaField label={t('commercial-offer-text')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="commercial_offers"
                    render={({ field }) => (
                        <FormItem className="flex flex-45 flex-col items-start space-y-2">
                            <FormLabel>{t('send-commercial-offer')}</FormLabel>
                            {isFetching && <Skeleton className="h-12 w-full" />}
                            {isError && <ErrorAlert />}
                            {isSuccess && !isFetching && (
                                <CommandMultiSelect
                                    selectedValues={
                                        field.value ? field.value.map((value) => value.organization_uuid) : []
                                    }
                                    setSelectedValues={(newValues) => {
                                        field.onChange(
                                            newValues.map((value) => ({
                                                organization_uuid: value,
                                                short_name: formattedOrganizations.find((o) => o.value === value)
                                                    ?.label,
                                                price: '0',
                                            }))
                                        )
                                    }}
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
