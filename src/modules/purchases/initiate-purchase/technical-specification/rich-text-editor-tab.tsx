import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from '../initiate-purchase'
import { FormField, FormItem, FormMessage } from '@/ui/form'
import { RichTextEditor } from '@/components/rich-text-editor'
import { useRef } from 'react'

export const RichTextEditorTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const editorRef = useRef<unknown>(null)

    return (
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
    )
}
