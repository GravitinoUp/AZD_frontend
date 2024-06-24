import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    label?: string
    id: string
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    ({ label, id, className, ...props }, ref) => (
        <div className="flex select-none items-center">
            <CheckboxPrimitive.Root
                ref={ref}
                className={cn(
                    'peer flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
                    className
                )}
                id={id}
                {...props}
            >
                <CheckboxPrimitive.Indicator>
                    <Check className="h-4 w-4" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            {label && (
                <label className="pl-3 text-start" htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    )
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
