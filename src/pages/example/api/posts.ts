import { useQuery } from '@tanstack/react-query'
import { axiosRequest } from '@/shared/api'

interface Post {
    id: number
    body: string
    title: string
}

const fetchPosts = async () => {
    const { data } = await axiosRequest.get('/posts')
    return data as Post[]
}

export const useGetPosts = () =>
    useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })
