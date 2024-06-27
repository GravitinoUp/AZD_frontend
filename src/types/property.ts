import { entities } from '@/shared/constants'
import { SortOptions } from './fetch'

export type Entity = (typeof entities)[number]

export interface Property {
    property_name_uuid: string
    property_name: string
    values: PropertyValue[]
    entity_name: string
}

export type PropertySort = Partial<Record<keyof Property, SortOptions>>

export interface PropertyValue {
    property_value_uuid: string
    property_value: string
    property_name_uuid: string
}

export interface PropertyPayload {
    property_name_uuid: string
    property_name: string
    property_values: string[]
    entity_name: Entity
}
