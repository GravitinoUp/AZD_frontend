import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { RichTextEditor } from '@/components/rich-text-editor'
import { FormField } from '@/ui/form'
import { useRef } from 'react'

export const TechnicalSpecificationTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const editorRef = useRef<unknown>(null)

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="technical_specification"
                    render={() => (
                        <RichTextEditor
                            onInit={(_evt: unknown, editor: unknown) => (editorRef.current = editor)}
                            initialValue="<p>This is the initial content of the editor.</p>"
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
            </div>
        </div>
    )
}
