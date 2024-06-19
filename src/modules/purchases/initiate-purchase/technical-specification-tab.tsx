import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { RichTextEditor } from '@/components/rich-text-editor'
import { FormField } from '@/ui/form'
import { useRef, useState } from 'react'
import { DataTable } from '@/components/data-table'
import { productColumns } from './components/product-columns'
import { Product } from '@/types/product'
import { Button } from '@/ui/button'
import { Plus } from 'lucide-react'

export const TechnicalSpecificationTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const editorRef = useRef<unknown>(null)

    const [productData, setProductData] = useState<Product[]>([])

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="technical_specification"
                    render={() => (
                        <RichTextEditor
                            onInit={(_evt: unknown, editor: unknown) => (editorRef.current = editor)}
                            init={{
                                width: '100%',
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist',
                                    'anchor',
                                    'autolink',
                                    'help',
                                    'image',
                                    'link',
                                    'lists',
                                    'searchreplace',
                                    'table',
                                    'wordcount',
                                ],
                                toolbar:
                                    'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                    )}
                />
                <DataTable className="w-full" columns={productColumns} data={productData} withBackground />
                <div className="flex w-full justify-end">
                    <Button
                        type="button"
                        size="icon"
                        onClick={() =>
                            setProductData([
                                ...productData,
                                {
                                    product_id: 1,
                                    product_name: 'name',
                                    code: 'code',
                                    property_name: 'name',
                                    property_value: 'value',
                                    property_measurement: 'measurement',
                                    product_count: 0,
                                },
                            ])
                        }
                    >
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    )
}
