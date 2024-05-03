import { Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Counter from '@/modules/counter/ui/counter.tsx'
import { EXAMPLE } from '@/shared/router/routes.ts'
import { Link } from 'react-router-dom'

export const HomePage = () => {
    const { t } = useTranslation()

    return (
        <div className="text-center selection:bg-green-900">
            <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
                <Github width={100} height={100} className="animate-speed h-60 motion-safe:animate-spin" />
                <style>
                    {
                        '\
                        .animate-speed{\
                          animation-duration:20s;\
                        }\
                      '
                    }
                </style>
                <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
                    {t('title')}
                </p>
                <Counter />
                <Link className="mt-4 text-amber-500" to={EXAMPLE}>
                    to example page
                </Link>
            </header>
        </div>
    )
}
