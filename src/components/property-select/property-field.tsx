import { Entity } from '@/types/property'
import { Skeleton } from '@/ui/skeleton'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorAlert } from '../error-alert'
import { Button } from '@/ui/button'
import { PropertySelect } from './property-select'
import { useGetAllProperties } from '@/modules/properties/api/use-get-all-properties'
import { placeholderQuery } from '@/shared/constants'
import { FormLabel } from '@/ui/form'

interface PropertyFieldProps {
    entity: Entity
    selectedProperties: { property: string; value: string }[]
    setSelectedProperties: Dispatch<
        SetStateAction<
            {
                property: string
                value: string
            }[]
        >
    >
}

export const PropertyField = ({ entity, selectedProperties, setSelectedProperties }: PropertyFieldProps) => {
    const { t } = useTranslation()

    const {
        data: properties = { count: 0, data: [] },
        isLoading: propertiesLoading,
        isError: propertiesError,
        isSuccess: propertiesSuccess,
    } = useGetAllProperties({ ...placeholderQuery, offset: { count: 999, page: 1 }, filter: { entity_name: entity } })
    const filteredProperties = properties.data.filter(
        (p) => selectedProperties.findIndex((v) => v.property === p.property_name_uuid) === -1
    )

    return (
        <div className="w-full">
            {propertiesLoading && <Skeleton className="mt-6 h-10 w-[251px] rounded-xl" />}
            {propertiesError && <ErrorAlert />}
            {propertiesSuccess && properties.data.length > 0 && (
                <Fragment>
                    <div className="mb-2 flex items-center gap-2">
                        <FormLabel>{t('properties.title')}</FormLabel>
                        {filteredProperties.length > 0 && (
                            <Button
                                className="h-8 w-8"
                                size="icon"
                                type="button"
                                onClick={() => {
                                    setSelectedProperties([
                                        ...selectedProperties,
                                        {
                                            property: filteredProperties[0].property_name_uuid,
                                            value: filteredProperties[0].values[0].property_value_uuid,
                                        },
                                    ])
                                }}
                            >
                                +
                            </Button>
                        )}
                    </div>
                    {selectedProperties.map((selectedProperty, index) => (
                        <PropertySelect
                            key={index}
                            properties={properties.data}
                            filteredProperties={filteredProperties}
                            selectedProperties={selectedProperties}
                            setSelectedProperties={setSelectedProperties}
                            selectedProperty={selectedProperty}
                            selectedPropertyIndex={index}
                        />
                    ))}
                </Fragment>
            )}
        </div>
    )
}
