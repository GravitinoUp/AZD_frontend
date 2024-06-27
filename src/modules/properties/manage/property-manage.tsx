import { useForm } from '@/components/form'
import { InputField } from '@/components/input-field'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
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
import { CommandMultiSelect, CommandSelect } from '@/components/command'
import { entities } from '@/shared/constants'

const propertySchema = z.object({
    property_name: z.string().min(1, i18next.t('error.required')),
    property_values: z.array(z.string()),
    entity_name: z.string().min(1, i18next.t('error.required')),
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
                  property_values: property.values.map((value) => value.property_value),
              }
            : {
                  property_name: '',
                  property_values: [],
                  entity_name: entity,
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
            updateProperty({
                ...data,
                property_name_uuid: property.property_name_uuid,
                entity_name: data.entity_name as Entity,
            })
        } else {
            createProperty({ ...data, entity_name: data.entity_name as Entity })
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
                name="entity_name"
                render={({ field }) => (
                    <FormItem className="flex w-full flex-col items-start space-y-2">
                        <FormLabel className="label-required">{t('entity')}</FormLabel>
                        <CommandSelect
                            selectedValue={field.value}
                            setSelectedValue={field.onChange}
                            items={entities.map((value) => ({ label: t(`properties.${value}`), value: value }))}
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="property_name"
                render={({ field }) => <InputField label={t('name')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="property_values"
                render={({ field }) => (
                    <FormItem className="flex flex-45 flex-col items-start space-y-2">
                        <FormLabel className="label-required">{t('values')}</FormLabel>
                        <CommandMultiSelect
                            selectedValues={field.value}
                            setSelectedValues={field.onChange}
                            items={[]}
                            canAddMore
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
        </ManageLayout>
    )
}
