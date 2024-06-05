import { useState } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import i18next from 'i18next'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/ui/command.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover.tsx'
import { Button, ButtonProps } from '@/ui/button'
import { cn } from '@/shared/lib/cn'
import { ScrollBar } from '@/ui/scroll-area'

interface CommandMultiSelectProps<T> extends ButtonProps {
    selectedValues: T[]
    setSelectedValues: (values: T[]) => void
    placeholder?: string
    disabledPlaceholder?: string
    disabled?: boolean
    items: { value: T; label: string }[]
}

export function CommandMultiSelect<T>({
    selectedValues,
    setSelectedValues,
    placeholder = i18next.t('multiselect.placeholder.default'),
    disabledPlaceholder = i18next.t('multiselect.placeholder.default'),
    disabled = false,
    items,
    className,
}: CommandMultiSelectProps<T>) {
    const { t } = useTranslation()
    const [popoverOpen, setPopoverOpen] = useState(false)

    const isNotEmpty = selectedValues && selectedValues.length !== 0

    const selectedItems = selectedValues
        .reduce((acc, item) => `${acc}, ${items.find(({ value }) => item === value)?.label}`, '')
        .toString()

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={true}>
            <PopoverTrigger disabled={disabled} asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className={cn(
                        'flex h-auto min-h-10 w-full justify-between whitespace-normal rounded-2xl text-left [&>span]:line-clamp-1',
                        className
                    )}
                >
                    <span className="pointer-events-none">
                        {isNotEmpty
                            ? selectedItems.substring(2, selectedItems.length)
                            : !disabled
                            ? placeholder
                            : disabledPlaceholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={t('placeholder.search')} />
                    <CommandEmpty>{t('nothing.found')}</CommandEmpty>
                    <CommandGroup className="p-3">
                        <ScrollArea.Root>
                            <ScrollArea.Viewport className="max-h-[320px] max-w-[500px]">
                                {selectedValues.length > 0 ? (
                                    <CommandItem
                                        className="m-0 flex h-10 justify-between rounded-xl pl-4 font-semibold"
                                        key={`unselect-all`}
                                        onSelect={() => {
                                            setSelectedValues([])
                                        }}
                                    >
                                        {t('multiselect.unselect.all')}
                                        <Check className="ml-2 h-4 w-4 opacity-0" />
                                    </CommandItem>
                                ) : (
                                    <CommandItem
                                        className="m-0 flex h-10 justify-between rounded-xl pl-4 font-semibold"
                                        key={`select-all`}
                                        onSelect={() => {
                                            setSelectedValues(items.map((item) => item.value))
                                        }}
                                    >
                                        {t('multiselect.select.all')}
                                        <Check className="ml-2 h-4 w-4 opacity-0" />
                                    </CommandItem>
                                )}
                                {items.map(({ value, label }) => (
                                    <CommandItem
                                        key={`${value}`}
                                        className="m-0 flex h-10 justify-between rounded-xl pl-4 font-semibold"
                                        onSelect={() => {
                                            if (selectedValues.includes(value)) {
                                                setSelectedValues(selectedValues.filter((item) => item !== value))
                                            } else {
                                                setSelectedValues([...selectedValues, value])
                                            }
                                        }}
                                    >
                                        {label.replaceAll('"', "'")}
                                        <Check
                                            className={cn(
                                                'ml-2 h-4 w-4 rounded-full bg-primary p-[2px] text-white',
                                                selectedValues.includes(value) ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </ScrollArea.Viewport>
                            <ScrollBar />
                            <ScrollArea.Corner />
                        </ScrollArea.Root>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
