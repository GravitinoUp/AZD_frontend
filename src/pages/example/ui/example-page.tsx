import { Link } from 'react-router-dom'
import { useGetPosts } from '@/pages/example/api/posts.ts'

export const ExamplePage = () => {
    const { isLoading, isError, data: posts } = useGetPosts()

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error</p>
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-3xl">Example page</h1>
            <ul>
                {posts?.slice(1, 5).map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
            <Link to="/" className="mt-4 text-amber-500">
                back to home page
            </Link>
        </div>
    )
}
