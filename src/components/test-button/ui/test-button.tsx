import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'
import { Button } from '@/ui/button.tsx'

interface TestButtonProps {
    children: ReactNode
    onClick: () => void
}

export const TestButton = ({ children, onClick }: TestButtonProps) => {
    const { t } = useTranslation()

    return (
        <div>
            <p>{t('test-button')}</p>
            <Button className="mt-2 w-[100px] bg-red-600" onClick={onClick}>
                {children}
            </Button>
        </div>
    )
}
