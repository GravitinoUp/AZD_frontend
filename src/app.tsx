import { router } from '@/shared/router/router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

const queryClient = new QueryClient()
export const App = () => (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
)
