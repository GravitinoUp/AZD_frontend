import React, { ChangeEvent, Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UploadIcon from '@/assets/icons/upload.svg'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/ui/button'

export interface FileData {
    id: string
    fileURL?: string
    file?: File
}

interface MultiFileInputProps {
    selectedFiles: FileData[]
    setSelectedFiles: (files: FileData[]) => void
    disabled?: boolean
    fileType?: string
    uploadIcon?: React.ReactNode
}

export const MultiFileInput = ({
    selectedFiles,
    setSelectedFiles,
    disabled,
    fileType = '*/*',
    uploadIcon = <UploadIcon />,
}: MultiFileInputProps) => {
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

        setSelectedFiles([...selectedFiles, ...newFiles])
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
                    'flex-center h-[240px] w-full rounded-[10px] border-[1.5px] border-dashed border-secondary-border bg-[#F2F3F7]',
                    disabled ? 'cursor-default opacity-45' : 'cursor-pointer'
                )}
                onClick={!disabled ? handleAddClick : undefined}
                onDragOver={!disabled ? handleDragOver : undefined}
                onDragLeave={!disabled ? handleDragLeave : undefined}
                onDrop={!disabled ? handleDrop : undefined}
            >
                <input
                    style={{ display: 'none' }}
                    ref={inputRef}
                    type="file"
                    accept={fileType}
                    onChange={!disabled ? handleFileChange : undefined}
                />
                <div
                    className={cn(
                        'pointer-events-none flex max-w-[270px] select-none flex-col items-center gap-5',
                        dragActive && 'invisible'
                    )}
                >
                    {uploadIcon}
                    <Button className="h-[50px] w-full">{t('action.attach.document')}</Button>
                    <p className="text-[#BFC4CE]">{t('attach.document.description')}</p>
                </div>
            </div>
        </Fragment>
    )
}
