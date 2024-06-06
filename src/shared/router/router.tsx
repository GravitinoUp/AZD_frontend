import { Layout } from '@/components/layout'
import { AllSchedules, Schedule } from '@/modules/schedules'
import { ErrorPage } from '@/pages/error-page/error-page.tsx'
import { HomePage } from '@/pages/home'
import { SchedulesPage } from '@/pages/schedules'
import { UsersPage } from '@/pages/users'
import { PLANS, USERS } from '@/shared/router/routes.ts'
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
                element: <SchedulesPage />,
                children: [
                    {
                        path: '',
                        element: <AllSchedules />,
                    },
                    {
                        path: ':id',
                        element: <Schedule />,
                    },
                ],
            },
            {
                path: USERS,
                element: <UsersPage />,
            },
        ],
    },
])
