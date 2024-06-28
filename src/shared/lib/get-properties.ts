import { PropertyValue } from '@/types/property'

export const getProperties = (properties?: PropertyValue[]) =>
    properties
        ? properties.map((property) => ({
              property: property.property_name_uuid,
              value: property.property_value_uuid,
          }))
        : []
