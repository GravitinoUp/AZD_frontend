import { Product } from '@/types/product'
import { Button } from '@/ui/button'
import PenAltIcon from '@/assets/icons/pen_alt.svg'
import MinusIcon from '@/assets/icons/minus.svg'
import { useTranslation } from 'react-i18next'

interface ProductItemProps {
    value: Product
    onEdit: () => void
    onDelete: () => void
}

export const ProductItem = ({ value, onEdit, onDelete }: ProductItemProps) => {
    const { t } = useTranslation()

    return (
        <div className="flex w-full flex-col rounded-xl px-6 py-4 shadow-product">
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                    <p className="font-semibold">{`${t('name')}: ${value.product_name}`}</p>
                    <p className="font-semibold">{`${t('product-code')}: ${value.code}`}</p>
                    <p className="text-primary/50">
                        {`${t('count')}: ${value.product_count} ${t('measurement')}: ${value.product_measurement}`}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button className="h-8 w-8 border border-table" type="button" size="icon" onClick={onEdit}>
                        <PenAltIcon />
                    </Button>
                    <Button
                        className="h-8 w-8 border border-table bg-muted hover:bg-muted/50"
                        type="button"
                        size="icon"
                        onClick={onDelete}
                    >
                        <MinusIcon />
                    </Button>
                </div>
            </div>
            <p className="mt-2 self-start font-semibold">{t('properties')}:</p>
            <div className="ml-4 mt-1 flex flex-col items-start">
                {value.properties.map((property, index) => (
                    <p key={index}>
                        <span className="font-medium">{property.property_name}</span> – {property.property_value}{' '}
                        {property.property_measurement}
                    </p>
                ))}
            </div>
        </div>
    )
}
