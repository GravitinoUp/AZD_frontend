import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from '../initiate-purchase'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/ui/button'
import { LucideTrash2, Plus } from 'lucide-react'
import { InputField } from '@/components/input-field'

export const ProductsTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    return (
        <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start gap-4">
                    <div className="flex items-center gap-2">
                        <FormLabel>{t('products')}</FormLabel>
                        <Button
                            className="h-8 w-8"
                            size="icon"
                            type="button"
                            onClick={() => {
                                if (field.value) {
                                    field.onChange([
                                        ...field.value,
                                        {
                                            product_id: field.value?.length,
                                            product_name: '',
                                            code: '',
                                            properties: [],
                                            product_count: 0,
                                        },
                                    ])
                                } else {
                                    field.onChange([
                                        {
                                            product_id: 1,
                                            product_name: '',
                                            code: '',
                                            properties: [],
                                            product_count: 0,
                                        },
                                    ])
                                }
                            }}
                        >
                            <Plus />
                        </Button>
                    </div>
                    {!field.value || (field.value.length === 0 && <p>{t('empty-product-list')}</p>)}
                    {field.value &&
                        field.value.map((product, productIndex) => (
                            <div key={productIndex} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <InputField
                                        className="h-10 w-full max-w-[250px]"
                                        placeholder={t('product-name')}
                                        value={product.product_name}
                                        onChange={(e) => {
                                            if (field.value) {
                                                const newArray = [...field.value]
                                                newArray[productIndex].product_name = e.target.value

                                                field.onChange(newArray)
                                            }
                                        }}
                                        required
                                    />
                                    <InputField
                                        className="h-10 w-full max-w-[150px]"
                                        placeholder={t('code')}
                                        value={product.code}
                                        onChange={(e) => {
                                            if (field.value) {
                                                const newArray = [...field.value]
                                                newArray[productIndex].code = e.target.value

                                                field.onChange(newArray)
                                            }
                                        }}
                                        required
                                    />
                                    <InputField
                                        className="h-10 w-full max-w-[80px]"
                                        placeholder={t('count')}
                                        value={product.product_count}
                                        onChange={(e) => {
                                            if (field.value) {
                                                const newArray = [...field.value]
                                                newArray[productIndex].product_count = e.target.value

                                                field.onChange(newArray)
                                            }
                                        }}
                                        required
                                    />
                                    <Button
                                        className="h-8 min-h-8 w-8 min-w-8"
                                        size="icon"
                                        type="button"
                                        onClick={() => {
                                            if (field.value) {
                                                const newArray = [...field.value]
                                                newArray[productIndex].properties.push({
                                                    property_name: '',
                                                    property_value: '',
                                                    property_measurement: '',
                                                })

                                                field.onChange(newArray)
                                            }
                                        }}
                                    >
                                        <Plus />
                                    </Button>
                                    <Button
                                        className="h-8 min-h-8 w-8 min-w-8"
                                        size="icon"
                                        type="button"
                                        onClick={() => {
                                            if (field.value) {
                                                const newArray = [...field.value]
                                                newArray.splice(productIndex, 1)

                                                field.onChange(newArray)
                                            }
                                        }}
                                    >
                                        <LucideTrash2 size={18} />
                                    </Button>
                                </div>
                                {product.properties.map((property, propertyIndex) => (
                                    <div key={propertyIndex} className="ml-10 flex items-center gap-2">
                                        <InputField
                                            className="h-10"
                                            placeholder={t('property-name')}
                                            value={property.property_name}
                                            onChange={(e) => {
                                                if (field.value) {
                                                    const newArray = [...field.value]
                                                    newArray[productIndex].properties[propertyIndex].property_name =
                                                        e.target.value

                                                    field.onChange(newArray)
                                                }
                                            }}
                                            required
                                        />
                                        <InputField
                                            className="h-10"
                                            placeholder={t('property-value')}
                                            value={property.property_value}
                                            onChange={(e) => {
                                                if (field.value) {
                                                    const newArray = [...field.value]
                                                    newArray[productIndex].properties[propertyIndex].property_value =
                                                        e.target.value

                                                    field.onChange(newArray)
                                                }
                                            }}
                                            required
                                        />
                                        <InputField
                                            className="h-10"
                                            placeholder={t('property-measurement')}
                                            value={property.property_measurement}
                                            onChange={(e) => {
                                                if (field.value) {
                                                    const newArray = [...field.value]
                                                    newArray[productIndex].properties[
                                                        propertyIndex
                                                    ].property_measurement = e.target.value

                                                    field.onChange(newArray)
                                                }
                                            }}
                                            required
                                        />
                                        <Button
                                            className="h-8 min-h-8 w-8 min-w-8"
                                            size="icon"
                                            type="button"
                                            onClick={() => {
                                                if (field.value) {
                                                    const newArray = [...field.value]
                                                    newArray[productIndex].properties.splice(propertyIndex, 1)

                                                    field.onChange(newArray)
                                                }
                                            }}
                                        >
                                            <LucideTrash2 size={18} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
