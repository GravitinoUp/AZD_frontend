import { useForm } from '@/components/form'
import { InputField } from '@/components/input-field'
import { FormField, FormItem, FormLabel } from '@/ui/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useCreateRole } from './api/useCreateRole'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { useSuccessToast } from '@/shared/hooks/use-success-toast'
import { Role } from '@/types/user'
import { useUpdateRole } from './api/useUpdateRole'
import { useMemo } from 'react'
import { ManageLayout } from '@/components/layout'
import { Button } from '@/ui/button'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import { useGetAllPermissions } from './api/useGetAllPermissions'
import { Skeleton } from '@/ui/skeleton'
import { ErrorAlert } from '@/components/error-alert'
import { Checkbox } from '@/ui/checkbox'

const roleSchema = z.object({
    role_name: z.string().min(1, i18next.t('error.required')),
    permission_ids: z.array(z.number()),
})

export const RoleManageModule = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const role: Role | undefined = location.state?.role

    const form = useForm({
        schema: roleSchema,
        defaultValues: role ? { role_name: role.role_name, permission_ids: [] } : { role_name: '', permission_ids: [] },
    })

    const { data: permissions = [], isFetching: permissionsFetching, error: permissionsError } = useGetAllPermissions()

    const {
        mutate: createRole,
        isPending: roleCreating,
        error: roleCreateError,
        isSuccess: roleCreateSuccess,
    } = useCreateRole()

    const {
        mutate: updateRole,
        isPending: roleUpdating,
        error: roleUpdateError,
        isSuccess: roleUpdateSuccess,
    } = useUpdateRole()

    const handleSubmit = (data: z.infer<typeof roleSchema>) => {
        if (role) {
            updateRole({ role_id: role.role_id, role_name: data.role_name })
        } else {
            createRole({ role_name: data.role_name })
        }
    }

    const createSuccessMessage = useMemo(() => t('toast.success.create.f', { entity: t('role') }), [])
    const updateSuccessMessage = useMemo(() => t('toast.success.update.f', { entity: t('role') }), [])

    useSuccessToast(createSuccessMessage, roleCreateSuccess, () => navigate(-1))
    useSuccessToast(updateSuccessMessage, roleUpdateSuccess, () => navigate(-1))
    useErrorToast(void 0, roleCreateError || roleUpdateError)

    return (
        <ManageLayout
            form={form}
            handleSubmit={handleSubmit}
            title={role ? t('manage.user') : t('add.user')}
            actions={
                <>
                    <Button className="h-12 w-[200px] gap-4" loading={roleCreating || roleUpdating}>
                        <PlusCircleIcon />
                        {role ? t('action.edit') : t('action.add')}
                    </Button>
                    <Button
                        className="text- h-12 w-[200px] bg-secondary text-destructive"
                        variant="outline"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        {t('action.cancel')}
                    </Button>
                </>
            }
            className="flex-col flex-nowrap"
        >
            <FormField
                control={form.control}
                name="role_name"
                render={({ field }) => <InputField label={t('name')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="permission_ids"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('permissions')}</FormLabel>
                        {permissionsFetching && <Skeleton className="h-12 w-full" />}
                        {permissionsError && <ErrorAlert />}
                        {permissions.map((permission, index) => (
                            <Checkbox
                                key={index}
                                id={String(index)}
                                label={permission.permission_name}
                                checked={field.value.includes(permission.permission_id)}
                                onCheckedChange={(checked) =>
                                    checked
                                        ? field.onChange([...field.value, permission.permission_id])
                                        : field.onChange(
                                              field.value.filter((value) => value !== permission.permission_id)
                                          )
                                }
                            />
                        ))}
                    </FormItem>
                )}
            />
        </ManageLayout>
    )
}
