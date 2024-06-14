import { RouterButton } from '@/components/router-button'
import { useOrganizationsPageTitle } from '@/shared/context/organizations-page-title'
import { BRANCHES, BRANCH_MANAGE, ORGANIZATIONS, ORGANIZATION_MANAGE } from '@/shared/router/routes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import AllOrganizationsIcon from '@/assets/icons/all-organizations.svg'
import BranchesIcon from '@/assets/icons/branches.svg'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import i18next from 'i18next'

const OrganizationsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { pageTitle } = useOrganizationsPageTitle()

    return (
        <>
            <div className="bordered-space" />
            <div className="flex-center mt-20 gap-4">
                {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
                <RouterButton to={pathname === ORGANIZATIONS ? ORGANIZATION_MANAGE : BRANCH_MANAGE} />
            </div>
            <Tabs value={pathname} className="mt-7">
                <div className="border-b-2 border-b-tabs-content pb-[3px]">
                    <TabsList className="gap-5">
                        {tabsData.map(({ value, icon, label }) => (
                            <TabsTrigger key={value} value={value} onClick={() => navigate(value)}>
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
        icon: <AllOrganizationsIcon />,
        label: i18next.t('all.organizations'),
        content: <Outlet />,
    },
    {
        value: BRANCHES,
        icon: <BranchesIcon />,
        label: i18next.t('branches'),
        content: <Outlet />,
    },
]

export default OrganizationsPage
