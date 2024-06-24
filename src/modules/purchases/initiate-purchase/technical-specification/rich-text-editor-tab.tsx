import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from '../initiate-purchase'
import { FormField, FormItem, FormMessage } from '@/ui/form'
import { RichTextEditor } from '@/components/rich-text-editor'
import { useEffect, useRef } from 'react'

export const RichTextEditorTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const editorRef = useRef<unknown>(null)

    useEffect(() => {
        console.log(editorRef)
    }, [editorRef])

    return (
        <FormField
            control={form.control}
            name="technical_specification"
            render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                    <RichTextEditor
                        onInit={(_evt: unknown, editor: unknown) => {
                            editorRef.current = editor
                        }}
                        onChange={(e: { target: { getContent: () => string } }) => {
                            field.onChange(e.target.getContent())
                        }}
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
