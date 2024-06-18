import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ContextValues {
    pageTitle: string
    setPageTitle: Dispatch<SetStateAction<string>>
}

const LimitPageTitle = createContext<ContextValues>({
    pageTitle: '',
    setPageTitle: () => void 0,
})

interface LimitTitleProviderProps {
    children: ReactNode
}

export const LimitTitleProvider = ({ children }: LimitTitleProviderProps) => {
    const { t } = useTranslation()
    const [pageTitle, setPageTitle] = useState(t('all-limits'))
    const contextValues = useMemo(
        () => ({
            pageTitle,
            setPageTitle,
        }),
        [pageTitle, setPageTitle]
    )

    return <LimitPageTitle.Provider value={contextValues}>{children}</LimitPageTitle.Provider>
}

export const useLimitPageTitle = () => useContext(LimitPageTitle)
