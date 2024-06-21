import { ErrorAlert } from '@/components/error-alert'
import { ErrorBoundary } from '@/components/error-boundary'
import { Layout } from '@/components/layout'
import { PageLoader, TablePageLoader } from '@/components/loaders'
import { AllLimits, Limit } from '@/modules/limits'
import { AllPlans, Plan } from '@/modules/plans'
import { ErrorPage } from '@/pages/error-page/error-page.tsx'
import { HomePage } from '@/pages/home'
import { LimitsPageLayout } from '@/pages/limits'
import { PlansPage } from '@/pages/plans'
import { RolesPageLazy } from '@/pages/roles'
import { RoleManagePageLazy } from '@/pages/roles/manage'
import { UsersPageLazy } from '@/pages/users'
import { UserManagePageLazy } from '@/pages/users/manage'
import { LimitTitleProvider } from '@/shared/context/limits-page-title.tsx'
import { PlansTitleProvider } from '@/shared/context/plans-page-title.tsx'
import { LIMITS, LIMITS_ADD, PLANS, ROLE_MANAGE, ROLES, USER_MANAGE, USERS } from '@/shared/router/routes.ts'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

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
                    <PlansTitleProvider>
                        <PlansPage />
                    </PlansTitleProvider>
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
                        <Suspense fallback={<TablePageLoader />}>
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
                element: (
                    <ErrorBoundary fallback={<ErrorAlert />}>
                        <Suspense fallback={<TablePageLoader />}>
                            <RolesPageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: ROLE_MANAGE,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <RoleManagePageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: LIMITS,
                element: (
                    <LimitTitleProvider>
                        <LimitsPageLayout />
                    </LimitTitleProvider>
                ),
                children: [
                    {
                        path: '',
                        element: <AllLimits />,
                    },
                    {
                        path: ':id',
                        element: <Limit />,
                    },
                ],
            },
            {
                path: LIMITS_ADD,
                element: <p>placeholder</p>,
            },
        ],
    },
])
