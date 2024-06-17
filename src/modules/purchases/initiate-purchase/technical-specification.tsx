import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { RichTextEditor } from '@/components/rich-text-editor'
import { FormField } from '@/ui/form'

export const TechnicalSpecificationTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => (
    <div className="mt-10 rounded-xl border bg-white">
        <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">
            <FormField control={form.control} name="technical_specification" render={() => <RichTextEditor />} />
        </div>
    </div>
)
