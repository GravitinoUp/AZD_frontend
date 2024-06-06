import { OrganizationType } from '@/types/organization.ts'
import { ContactPerson } from '@/types/person.ts'

export interface Branch {
    organization_uuid: string
    organization_type_id: number
    organization_type: OrganizationType
    contact_person_uuid: string
    contact_person: ContactPerson
    full_name: string
    short_name: string
    register_number: string
    bic: string
    address: string
    mail_address: string
    phone: string
    fax?: string
    email?: string
    ogrn: string
    inn: string
    kpp: string
    okpo: string
    region: string
    additional_info?: string
    web_site?: string
}
