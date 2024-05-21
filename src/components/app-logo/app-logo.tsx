import { useTranslation } from 'react-i18next'
import Logo from '../../assets/icons/navigation/logo.svg'

interface AppLogoProps {
    expanded?: boolean
}

export const AppLogo = ({ expanded }: AppLogoProps) => {
    const { t } = useTranslation()

    return (
        <div className="flex-center mt-4 gap-3">
            <Logo />
            {expanded ? (
                <span className="w-[200px] whitespace-nowrap text-xl font-bold text-white">{t('app-name')}</span>
            ) : (
                void 0
            )}
        </div>
    )
}
