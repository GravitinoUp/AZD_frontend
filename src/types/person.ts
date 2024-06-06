interface LegalBasis {
    legal_basis_uuid: string
    legal_basis_name: string
    legal_basis_number: string
    legal_basis_date: string
}

export interface ContactPerson {
    person_uuid: string
    last_name: string
    first_name: string
    patronymic?: string
    post: string
    legal_basis_uuid?: string
    legal_basis: LegalBasis
}
