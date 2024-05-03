import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { ExamplePage } from '@/pages/example'
import { EXAMPLE } from '@/shared/router/routes.ts'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: EXAMPLE,
        element: <ExamplePage />,
    },
])
