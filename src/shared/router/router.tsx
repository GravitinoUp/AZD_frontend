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
import {
    AUTH,
    BRANCH_MANAGE,
    BRANCHES,
    LIMITS,
    ORGANIZATION_MANAGE,
    ORGANIZATIONS,
    PLANS,
    REGISTER,
    ROLE_MANAGE,
    ROLES,
    USER_MANAGE,
    USERS,
} from '@/shared/router/routes.ts'
import { PlansTitleProvider } from '@/shared/context/plans-page-title.tsx'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { OrganizationsPageTitleProvider } from '../context/organizations-page-title'
import { OrganizationsPageLazy } from '@/pages/organizations'
import { AllOrganizations, Branches } from '@/modules/organizations'
import { BranchManagePageLazy, OrganizationManagePageLazy } from '@/pages/organizations/manage'
import { AuthPage } from '@/pages/auth'
import { RegisterPage } from '@/pages/register'

export const router = createBrowserRouter([
    {
        path: AUTH,
        element: <AuthPage />,
    },
    {
        path: REGISTER,
        element: <RegisterPage />,
    },
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
                    <ErrorBoundary fallback={<ErrorAlert className="mx-auto mt-[50vh]" />}>
                        <Suspense fallback={<TablePageLoader />}>
                            <UsersPageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: USER_MANAGE,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert className="mx-auto mt-[50vh]" />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <UserManagePageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: ROLES,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert className="mx-auto mt-[50vh]" />}>
                        <Suspense fallback={<TablePageLoader />}>
                            <RolesPageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: ROLE_MANAGE,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert className="mx-auto mt-[50vh]" />}>
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
                path: ORGANIZATIONS,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert className="mx-auto mt-[50vh]" />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <OrganizationsPageTitleProvider>
                                <OrganizationsPageLazy />
                            </OrganizationsPageTitleProvider>
                        </Suspense>
                    </ErrorBoundary>
                ),
                children: [
                    {
                        path: '',
                        element: <AllOrganizations />,
                    },
                    {
                        path: BRANCHES,
                        element: <Branches />,
                    },
                ],
            },
            {
                path: ORGANIZATION_MANAGE,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert className="mx-auto mt-[50vh]" />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <OrganizationManagePageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: BRANCH_MANAGE,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert className="mx-auto mt-[50vh]" />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <BranchManagePageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
        ],
    },
])
