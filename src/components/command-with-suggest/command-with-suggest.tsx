import { cn } from '@/shared/lib/cn.ts'
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command.tsx'
import { Check } from 'lucide-react'
import { FocusEvent, useState } from 'react'

interface CommandWithSuggestProps {
    suggestions?: Array<{
        value: string
        label: string
    }>
    selectedValue: string
    setSelectedValue: (value: string) => void
    placeholder?: string
}

export const CommandWithSuggest = ({
    selectedValue,
    setSelectedValue,
    suggestions,
    placeholder,
}: CommandWithSuggestProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowSuggestions(false)
        }
    }

    return (
        <Command className="rounded-lg border shadow-md" onBlur={handleBlur}>
            <CommandInput
                value={selectedValue}
                onValueChange={setSelectedValue}
                onFocus={() => setShowSuggestions(true)}
                placeholder={placeholder || 'Начните вводить...'}
            />
            {typeof suggestions !== 'undefined' && showSuggestions && (
                <CommandList>
                    <CommandGroup>
                        {suggestions.map(({ value, label }) => (
                            <CommandItem
                                key={value}
                                value={value}
                                onMouseDown={(e) => e.preventDefault()}
                                onSelect={(currentValue) => {
                                    setSelectedValue(currentValue === selectedValue ? '' : currentValue)
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        selectedValue === value ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                                {label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            )}
        </Command>
    )
}
