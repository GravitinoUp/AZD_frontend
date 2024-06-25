export interface Product {
    product_id: number
    product_name: string
    code: string
    properties: Property[]
    product_measurement: string
    product_count: string
}

export interface Property {
    property_name: string
    property_value: string
    property_measurement: string
}
