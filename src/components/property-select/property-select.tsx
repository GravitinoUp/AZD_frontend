import { Dispatch, SetStateAction } from 'react'
import MinusIcon from '@/assets/icons/minus.svg'
import { CommandSelect } from '../command'
import { Property } from '@/types/property'
import { Button } from '@/ui/button'
import { Minus } from 'lucide-react'

interface PropertySelectProps {
    properties: Property[]
    filteredProperties: Property[]
    selectedProperties: { property: string; value: string }[]
    setSelectedProperties: Dispatch<
        SetStateAction<
            {
                property: string
                value: string
            }[]
        >
    >
    selectedProperty: {
        property: string
        value: string
    }
    selectedPropertyIndex: number
}

export const PropertySelect = ({
    properties,
    filteredProperties,
    selectedProperties,
    setSelectedProperties,
    selectedProperty,
    selectedPropertyIndex,
}: PropertySelectProps) => {
    const foundProperty = properties.find((p) => p.property_name_uuid === selectedProperty.property)

    return (
        <div className="mb-2 flex w-full items-center gap-2">
            {/* PROPERTY NAME */}
            <CommandSelect
                selectedValue={selectedProperty.property}
                defaultValue={selectedProperty.property}
                setSelectedValue={(value) => {
                    const newValue = filteredProperties.find((v) => v.property_name_uuid === value)

                    if (newValue) {
                        const updatedArray = [...selectedProperties]
                        updatedArray.splice(selectedPropertyIndex, 1, {
                            property: newValue.property_name_uuid,
                            value: newValue.values[0].property_value_uuid,
                        })
                        setSelectedProperties(updatedArray)
                    }
                }}
                items={properties.map((value) => ({
                    label: value.property_name,
                    value: value.property_name_uuid,
                }))}
            />
            {/* PROPERTY VALUE */}
            <CommandSelect
                selectedValue={selectedProperty.value}
                defaultValue={selectedProperty.value}
                setSelectedValue={(value) => {
                    const newValue = foundProperty?.values.find((v) => v.property_value_uuid === value)

                    if (newValue) {
                        const updatedArray = [...selectedProperties]
                        updatedArray[selectedPropertyIndex].value = String(value)

                        setSelectedProperties(updatedArray)
                    }
                }}
                items={
                    foundProperty
                        ? foundProperty.values.map((value) => ({
                              label: value.property_value,
                              value: value.property_value_uuid,
                          }))
                        : []
                }
            />
            <Button
                variant="ghost"
                type="button"
                onClick={() => {
                    const updatedArray = selectedProperties.filter((v) => v.property !== selectedProperty.property)

                    setSelectedProperties(updatedArray)
                }}
            >
                <Minus />
            </Button>
        </div>
    )
}
