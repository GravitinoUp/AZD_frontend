import { apiRequest } from '@/shared/api'
import { Data } from '@/types/fetch.ts'
import { KBKTypeCodes, KbkTypeData } from '@/types/kbk.ts'
import { useQuery } from '@tanstack/react-query'

const getKbkValueType = async (typeId: KBKTypeCodes) => {
    const response = await apiRequest.get(`/kbk/values/type/${typeId}`)
    return response.data as Data<KbkTypeData[]>
}

export const useKbkValuesType = (typeId: KBKTypeCodes) =>
    useQuery({
        queryKey: ['kbk-values', typeId],
        queryFn: () => getKbkValueType(typeId),
    })
