import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { Form } from '../form'

interface ManageLayoutProps<T extends FieldValues> {
    form: UseFormReturn<T>
    handleSubmit: SubmitHandler<T>
    title: string
    actions?: React.ReactNode
    children: React.ReactNode
}

export function ManageLayout<T extends FieldValues>({
    form,
    handleSubmit,
    title,
    actions,
    children,
}: ManageLayoutProps<T>) {
    return (
        <div className="mx-auto w-[95%]">
            <h1 className="mt-20 text-3xl font-bold">{title}</h1>
            <Form form={form} onSubmit={handleSubmit}>
                <div className="flex-center mt-16 gap-3">{actions}</div>
                <div className="mt-10 rounded-xl border bg-white">
                    <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">{children}</div>
                </div>
            </Form>
        </div>
    )
}
