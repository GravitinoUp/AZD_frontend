import { RouterButton } from '@/components/router-button'
import {
    INITIATE_PURCHASE,
    PURCHASES,
    PURCHASE_PRODUCTS_AND_SERVICES,
    PURCHASE_REFERENCES,
} from '@/shared/router/routes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

export const PurchasesPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { t } = useTranslation()

    return (
        <>
            <div className="bordered-space" />
            <div className="flex-center mt-20 gap-4">
                <h1 className="page-title">{t('all-purchase')}</h1>
                <RouterButton to={INITIATE_PURCHASE} />
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
        value: PURCHASES,
        icon: <div />,
        label: i18next.t('all-purchase'),
        content: <Outlet />,
    },
    {
        value: PURCHASE_REFERENCES,
        icon: <div />,
        label: i18next.t('handbook'),
        content: <Outlet />,
    },
    {
        value: PURCHASE_PRODUCTS_AND_SERVICES,
        icon: <div />,
        label: i18next.t('goods-and-services'),
        content: <Outlet />,
    },
]
