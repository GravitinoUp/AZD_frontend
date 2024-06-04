import { Layout } from '@/components/layout'
import { ErrorPage } from '@/pages/error-page/error-page.tsx'
import { HomePage } from '@/pages/home'
import { SchedulesPage } from '@/pages/schedules'
import { UsersPage } from '@/pages/users'
import { SCHEDULES, USERS } from '@/shared/router/routes.ts'
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
        ],
    },
    {
        path: SCHEDULES,
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <SchedulesPage />,
            },
        ],
    },
    {
        path: USERS,
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <UsersPage />,
            },
        ],
    },
])
