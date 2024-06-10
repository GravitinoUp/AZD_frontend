import CopyIcon from '@/assets/icons/double-square-filled.svg'
import EditIcon from '@/assets/icons/pen.svg'
import { Button } from '@/ui/button.tsx'
import { Input } from '@/ui/input.tsx'
import { Label } from '@/ui/label.tsx'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip.tsx'
import { useToast } from '@/ui/use-toast.ts'
import React, { useRef, useState } from 'react'

interface InfoInputFieldProps {
    label: string
    initialValue: string
}

export const InfoInputField = ({ label, initialValue }: InfoInputFieldProps) => {
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
            description: 'Скопировано в буфер обмена',
            duration: 1500,
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsReadOnly(true)
            inputRef.current?.blur()
        }
    }

    const handleBlur = () => {
        setIsReadOnly(true)
    }

    return (
        <div className="rounded-[10px] border border-tabs-content bg-white px-5 py-8">
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
