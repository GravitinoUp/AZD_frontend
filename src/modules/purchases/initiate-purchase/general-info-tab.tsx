import { CommandSelect } from '@/components/command'
import { ErrorAlert } from '@/components/error-alert'
import { InputField } from '@/components/input-field'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Skeleton } from '@/ui/skeleton'
import { useTranslation } from 'react-i18next'
import { useGetAllPurchaseTypes } from './api/use-get-all-purchase-types'
import { placeholderQuery } from '@/shared/constants'
import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { Checkbox } from '@/ui/checkbox'

export const GeneralInfoTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    const {
        data: purchaseTypes = [],
        isFetching: purchaseTypesFetching,
        isSuccess: purchaseTypesSuccess,
        error: purchaseTypesError,
    } = useGetAllPurchaseTypes(placeholderQuery)
    const formattedRoles = purchaseTypes.map((value) => ({
        value: value.purchase_type_id,
        label: value.purchase_type_name,
    }))

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="purchase_name"
                    render={({ field }) => <InputField label={t('name')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="purchase_type_id"
                    render={({ field }) => (
                        <FormItem className="flex flex-45 flex-col items-start space-y-2">
                            <FormLabel className="label-required">{t('purchase-type')}</FormLabel>
                            {purchaseTypesFetching && <Skeleton className="h-12 w-full" />}
                            {purchaseTypesError && <ErrorAlert />}
                            {purchaseTypesSuccess && !purchaseTypesFetching && (
                                <CommandSelect
                                    selectedValue={field.value ? field.value : 0}
                                    setSelectedValue={(value) => field.onChange(value !== '' ? value : 0)}
                                    items={formattedRoles}
                                />
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="delivery_address"
                    render={({ field }) => <InputField label={t('delivery-address')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="currency_code"
                    render={({ field }) => <InputField label={t('currency-code')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="quality_guarantee_period"
                    render={({ field }) => <InputField label={t('quality-guarantee-period')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="manufacturer_guarantee"
                    render={({ field }) => <InputField label={t('manufacturer-guarantee')} {...field} />}
                />
                <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => <InputField type="date" label={t('start-date')} {...field} />}
                />
                <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => <InputField type="date" label={t('end-date')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="application_enforcement"
                    render={({ field }) => <InputField label={t('application-enforcement')} {...field} />}
                />
                <FormField
                    control={form.control}
                    name="contract_enforcement"
                    render={({ field }) => <InputField label={t('contract-enforcement')} {...field} />}
                />
                <FormField
                    control={form.control}
                    name="warranty_obligations_enforcement"
                    render={({ field }) => <InputField label={t('warranty-obligations-enforcement')} {...field} />}
                />
                <FormField
                    control={form.control}
                    name="additional_info"
                    render={({ field }) => <InputField label={t('additional-info')} {...field} />}
                />
                <FormField
                    control={form.control}
                    name="is_organization_fund"
                    render={({ field }) => (
                        <Checkbox
                            id="is_organization_fund"
                            label={t('is-organization-fund')}
                            checked={field.value}
                            onCheckedChange={(value) => field.onChange(value)}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="is_unilateral_refusal"
                    render={({ field }) => (
                        <Checkbox
                            id="is_unilateral_refusal"
                            label={t('is-unilateral-refusal')}
                            checked={field.value}
                            onCheckedChange={(value) => field.onChange(value)}
                        />
                    )}
                />
            </div>
        </div>
    )
}
