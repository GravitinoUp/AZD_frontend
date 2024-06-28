import { SortOptions } from './fetch'
import { PropertyValue } from './property'
import { Person } from './user'

export interface Organization {
    organization_uuid: string
    organization_type: OrganizationType
    contact_person: Person
    full_name: string
    short_name: string
    register_number: string
    bic: string
    address: string
    mail_address: string
    phone: string
    ogrn: string
    inn: string
    kpp: string
    okpo: string
    region: string
    fax: string | null
    email: string | null
    additional_info: string | null
    web_site: string | null
    properties?: PropertyValue[]
}

export interface OrganizationPayload {
    organization_uuid?: string
    organization_type_id: number
    contact_person_uuid: string
    full_name: string
    short_name: string
    register_number: string
    bic: string
    address: string
    mail_address: string
    phone: string
    ogrn: string
    inn: string
    kpp: string
    okpo: string
    region: string
    fax?: string
    email?: string
    additional_info?: string
    web_site?: string
    property_values?: string[]
}

export type OrganizationSort = Partial<Record<keyof Organization, SortOptions>>

export interface OrganizationType {
    organization_type_id: number
    organization_type_name: string
}
