import { useTranslation } from 'react-i18next'
import Logo from '../../assets/icons/navigation/logo.svg'
import LogoBlack from '../../assets/icons/navigation/logo-black.svg'
import { cn } from '@/shared/lib/cn'

interface AppLogoProps {
    variant?: 'light' | 'dark'
    expanded?: boolean
}

export const AppLogo = ({ variant = 'light', expanded }: AppLogoProps) => {
    const { t } = useTranslation()

    return (
        <div className="flex-center mt-4 gap-3">
            {variant === 'light' ? <Logo /> : <LogoBlack />}
            {expanded && (
                <span
                    className={cn('w-[200px] whitespace-nowrap text-xl font-bold', variant === 'light' && 'text-white')}
                >
                    {t('app-name')}
                </span>
            )}
        </div>
    )
}
