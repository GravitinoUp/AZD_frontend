import CopyIcon from '@/assets/icons/double-square-filled.svg'
import EditIcon from '@/assets/icons/pen.svg'
import { Button } from '@/ui/button.tsx'
import { Input } from '@/ui/input.tsx'
import { Label } from '@/ui/label.tsx'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip.tsx'
import { useToast } from '@/ui/use-toast.ts'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SheetInputProps {
    label: string
    initialValue: string
    onInputEdit?: () => void
    className?: string
}

export const SheetInput = ({ label, initialValue, onInputEdit, className }: SheetInputProps) => {
    const { t } = useTranslation()
    const [value, setValue] = useState(initialValue)
    const [isReadOnly, setIsReadOnly] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    const handleEditClick = () => {
        setIsReadOnly(false)
        inputRef.current?.focus()
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(value)
        toast({
            description: t('clipboard-copy'),
            duration: 1500,
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsReadOnly(true)
            inputRef.current?.blur()
            onInputEdit?.()
        }
    }

    const handleBlur = () => {
        setIsReadOnly(true)
        onInputEdit?.()
    }

    return (
        <div className={className}>
            <Label className="text-base font-bold" htmlFor="name">
                {label}
            </Label>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Input
                            ref={inputRef}
                            className="mt-2 max-w-[250px]"
                            type="text"
                            readOnly={isReadOnly}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="border-none shadow-none">
                        <Button className="h-6 w-6" variant="ghost" size="icon" onClick={handleEditClick}>
                            <EditIcon />
                        </Button>
                        <Button className="ml-1.5 h-6 w-6" variant="ghost" size="icon" onClick={handleCopyClick}>
                            <CopyIcon />
                        </Button>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
