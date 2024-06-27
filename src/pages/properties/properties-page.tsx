import { RouterButton } from '@/components/router-button'
import { PROPERTY_MANAGE } from '@/shared/router/routes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import AllOrganizationsIcon from '@/assets/icons/all-organizations.svg'
import BranchesIcon from '@/assets/icons/branches.svg'
import UsersIconAlt from '@/assets/icons/users-icon-alt.svg'
import PurchaseIcon from '@/assets/icons/purchase.svg'
import PlanIcon from '@/assets/icons/plan.svg'
import RolesIconAlt from '@/assets/icons/roles-alt.svg'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { Properties } from '@/modules/properties'
import { useState } from 'react'

const PropertiesPage = () => {
    const { t } = useTranslation()

    const [currentTab, setCurrentTab] = useState(tabsData[0].value)

    return (
        <>
            <div className="bordered-space" />
            <div className="flex-center mt-20 gap-4">
                <h1 className="page-title">{t('manage-properties')}</h1>
                <RouterButton to={PROPERTY_MANAGE} state={{ entity: currentTab }} />
            </div>
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-7">
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
        value: 'users',
        icon: <UsersIconAlt />,
        label: i18next.t('users'),
        content: <Properties entity="users" />,
    },
    {
        value: 'branch',
        icon: <BranchesIcon />,
        label: i18next.t('branches'),
        content: <Properties entity="branch" />,
    },
    {
        value: 'organization',
        icon: <AllOrganizationsIcon />,
        label: i18next.t('organizations'),
        content: <Properties entity="organization" />,
    },
    {
        value: 'purchase',
        icon: <PurchaseIcon />,
        label: i18next.t('purchase'),
        content: <Properties entity="purchase" />,
    },
    {
        value: 'plan',
        icon: <PlanIcon />,
        label: i18next.t('plans'),
        content: <Properties entity="plan" />,
    },
    {
        value: 'roles',
        icon: <RolesIconAlt />,
        label: i18next.t('roles-and-permissions'),
        content: <Properties entity="roles" />,
    },
]

export default PropertiesPage
