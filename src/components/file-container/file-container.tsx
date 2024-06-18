import React, { BaseSyntheticEvent, Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UploadIcon from '@/assets/icons/upload.svg'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/ui/button'
import { formatFileSize } from '@/shared/lib/format-file-size'

interface FileContainerProps {
    selectedFile: File | undefined
    setSelectedFile: Dispatch<SetStateAction<File | undefined>>
    fileType?: string
    uploadIcon?: React.ReactNode
}

export const FileContainer = ({
    selectedFile,
    setSelectedFile,
    fileType = '*/*',
    uploadIcon = <UploadIcon />,
}: FileContainerProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation()

    const [dragActive, setDragActive] = useState<boolean>(false)

    const handleAddClick = () => {
        if (inputRef !== null && !selectedFile) {
            inputRef.current?.click()
        }
    }

    // TODO Remove file
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleRemoveClick = () => {
        setSelectedFile(undefined)
    }

    const handleFileChange = (event: BaseSyntheticEvent) => {
        setSelectedFile(event.target.files && event.target.files[0])
        event.target.value = null
    }

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setSelectedFile(e.dataTransfer.files && e.dataTransfer.files[0])
        setDragActive(false)
    }

    return (
        <Fragment>
            <div
                className={cn(
                    'flex-center h-[240px] w-full rounded-[10px] border-[1.5px] border-dashed border-secondary-border bg-[#F2F3F7]',
                    !selectedFile ? 'cursor-pointer p-7' : 'p-5'
                )}
                onClick={handleAddClick}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    style={{ display: 'none' }}
                    ref={inputRef}
                    type="file"
                    accept={fileType}
                    onChange={handleFileChange}
                />
                {selectedFile ? (
                    <div
                        className={cn(
                            'pointer-events-none flex max-w-[270px] select-none flex-col items-center gap-5',
                            dragActive && 'invisible'
                        )}
                    >
                        {uploadIcon}
                        <div className="text-[#BFC4CE]">
                            <p>{selectedFile.name}</p>
                            <p>{formatFileSize(selectedFile.size)}</p>
                        </div>
                    </div>
                ) : (
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
                )}
            </div>
        </Fragment>
    )
}
