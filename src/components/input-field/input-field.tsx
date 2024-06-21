import { cn } from '@/shared/lib/cn'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    label?: string
    type?: string
    className?: string
    inputClassName?: string
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(function InputField(
    { type = 'text', label, className, inputClassName, ...props },
    ref
) {
    return (
        <FormItem className={cn('flex flex-45 flex-col items-start', className)}>
            {label && <FormLabel className={props.required ? 'label-required' : ''}>{label}</FormLabel>}
            <FormControl>
                <Input
                    className={cn('h-12 placeholder:text-[#999999]', inputClassName)}
                    type={type}
                    ref={ref}
                    {...props}
                    required={false}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
})
