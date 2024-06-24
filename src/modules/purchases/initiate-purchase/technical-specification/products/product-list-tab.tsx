import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema, productSchema } from '../../initiate-purchase'
import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { FormField, FormItem, FormMessage } from '@/ui/form'
import { Button } from '@/ui/button'
import PenAltIcon from '@/assets/icons/pen_alt.svg'
import MinusIcon from '@/assets/icons/minus.svg'

export const ProductListTab = ({
    form,
    setSelectedProduct,
}: {
    form: UseFormReturn<PurchaseSchema>
    setSelectedProduct: Dispatch<SetStateAction<z.infer<typeof productSchema> | false | undefined>>
}) => {
    const { t } = useTranslation()

    return (
        <>
            <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                    <FormItem className="flex w-full flex-col items-start gap-6">
                        {!field.value || (field.value.length === 0 && <p>{t('empty-product-list')}</p>)}
                        {field.value &&
                            field.value.map((value, index) => (
                                <div
                                    key={index}
                                    className="flex w-full items-center justify-between rounded-xl px-6 py-4 shadow-md"
                                >
                                    <p className="font-semibold">
                                        {value.product_name} ({value.product_count} {value.product_measurement})
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            className="h-8 w-8 border border-table"
                                            type="button"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedProduct(value)
                                            }}
                                        >
                                            <PenAltIcon />
                                        </Button>
                                        <Button
                                            className="h-8 w-8 border border-table bg-muted hover:bg-muted/50"
                                            type="button"
                                            size="icon"
                                            onClick={() => {
                                                if (field.value) {
                                                    const newArray = [...field.value]
                                                    newArray.splice(index, 1)

                                                    field.onChange(newArray)
                                                }
                                            }}
                                        >
                                            <MinusIcon />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button className="mt-10 h-[50px] w-[200px]" type="button" onClick={() => setSelectedProduct(undefined)}>
                {t('action.add')}
            </Button>
        </>
    )
}
