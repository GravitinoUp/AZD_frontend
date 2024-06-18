import { cn } from '@/shared/lib/cn'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Textarea } from '@/ui/textarea'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
    label?: string
    className?: string
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaProps>(function InputField(
    { label, className, ...props },
    ref
) {
    return (
        <FormItem className={cn('flex flex-45 flex-col items-start', className)}>
            {label && <FormLabel className={props.required ? 'label-required' : ''}>{label}</FormLabel>}
            <FormControl>
                <Textarea ref={ref} {...props} required={false} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
})
