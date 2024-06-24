import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema, productSchema } from '../../initiate-purchase'
import { FormField } from '@/ui/form'
import { Tabs, TabsContent } from '@/ui/tabs'
import { ManageProductTab } from './manage-product-tab'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { ProductListTab } from './product-list-tab'

export const ProductsTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const [currentTab, setCurrentTab] = useState('product-list')
    const [selectedProduct, setSelectedProduct] = useState<z.infer<typeof productSchema> | false | undefined>(false)

    const tabsData = [
        {
            value: 'product-list',
            content: <ProductListTab form={form} setSelectedProduct={setSelectedProduct} />,
        },
        {
            value: 'manage-product',
            label: '',
            content: (
                <FormField
                    control={form.control}
                    name="products"
                    render={({ field }) => (
                        <ManageProductTab
                            selectedProduct={selectedProduct}
                            onCancel={() => {
                                setCurrentTab('product-list')
                                setSelectedProduct(false)
                            }}
                            onSubmit={(data) => {
                                if (selectedProduct) {
                                    if (field.value) {
                                        field.onChange([
                                            ...field.value.filter((value) => value.product_id !== data.product_id),
                                            data,
                                        ])
                                    }
                                } else {
                                    if (field.value) {
                                        field.onChange([...field.value, { ...data, product_id: field.value.length }])
                                    } else {
                                        field.onChange([{ ...data, product_id: 0 }])
                                    }
                                }

                                setCurrentTab('product-list')
                            }}
                        />
                    )}
                />
            ),
        },
    ]

    useEffect(() => {
        if (selectedProduct !== false) {
            setCurrentTab('manage-product')
        }
    }, [selectedProduct])

    return (
        <Tabs value={currentTab} className="w-full">
            {tabsData.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-16">
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}
