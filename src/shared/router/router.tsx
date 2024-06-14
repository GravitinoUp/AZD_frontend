import { Layout } from '@/components/layout'
import { AllPlans, Plan } from '@/modules/plans'
import { ErrorPage } from '@/pages/error-page/error-page.tsx'
import { HomePage } from '@/pages/home'
import { PlansPage } from '@/pages/plans'
import { UsersPageLazy } from '@/pages/users'
import {
    BRANCHES,
    BRANCH_MANAGE,
    ORGANIZATIONS,
    ORGANIZATION_MANAGE,
    PLANS,
    ROLES,
    ROLE_MANAGE,
    USERS,
    USER_MANAGE,
} from '@/shared/router/routes.ts'
import { createBrowserRouter } from 'react-router-dom'
import { PageTitleProvider } from '../context/plans-page-title'
import { UserManagePageLazy } from '@/pages/users/manage'
import { ErrorBoundary } from '@/components/error-boundary'
import { ErrorAlert } from '@/components/error-alert'
import { Suspense } from 'react'
import { PageLoader, TablePageLoader } from '@/components/loaders'
import { RoleManagePageLazy } from '@/pages/roles/manage'
import { RolesPageLazy } from '@/pages/roles'
import { OrganizationsPageLazy } from '@/pages/organizations'
import { BranchManagePageLazy, OrganizationManagePageLazy } from '@/pages/organizations/manage'
import { AllOrganizations, Branches } from '@/modules/organizations'
import { OrganizationsPageTitleProvider } from '../context/organizations-page-title'

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
                path: ORGANIZATIONS,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert />}>
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
                    <ErrorBoundary fallback={<ErrorAlert />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <OrganizationManagePageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: BRANCH_MANAGE,
                element: (
                    <ErrorBoundary fallback={<ErrorAlert />}>
                        <Suspense fallback={<PageLoader className="h-[100vh]" />}>
                            <BranchManagePageLazy />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
        ],
    },
])
