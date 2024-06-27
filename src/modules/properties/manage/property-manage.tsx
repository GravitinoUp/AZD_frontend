import { useForm } from '@/components/form'
import { InputField } from '@/components/input-field'
import { FormField } from '@/ui/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { useSuccessToast } from '@/shared/hooks/use-success-toast'
import { useMemo } from 'react'
import { ManageLayout } from '@/components/layout'
import { ManageActions } from '@/components/manage-actions'
import { Entity, Property } from '@/types/property'
import { useCreateProperty } from './api/use-create-property'
import { useUpdateProperty } from './api/use-update-property'
import { CommandMultiSelect } from '@/components/command'

const propertySchema = z.object({
    property_name: z.string().min(1, i18next.t('error.required')),
    property_values: z.array(z.string()),
})

export const PropertyManage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const entity: Entity | undefined = location.state?.entity
    const property: Property | undefined = location.state?.property

    const form = useForm({
        schema: propertySchema,
        defaultValues: property
            ? {
                  ...property,
              }
            : {
                  property_name: '',
                  property_values: [],
              },
    })

    const {
        mutate: createProperty,
        isPending: propertyCreating,
        error: propertyCreateError,
        isSuccess: propertyCreateSuccess,
    } = useCreateProperty()

    const {
        mutate: updateProperty,
        isPending: propertyUpdating,
        error: propertyUpdateError,
        isSuccess: propertyUpdateSuccess,
    } = useUpdateProperty()

    const handleSubmit = (data: z.infer<typeof propertySchema>) => {
        if (property) {
            updateProperty({ ...data, property_name_uuid: property.property_name_uuid, entity_name: entity })
        } else {
            createProperty({ ...data, entity_name: entity })
        }
    }

    const createSuccessMessage = useMemo(() => t('toast.success.create.f', { entity: t('organization.title') }), [])
    const updateSuccessMessage = useMemo(() => t('toast.success.update.f', { entity: t('organization.title') }), [])

    useSuccessToast(createSuccessMessage, propertyCreateSuccess, () => navigate(-1))
    useSuccessToast(updateSuccessMessage, propertyUpdateSuccess, () => navigate(-1))
    useErrorToast(propertyCreateError || propertyUpdateError)

    return (
        <ManageLayout
            form={form}
            handleSubmit={handleSubmit}
            title={property ? t('manage-property') : t('add-property')}
            actions={
                <ManageActions
                    editing={typeof property !== 'undefined'}
                    loading={propertyCreating || propertyUpdating}
                />
            }
        >
            <FormField
                control={form.control}
                name="property_name"
                render={({ field }) => <InputField label={t('name')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="property_values"
                render={({ field }) => (
                    <CommandMultiSelect
                        selectedValues={field.value}
                        setSelectedValues={field.onChange}
                        items={[]}
                        canAddMore
                    />
                )}
            />
        </ManageLayout>
    )
}
