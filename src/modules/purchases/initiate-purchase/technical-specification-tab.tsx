import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { RichTextEditorTab } from './technical-specification/rich-text-editor-tab'
import { ProductsTab } from './technical-specification/products-tab'

export const TechnicalSpecificationTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    const technicalSpecificationTabsData = [
        {
            value: 'editor',
            label: t('technical-specification'),
            content: <RichTextEditorTab form={form} />,
        },
        {
            value: 'products',
            label: t('products'),
            content: <ProductsTab form={form} />,
        },
    ]

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">
                <Tabs defaultValue={technicalSpecificationTabsData[0].value} className="w-full">
                    <TabsList className="gap-2">
                        {technicalSpecificationTabsData.map(({ value, label }) => (
                            <TabsTrigger key={value} value={value}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {technicalSpecificationTabsData.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value} className="mt-16">
                            {tab.content}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}
