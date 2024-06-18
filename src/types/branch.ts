import { SortOptions } from './fetch'

export interface Branch {
    branch_uuid: string
    branch_name: string
    branch_address: string
}

export type BranchSort = Partial<Record<keyof Branch, SortOptions>>
