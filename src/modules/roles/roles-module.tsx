import { DataTable } from '@/components/data-table'
import { roleColumns } from './components/roles-columns'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'
import { Button } from '@/ui/button'
import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'
import { ROLES } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { useGetAllRoles } from './api/useGetAllRoles'

const routes = [
    { route: '/', label: 'Главная' },
    { route: ROLES, label: 'Роли' },
]

export const RolesModule = () => {
    const { t } = useTranslation()
    const {
        data: roles = { count: 0, data: [] },
        isLoading,
        isError,
    } = useGetAllRoles({ offset: { count: 10, page: 1 }, filter: {}, sorts: {} })

    if (isError) {
        return <p>Произошла ошибка. Данные не загрузились</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <div className="flex-center mt-20 gap-4">
                <h1 className="text-3xl font-bold">{t('roles-and-permissions')}</h1>
                <Button className="h-7 w-7" size="icon">
                    <PlusRoundedIcon />
                </Button>
            </div>
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput className="my-6" value="" onChange={() => void 0} />
            <DataTable
                className="mb-10 mt-7"
                columns={roleColumns}
                data={roles.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
