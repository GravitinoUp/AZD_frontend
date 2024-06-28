import { DataTable } from '@/components/data-table'
import { useTranslation } from 'react-i18next'
import { TableActions } from '@/components/table-actions'
import { PROPERTIES } from '@/shared/router/routes'
import { DebouncedInput } from '@/components/debounced-input'
import { Entity } from '@/types/property'
import { useState } from 'react'
import { placeholderQuery } from '@/shared/constants'
import { useGetAllProperties } from './api/use-get-all-properties'
import { propertyColumns } from './components/property-columns'
import i18next from 'i18next'

const routes = [
    { route: '/', label: i18next.t('home') },
    { route: PROPERTIES, label: i18next.t('properties.title') },
]

export const Properties = ({ entity }: { entity: Entity }) => {
    const { t } = useTranslation()

    const [propertiesQuery, setPropertiesQuery] = useState(placeholderQuery)
    const {
        data: properties = { count: 0, data: [] },
        isLoading,
        isError,
    } = useGetAllProperties({ ...propertiesQuery, filter: { entity_name: entity } })

    if (isError) {
        return <p>{t('error.default')}</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput
                className="my-6"
                value=""
                onChange={(query) => {
                    const searchQuery = String(query).trim()
                    setPropertiesQuery({
                        ...propertiesQuery,
                        filter: { property_name: searchQuery !== '' ? searchQuery : undefined },
                    })
                }}
            />
            <DataTable
                className="mb-10 mt-7"
                columns={propertyColumns}
                data={properties.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
