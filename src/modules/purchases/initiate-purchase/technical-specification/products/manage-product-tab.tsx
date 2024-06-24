import { Form, useForm } from '@/components/form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { FormField } from '@/ui/form'
import { InputField } from '@/components/input-field'
import { Button } from '@/ui/button'
import { LucideTrash2, Plus } from 'lucide-react'
import { productSchema } from '../../initiate-purchase'

interface ManageProductTabProps {
    selectedProduct?: z.infer<typeof productSchema> | false
    onSubmit: (data: z.infer<typeof productSchema>) => void
    onCancel: () => void
}

export const ManageProductTab = ({ selectedProduct, onSubmit, onCancel }: ManageProductTabProps) => {
    const { t } = useTranslation()

    const productForm = useForm({
        schema: productSchema,
        defaultValues: selectedProduct
            ? { ...selectedProduct }
            : {
                  product_name: '',
                  code: '',
                  product_measurement: '',
                  product_count: '',
                  properties: [],
              },
    })

    return (
        <Form form={productForm} onSubmit={() => void 0}>
            <div className="flex flex-wrap gap-6">
                <FormField
                    control={productForm.control}
                    name="product_name"
                    render={({ field }) => <InputField label={t('product-name')} required {...field} />}
                />
                <FormField
                    control={productForm.control}
                    name="code"
                    render={({ field }) => <InputField label={t('product-code')} required {...field} />}
                />
                <FormField
                    control={productForm.control}
                    name="product_measurement"
                    render={({ field }) => <InputField label={t('measurement')} required {...field} />}
                />
                <FormField
                    control={productForm.control}
                    name="product_count"
                    render={({ field }) => <InputField label={t('count')} required {...field} />}
                />
            </div>
            <FormField
                control={productForm.control}
                name="properties"
                render={({ field }) => (
                    <>
                        <div className="flex-center gap-2">
                            <p className="my-10 font-bold">{t('properties')}</p>
                            <Button
                                className="h-8 min-h-8 w-8 min-w-8"
                                size="icon"
                                type="button"
                                onClick={() => {
                                    if (field.value) {
                                        const newArray = [...field.value]
                                        newArray.push({
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
                        </div>
                        <div className="flex flex-col gap-4 p-3">
                            {field.value.length === 0 && <p>{t('empty-property-list')}</p>}
                            {field.value.map((property, propertyIndex) => (
                                <div key={propertyIndex} className="flex items-center gap-2">
                                    <div className="flex w-full items-center gap-2 rounded-md border p-3">
                                        <InputField
                                            label={t('property-name')}
                                            placeholder={t('property-name')}
                                            value={property.property_name}
                                            onChange={(e) => {
                                                if (field.value) {
                                                    const newArray = [...field.value]
                                                    newArray[propertyIndex].property_name = e.target.value

                                                    field.onChange(newArray)
                                                }
                                            }}
                                            required
                                        />
                                        <InputField
                                            label={t('property-value')}
                                            placeholder={t('property-value')}
                                            value={property.property_value}
                                            onChange={(e) => {
                                                if (field.value) {
                                                    const newArray = [...field.value]
                                                    newArray[propertyIndex].property_value = e.target.value

                                                    field.onChange(newArray)
                                                }
                                            }}
                                            required
                                        />
                                        <InputField
                                            label={t('property-measurement')}
                                            placeholder={t('property-measurement')}
                                            value={property.property_measurement}
                                            onChange={(e) => {
                                                if (field.value) {
                                                    const newArray = [...field.value]
                                                    newArray[propertyIndex].property_measurement = e.target.value

                                                    field.onChange(newArray)
                                                }
                                            }}
                                            required
                                        />
                                    </div>
                                    <Button
                                        className="h-8 min-h-8 w-8 min-w-8"
                                        size="icon"
                                        type="button"
                                        onClick={() => {
                                            if (field.value) {
                                                const newArray = [...field.value]
                                                newArray.splice(propertyIndex, 1)

                                                field.onChange(newArray)
                                            }
                                        }}
                                    >
                                        <LucideTrash2 size={18} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            />
            <div className="flex-center mt-10 gap-2">
                <Button
                    className="h-[50px] w-[200px]"
                    type="button"
                    onClick={() => {
                        onSubmit(productForm.getValues())
                    }}
                >
                    {t('action.save')}
                </Button>
                <Button variant="outline" className="h-[50px] w-[200px]" type="button" onClick={onCancel}>
                    {t('action.cancel')}
                </Button>
            </div>
        </Form>
    )
}
