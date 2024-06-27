import { SortOptions } from './fetch'

export type Entity = 'users' | 'branch' | 'organization' | 'purchase' | 'plan' | 'roles'

export interface Property {
    property_name_uuid: string
    property_name: string
    entity_name: string
}

export type PropertySort = Partial<Record<keyof Property, SortOptions>>

export interface PropertyPayload {
    property_name_uuid: string
    property_name: string
    property_values: string[]
    entity_name: Entity
}
