import { SortOptions } from './fetch'
import { PropertyValue } from './property'

export interface Branch {
    branch_uuid: string
    branch_name: string
    branch_address: string
    properties?: PropertyValue[]
}

export interface BranchPayload {
    branch_uuid?: string
    branch_name?: string
    branch_address?: string
    property_values?: string[]
}

export type BranchSort = Partial<Record<keyof Branch, SortOptions>>
