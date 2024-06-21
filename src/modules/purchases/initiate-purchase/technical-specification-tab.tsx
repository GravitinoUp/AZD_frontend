import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { RichTextEditor } from '@/components/rich-text-editor'
import { FormField, FormItem, FormMessage } from '@/ui/form'
import { useRef } from 'react'
import { DataTable } from '@/components/data-table'
import { productColumns } from './components/product-columns'
import { Button } from '@/ui/button'
import { Plus } from 'lucide-react'

export const TechnicalSpecificationTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const editorRef = useRef<unknown>(null)

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="technical_specification"
                    render={() => (
                        <FormItem className="flex w-full flex-col items-start">
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="products"
                    render={({ field }) => (
                        <FormItem className="mx-auto w-full">
                            <DataTable
                                columns={productColumns}
                                data={field.value ? field.value : []}
                                setData={field.onChange}
                                withBackground
                            />
                            <div className="flex w-full justify-end">
                                <Button
                                    type="button"
                                    size="icon"
                                    onClick={() => {
                                        const newItem = {
                                            product_id: 1,
                                            product_name: 'name',
                                            code: 'code',
                                            property_name: 'name',
                                            property_value: 'value',
                                            property_measurement: 'measurement',
                                            product_count: 0,
                                        }
                                        field.onChange(field.value ? [...field.value, newItem] : [newItem])
                                    }}
                                >
                                    <Plus />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
