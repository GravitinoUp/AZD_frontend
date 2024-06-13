import { RouterButton } from '@/components/router-button'
import { usePageTitle } from '@/shared/context/plans-page-title'
import { BRANCHES, ORGANIZATIONS, ORGANIZATION_MANAGE } from '@/shared/router/routes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import i18next from 'i18next'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

const OrganizationsPage = () => {
    const { pageTitle } = usePageTitle()

    return (
        <>
            <div className="bordered-space" />
            <div className="flex-center mt-20 gap-4">
                {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
                <RouterButton to={ORGANIZATION_MANAGE} />
            </div>
            <Tabs defaultValue={tabsData[0].value} className="mt-7">
                <div className="border-b-2 border-b-tabs-content pb-[3px]">
                    <TabsList className="gap-5">
                        {tabsData.map(({ value, icon, label }) => (
                            <TabsTrigger key={value} value={value}>
                                <span className="mr-1.5">{icon}</span>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                {tabsData.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-16">
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </>
    )
}

const tabsData = [
    {
        value: ORGANIZATIONS,
        icon: <Fragment />,
        label: i18next.t('all.organizations'),
        content: <Outlet />,
    },
    {
        value: BRANCHES,
        icon: <Fragment />,
        label: i18next.t('branches'),
        content: <Outlet />,
    },
]

export default OrganizationsPage
