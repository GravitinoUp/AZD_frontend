import SearchIcon from '@/assets/icons/search.svg'
import i18next from '@/shared/i18n/i18n.ts'
import { cn } from '@/shared/lib/cn.ts'
import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useState } from 'react'

type DebouncedInputProps = {
    value: string | number
    placeholder?: string
    onChange: (value: string | number) => void
    debounce?: number
    className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export const DebouncedInput: FC<DebouncedInputProps> = ({
    value: initialValue,
    placeholder = i18next.t('placeholder.search'),
    onChange,
    debounce = 500,
    className,
    ...props
}) => {
    const [value, setValue] = useState<number | string>(initialValue)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <div
            className={cn(
                'mb-4 flex h-[40px] w-full items-center justify-start overflow-hidden rounded-[10px] border border-solid border-secondary-border bg-secondary',
                className
            )}
        >
            <div className="ml-3 mr-3">
                <SearchIcon />
            </div>
            <div className="flex-auto">
                <input
                    className="h-[40px] w-full bg-transparent focus:outline-none"
                    {...props}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

export default DebouncedInput
