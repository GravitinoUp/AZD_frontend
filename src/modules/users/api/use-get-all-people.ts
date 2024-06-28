import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch.ts'
import { Person, PersonSort } from '@/types/user.ts'
import { useQuery } from '@tanstack/react-query'

const getAllPeople = async (body: Payload<Person, PersonSort>) => {
    const response = await apiRequest.post('/person/all', body)
    return response.data as Data<Person[]>
}

export const useGetAllPeople = (body: Payload<Person, PersonSort>) =>
    useQuery({
        queryKey: [ApiKeys.People, body],
        queryFn: () => getAllPeople(body),
        select: (data) => data.data,
    })
