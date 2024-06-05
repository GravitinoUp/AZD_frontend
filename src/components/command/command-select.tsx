import { useEffect, useState } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import i18next from 'i18next'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonProps } from '@/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { cn } from '@/shared/lib/cn'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/ui/command'
import { ScrollBar } from '@/ui/scroll-area'

interface CommandSelectProps extends ButtonProps {
    selectedValue: string | number
    setSelectedValue: (value: string | number) => void
    placeholder?: string
    disabledPlaceholder?: string
    disabled?: boolean
    items: { value: string | number; label: string }[]
}

export const CommandSelect = ({
    selectedValue,
    setSelectedValue,
    placeholder = i18next.t('placeholder.select'),
    disabledPlaceholder = i18next.t('placeholder.select'),
    disabled = false,
    items,
    className,
}: CommandSelectProps) => {
    const { t } = useTranslation()
    const [popoverOpen, setPopoverOpen] = useState(false)

    const isNotEmpty = selectedValue && selectedValue !== 'undefined' && selectedValue !== '0'

    useEffect(() => {
        console.log(items)
    }, [])

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger disabled={disabled} asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className={cn(
                        'flex h-12 w-full justify-between whitespace-normal rounded-md text-left [&>span]:line-clamp-1',
                        className
                    )}
                >
                    <span className="pointer-events-none">
                        {isNotEmpty
                            ? items.find(({ value }) => value === selectedValue)?.label
                            : !disabled
                            ? placeholder
                            : disabledPlaceholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={t('placeholder.search')} />
                    <CommandEmpty>{t('nothing.found')}</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea.Root>
                            <ScrollArea.Viewport className="max-h-[320px] max-w-[500px]">
                                {items.map(({ value, label }) => (
                                    <CommandItem
                                        key={value}
                                        onSelect={() => {
                                            setSelectedValue(value === selectedValue ? '' : value)
                                            setPopoverOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                selectedValue === value ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                        {label.replaceAll('"', "'")}
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
