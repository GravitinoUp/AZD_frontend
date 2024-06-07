import { Layout } from '@/components/layout'
import { AllPlans, Plan } from '@/modules/plans'
import { ErrorPage } from '@/pages/error-page/error-page.tsx'
import { HomePage } from '@/pages/home'
import { PlansPage } from '@/pages/plans'
import { RolesPage } from '@/pages/roles'
import { UsersPage } from '@/pages/users'
import { PLANS, ROLES, ROLE_MANAGE, USERS, USER_MANAGE } from '@/shared/router/routes.ts'
import { createBrowserRouter } from 'react-router-dom'
import { PageTitleProvider } from '../context/plans-page-title'
import { UserManagePage } from '@/pages/users/manage'
import { RoleManagePage } from '@/pages/roles/manage'

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
                element: <UsersPage />,
            },
            {
                path: USER_MANAGE,
                element: <UserManagePage />,
            },
            {
                path: ROLES,
                element: <RolesPage />,
            },
            {
                path: ROLE_MANAGE,
                element: <RoleManagePage />,
            },
        ],
    },
])
