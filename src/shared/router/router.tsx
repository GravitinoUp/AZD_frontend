import { Layout } from '@/components/layout'
import { ErrorPage } from '@/pages/error-page/error-page.tsx'
import { HomePage } from '@/pages/home'
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
])
