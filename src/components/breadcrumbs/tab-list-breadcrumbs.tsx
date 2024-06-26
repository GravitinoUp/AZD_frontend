import { cn } from '@/shared/lib/cn'
import { TabsList } from '@/ui/tabs'
import React from 'react'

interface TabListBreadcrumbsProps {
    tabsData: {
        value: string
        label: string
        content: React.ReactNode
    }[]
    onTabClick: (value: string, index: number) => void
    currentStep: number
}

export const TabListBreadcrumbs = ({ tabsData, onTabClick, currentStep }: TabListBreadcrumbsProps) => (
    <TabsList className="mt-14 h-full w-full select-none flex-col items-start self-center md:flex-row">
        {tabsData.map(({ value, label }, index) => (
            <div
                key={value}
                className={cn(
                    'flex flex-row items-center gap-1 md:flex-col md:items-start',
                    index !== tabsData.length - 1 && 'w-full'
                )}
                onClick={() => onTabClick(value, index)}
            >
                <div className="flex items-center md:w-full">
                    <div
                        className={cn(
                            'flex-center min-h-8 min-w-8 rounded-full border-2 border-[#F3F3F3]',
                            currentStep >= index ? 'bg-primary' : 'bg-white'
                        )}
                    >
                        <div
                            className={cn(
                                'h-[10px] w-[10px] rounded-full',
                                currentStep >= index ? 'bg-white' : 'bg-[#F3F3F3]'
                            )}
                        />
                    </div>
                    {index !== tabsData.length - 1 && (
                        <div
                            className={cn(
                                'hidden h-[6px] w-full md:block',
                                currentStep > index ? 'bg-primary' : 'bg-white'
                            )}
                        />
                    )}
                </div>
                <p className="text-start font-semibold">{label}</p>
            </div>
        ))}
    </TabsList>
)
