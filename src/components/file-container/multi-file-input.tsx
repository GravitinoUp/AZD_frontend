import React, { ChangeEvent, Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UploadIcon from '@/assets/icons/upload.svg'
import { cn } from '@/shared/lib/cn'

export interface FileData {
    id: string
    fileURL?: string
    file?: File
}

interface MultiFileInputProps {
    setSelectedFiles: Dispatch<SetStateAction<FileData[]>>
    disabled?: boolean
}

export const MultiFileInput = ({ setSelectedFiles, disabled }: MultiFileInputProps) => {
    const { t } = useTranslation()
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = useState<boolean>(false)

    const readUploadedFiles = (files: File[]) => {
        const newFiles: FileData[] = []

        files.forEach((file) => {
            newFiles.push({
                id: crypto.randomUUID(),
                file: file,
            })
        })

        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            readUploadedFiles(files)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragActive(false)
        const files = Array.from(e.dataTransfer.files)
        readUploadedFiles(files)
    }

    const handleAddClick = () => {
        inputRef.current?.click()
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragActive(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragActive(false)
    }

    return (
        <Fragment>
            <div
                className={cn(
                    'mt-8 flex h-[120px] select-none flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed border-[#C6C9CC] bg-muted px-2',
                    disabled ? 'cursor-default opacity-45' : 'cursor-pointer'
                )}
                onClick={handleAddClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    disabled={disabled}
                />
                <div
                    className={cn(
                        'pointer-events-none flex flex-col items-center gap-1.5 text-center',
                        dragActive && 'invisible'
                    )}
                >
                    <UploadIcon />
                    <p>
                        {t('files.import.drag')}
                        <span className="font-semibold text-primary underline">{t('file.import.click')}</span>{' '}
                        {t('file.download')}
                    </p>
                </div>
            </div>
        </Fragment>
    )
}
