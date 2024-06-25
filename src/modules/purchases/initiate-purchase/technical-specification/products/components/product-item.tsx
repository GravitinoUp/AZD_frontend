import { Product } from '@/types/product'
import { Button } from '@/ui/button'
import PenAltIcon from '@/assets/icons/pen_alt.svg'
import MinusIcon from '@/assets/icons/minus.svg'

interface ProductItemProps {
    value: Product
    onEdit: () => void
    onDelete: () => void
}

export const ProductItem = ({ value, onEdit, onDelete }: ProductItemProps) => (
    <div className="flex w-full flex-col rounded-xl px-6 py-4 shadow-product">
        <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">
                {value.product_name} – {value.code}
                <span className="text-primary/50">{` (${value.product_count} ${value.product_measurement})`}</span>
            </p>
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
        <div className="ml-4 mt-2 flex flex-col items-start gap-1">
            {value.properties.map((property, index) => (
                <p key={index}>
                    <span className="font-medium">{property.property_name}</span> – {property.property_value}{' '}
                    {property.property_measurement}
                </p>
            ))}
        </div>
    </div>
)
