import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { FormField } from '@/ui/form'
import { InputField } from '@/components/input-field'
import { Button } from '@/ui/button'
import { useTranslation } from 'react-i18next'

export const StartMaxPriceTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-col gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="commercial_offers"
                    render={({ field }) => (
                        <>
                            {field.value.map((value, index) => (
                                <InputField
                                    key={index}
                                    label={value.short_name}
                                    required
                                    value={value.price}
                                    onChange={(e) => {
                                        const newArray = [...field.value]
                                        newArray[index].price = e.target.value

                                        field.onChange(newArray)
                                        form.setValue('need_update', true)
                                    }}
                                />
                            ))}
                        </>
                    )}
                />
                <Button className="h-[50px] w-[200px] self-start">{t('action.calculate')}</Button>
                <FormField
                    control={form.control}
                    name="start_max_price"
                    render={({ field }) => (
                        <div className="flex items-baseline gap-2 font-bold">
                            <p className="text-nowrap">{t('start-max-price')}</p>
                            <div className="h-[1px] w-full bg-tabs-content" />
                            <p className="text-nowrap">{field.value}</p>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}
