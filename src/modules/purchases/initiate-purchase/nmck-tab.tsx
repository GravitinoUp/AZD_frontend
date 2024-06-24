import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { FormField } from '@/ui/form'
import { InputField } from '@/components/input-field'
import { Button } from '@/ui/button'
import { t } from 'i18next'

export const NMCKTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => (
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
                                }}
                            />
                        ))}
                    </>
                )}
            />
            <Button className="h-[50px] w-[200px] self-start">{t('action.calculate')}</Button>
            <div className="flex items-baseline gap-2 font-bold">
                <p className="text-nowrap">НМЦК, руб.</p>
                <div className="h-[1px] w-full bg-tabs-content" />
                <p className="text-nowrap">2 800 000,00 руб.</p>
            </div>
        </div>
    </div>
)
