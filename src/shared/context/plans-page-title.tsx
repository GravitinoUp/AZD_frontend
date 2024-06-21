import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ContextValues {
    pageTitle: string
    setPageTitle: Dispatch<SetStateAction<string>>
}

const PageTitleContext = createContext<ContextValues>({
    pageTitle: '',
    setPageTitle: () => void 0,
})

interface PageTitleProviderProps {
    children: ReactNode
}

export const PlansTitleProvider = ({ children }: PageTitleProviderProps) => {
    const { t } = useTranslation()
    const [pageTitle, setPageTitle] = useState(t('plans'))
    const contextValues = useMemo(
        () => ({
            pageTitle,
            setPageTitle,
        }),
        [pageTitle, setPageTitle]
    )

    return <PageTitleContext.Provider value={contextValues}>{children}</PageTitleContext.Provider>
}

export const usePlanPageTitle = () => useContext(PageTitleContext)
