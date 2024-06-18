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
    <TabsList className="my-14 w-full select-none items-start self-center">
        {tabsData.map(({ value, label }, index) => (
            <div
                key={value}
                className={cn('flex flex-col gap-1', index !== tabsData.length - 1 && 'w-full')}
                onClick={() => onTabClick(value, index)}
            >
                <div className="flex items-center">
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
                        <div className={cn('h-[6px] w-full', currentStep > index ? 'bg-primary' : 'bg-white')} />
                    )}
                </div>
                <p className="text-start font-semibold">{label}</p>
            </div>
        ))}
    </TabsList>
)
