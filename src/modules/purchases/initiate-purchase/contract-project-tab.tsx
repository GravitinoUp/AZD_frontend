import { UseFormReturn } from 'react-hook-form'
import { PurchaseSchema } from './initiate-purchase'
import { useTranslation } from 'react-i18next'
import { FormField, FormItem, FormLabel } from '@/ui/form'
import { MultiFileInput } from '@/components/file-container'
import FileIcon from '@/assets/icons/file.svg'
import { formatFileSize } from '@/shared/lib/format-file-size'
import { Button } from '@/ui/button'

export const ContractProjectTab = ({ form }: { form: UseFormReturn<PurchaseSchema> }) => {
    const { t } = useTranslation()

    return (
        <div className="mt-10 rounded-xl border bg-white">
            <div className="mx-auto flex w-[80%] flex-col gap-x-20 gap-y-10 py-10">
                <FormField
                    control={form.control}
                    name="documents"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                            <FormLabel>{t('action.attach.document')}</FormLabel>
                            <MultiFileInput
                                disabled={field.value.length > 4}
                                selectedFiles={field.value}
                                setSelectedFiles={field.onChange}
                            />
                            {field.value.map(
                                (value, index) =>
                                    value.file && (
                                        <div
                                            key={index}
                                            className="flex w-full items-center justify-between rounded-xl border border-dashed border-secondary-border p-10"
                                        >
                                            <div className="flex items-center gap-4">
                                                <FileIcon />
                                                <div className="flex flex-col items-start font-semibold">
                                                    <p>{value.file.name}</p>
                                                    <p className="font-semibold text-[#BFC4CE]">
                                                        {formatFileSize(value.file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                className="h-[50px] w-[150px] bg-secondary text-destructive"
                                                variant="outline"
                                                type="button"
                                                onClick={() =>
                                                    field.onChange(field.value.filter((item) => item.id !== value.id))
                                                }
                                            >
                                                {t('action.delete')}
                                            </Button>
                                        </div>
                                    )
                            )}
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
