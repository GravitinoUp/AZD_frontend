import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { useTranslation } from 'react-i18next'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { InputField } from '@/components/input-field'
import { placeholderQuery } from '@/shared/constants'
import { useGetAllOrganizations } from '@/modules/organizations/all-organizations/api/use-get-all-organizations'
import { Skeleton } from '@/ui/skeleton'
import { ErrorAlert } from '@/components/error-alert'
import { CommandSelect } from '@/components/command'

export const ContractExecutionTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    const {
        data: executors = { count: 0, data: [] },
        isFetching: executorsFetching,
        isSuccess: executorsSuccess,
        error: executorsError,
    } = useGetAllOrganizations(placeholderQuery)
    const formattedExecutors = executors.data.map((value) => ({
        value: value.organization_uuid,
        label: value.short_name,
    }))

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => <InputField type="date" label={t('start-date')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => <InputField type="date" label={t('end-date')} required {...field} />}
                />
                <FormField
                    control={form.control}
                    name="executor_uuid"
                    render={({ field }) => (
                        <FormItem className="flex flex-45 flex-col items-start space-y-2">
                            <FormLabel className="label-required">{t('executor')}</FormLabel>
                            {executorsFetching && <Skeleton className="h-12 w-full" />}
                            {executorsError && <ErrorAlert className="h-[46px]" />}
                            {executorsSuccess && !executorsFetching && (
                                <CommandSelect
                                    selectedValue={field.value ? field.value : ''}
                                    setSelectedValue={field.onChange}
                                    items={formattedExecutors}
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
