import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ContextValues {
    pageTitle: string
    setPageTitle: Dispatch<SetStateAction<string>>
}

const OrganizationsPageTitleContext = createContext<ContextValues>({
    pageTitle: '',
    setPageTitle: () => void 0,
})

interface OrganizationsPageTitleProviderProps {
    children: ReactNode
}

export const OrganizationsPageTitleProvider = ({ children }: OrganizationsPageTitleProviderProps) => {
    const { t } = useTranslation()
    const [pageTitle, setPageTitle] = useState(t('all.organizations'))
    const contextValues = useMemo(
        () => ({
            pageTitle,
            setPageTitle,
        }),
        [pageTitle, setPageTitle]
    )

    return (
        <OrganizationsPageTitleContext.Provider value={contextValues}>
            {children}
        </OrganizationsPageTitleContext.Provider>
    )
}

export const useOrganizationsPageTitle = () => useContext(OrganizationsPageTitleContext)
