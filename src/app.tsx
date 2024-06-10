import { router } from '@/shared/router/router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { PageLoader } from './components/loaders'

const queryClient = new QueryClient()
export const App = () => (
    <Suspense fallback={<PageLoader className="h-[100vh]" />}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/*<ReactQueryDevtools />*/}
        </QueryClientProvider>
    </Suspense>
)
