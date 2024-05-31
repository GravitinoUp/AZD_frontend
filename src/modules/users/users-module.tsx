import { DataTable } from '@/components/data-table'
import { userColumns } from './components/users-columns'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'

export const UsersModule = () => {
    const { t } = useTranslation()
    //const { data: users = [], isLoading, isError } = useGetAllUsers()

    // if (isError) {
    //     return <p>Произошла ошибка. Данные не загрузились</p>
    // }

    return (
        <div className="mx-auto w-[95%]">
            <h1 className="mt-20 text-3xl font-bold">{t('users')}</h1>
            <TableActions onExportClick={() => void 0} onImportClick={() => void 0} />
            <DataTable className="mb-10 mt-7" columns={userColumns} data={[]} isLoading={false} withBackground />
        </div>
    )
}
