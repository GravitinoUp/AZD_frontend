import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema, productSchema } from '../../initiate-purchase'
import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { FormField, FormItem, FormMessage } from '@/ui/form'
import { Button } from '@/ui/button'
import { ProductItem } from './components/product-item'

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
                                <ProductItem
                                    key={index}
                                    value={value}
                                    onEdit={() => {
                                        setSelectedProduct(value)
                                    }}
                                    onDelete={() => {
                                        if (field.value) {
                                            const newArray = [...field.value]
                                            newArray.splice(index, 1)

                                            field.onChange(newArray)
                                        }
                                    }}
                                />
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
