import * as React from 'react'

import { cn } from '@/shared/lib/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    prefixIcon?: React.ReactNode
    suffixIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, prefixIcon, suffixIcon, ...props }, ref) => (
        <div
            className={cn(
                'input-outline flex h-10 w-full rounded-md border border-input focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary',
                className
            )}
        >
            {prefixIcon}
            <input
                type={type}
                className={cn(
                    'rounded-inherit w-full bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                )}
                ref={ref}
                {...props}
            />
            {suffixIcon}
        </div>
    )
)
Input.displayName = 'Input'

export { Input }
