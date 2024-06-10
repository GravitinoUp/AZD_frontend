import { Layout } from '@/components/layout'
import { AllPlans, Plan } from '@/modules/plans'
import { ErrorPage } from '@/pages/error-page/error-page.tsx'
import { HomePage } from '@/pages/home'
import { PlansPage } from '@/pages/plans'
import { RolesPage } from '@/pages/roles'
import { UsersPageLazy } from '@/pages/users'
import { PLANS, ROLES, USERS, USER_MANAGE } from '@/shared/router/routes.ts'
import { createBrowserRouter } from 'react-router-dom'
import { PageTitleProvider } from '../context/plans-page-title'
import { UserManagePageLazy } from '@/pages/users/manage'
import { ErrorBoundary } from '@/components/error-boundary'
import { ErrorAlert } from '@/components/error-alert'
import { Suspense } from 'react'
import { PageLoader } from '@/components/loaders'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: PLANS,
                element: (
                    <PageTitleProvider>
                        <PlansPage />
                    </PageTitleProvider>
                ),
                children: [
                    {
                        path: '',
                        element: <AllPlans />,
                    },
                    {
                        path: ':id',
                        element: <Plan />,
                    },
                ],
            },
            {
                path: USERS,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <UsersPageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: USER_MANAGE,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <UserManagePageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: ROLES,
                element: <RolesPage />,
            },
        ],
    },
])
