import { cn } from '@/shared/lib/cn'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    label?: string
    type?: string
    prefixIcon?: React.ReactNode
    suffixIcon?: React.ReactNode
    className?: string
    inputClassName?: string
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(function InputField(
    { type = 'text', label, prefixIcon, suffixIcon, className, inputClassName, ...props },
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
                    prefixIcon={prefixIcon && <div className="flex items-center justify-center pl-3">{prefixIcon}</div>}
                    suffixIcon={suffixIcon}
                    {...props}
                    required={false}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
})
