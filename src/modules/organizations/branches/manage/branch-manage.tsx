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
import { Branch } from '@/types/branch'
import { useUpdateBranch } from './api/use-update-branch'
import { useCreateBranch } from './api/use-create-branch'
import { propertiesSchema } from '@/modules/properties/constants'
import { PropertyField } from '@/components/property-select'
import { getProperties } from '@/shared/lib/get-properties'

const branchSchema = z.object({
    branch_name: z.string().min(1, i18next.t('error.required')),
    branch_address: z.string().min(1, i18next.t('error.required')),
    property_values: z.array(propertiesSchema),
})

export const BranchManage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const branch: Branch | undefined = location.state?.branch

    const form = useForm({
        schema: branchSchema,
        defaultValues: branch
            ? {
                  ...branch,
                  property_values: getProperties(branch.properties),
              }
            : {
                  branch_name: '',
                  branch_address: '',
                  property_values: [],
              },
    })

    const {
        mutate: createBranch,
        isPending: branchCreating,
        error: branchCreateError,
        isSuccess: branchCreateSuccess,
    } = useCreateBranch()

    const {
        mutate: updateBranch,
        isPending: branchUpdating,
        error: branchUpdateError,
        isSuccess: branchUpdateSuccess,
    } = useUpdateBranch()

    const handleSubmit = (data: z.infer<typeof branchSchema>) => {
        if (branch) {
            updateBranch({
                ...data,
                branch_uuid: branch.branch_uuid,
                property_values: data.property_values.map((property) => property.value),
            })
        } else {
            createBranch({ ...data, property_values: data.property_values.map((property) => property.value) })
        }
    }

    const createSuccessMessage = useMemo(() => t('toast.success.create.f', { entity: t('organization.title') }), [])
    const updateSuccessMessage = useMemo(() => t('toast.success.update.f', { entity: t('organization.title') }), [])

    useSuccessToast(createSuccessMessage, branchCreateSuccess, () => navigate(-1))
    useSuccessToast(updateSuccessMessage, branchUpdateSuccess, () => navigate(-1))
    useErrorToast(branchCreateError || branchUpdateError)

    return (
        <ManageLayout
            form={form}
            handleSubmit={handleSubmit}
            title={branch ? t('manage.branch') : t('add.branch')}
            actions={
                <ManageActions editing={typeof branch !== 'undefined'} loading={branchCreating || branchUpdating} />
            }
        >
            <FormField
                control={form.control}
                name="branch_name"
                render={({ field }) => <InputField label={t('name')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="branch_address"
                render={({ field }) => <InputField label={t('address')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="property_values"
                render={({ field }) => (
                    <PropertyField
                        entity="branch"
                        selectedProperties={field.value}
                        setSelectedProperties={field.onChange}
                    />
                )}
            />
        </ManageLayout>
    )
}
