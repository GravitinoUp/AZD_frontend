import { KTRU } from '@/types/handbook'
import { ColumnDef } from '@tanstack/react-table'

export const ktruColumns: ColumnDef<KTRU>[] = [
    {
        accessorKey: 'ktru_uuid',
        header: 'UUID',
        size: 100,
    },
]
