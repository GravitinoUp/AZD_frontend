import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { FormField } from '@/ui/form'
import { InputField } from '@/components/input-field'

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
        </div>
    </div>
)
