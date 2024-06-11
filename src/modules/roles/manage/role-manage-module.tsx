import { useForm } from '@/components/form'
import { InputField } from '@/components/input-field'
import { FormField, FormItem, FormLabel } from '@/ui/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useCreateRole } from './api/use-create-role'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { useSuccessToast } from '@/shared/hooks/use-success-toast'
import { Role } from '@/types/user'
import { useUpdateRole } from './api/use-update-role'
import { useEffect, useMemo, useState } from 'react'
import { ManageLayout } from '@/components/layout'
import { Button } from '@/ui/button'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import { useGetAllPermissions } from './api/use-get-all-permissions'
import { Skeleton } from '@/ui/skeleton'
import { ErrorAlert } from '@/components/error-alert'
import { Checkbox } from '@/ui/checkbox'
import { DebouncedInput } from '@/components/debounced-input'
import { useCreateRolePermission } from './api/use-create-role-permission'

const roleSchema = z.object({
    role_name: z.string().min(1, i18next.t('error.required')),
    permission_ids: z.array(z.string()),
})

export const RoleManageModule = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const role: Role | undefined = location.state?.role

    const form = useForm({
        schema: roleSchema,
        defaultValues: role
            ? {
                  role_name: role.role_name,
                  permission_ids: role.role_permissions
                      ? role.role_permissions.map((value) => value.permission_id)
                      : [],
              }
            : { role_name: '', permission_ids: [] },
    })

    const [permissionQuery, setPermissionQuery] = useState('')
    const {
        data: permissions = [],
        isFetching: permissionsFetching,
        isSuccess: permissionsSuccess,
        error: permissionsError,
    } = useGetAllPermissions()

    const filteredPermissions = permissions.filter(
        (p) =>
            p.permission_name.toLowerCase().includes(permissionQuery.toLowerCase()) ||
            p.permission_description.toLowerCase().includes(permissionQuery.toLowerCase())
    )

    const {
        mutate: createRole,
        data: createdRole,
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

    const {
        mutate: createRolePermission,
        isPending: rolePermissionCreating,
        error: rolePermissionCreateError,
        isSuccess: rolePermissionCreateSuccess,
    } = useCreateRolePermission()

    const handleSubmit = (data: z.infer<typeof roleSchema>) => {
        if (role) {
            updateRole({ role_id: role.role_id, role_name: data.role_name })
        } else {
            createRole({ role_name: data.role_name })
        }
    }

    const createSuccessMessage = useMemo(() => t('toast.success.create.f', { entity: t('role') }), [])
    const updateSuccessMessage = useMemo(() => t('toast.success.update.f', { entity: t('role') }), [])

    useEffect(() => {
        if (roleCreateSuccess) {
            createRolePermission({
                role_id: createdRole.data?.role_id,
                permission_ids: form.getValues('permission_ids'),
                rights: true,
            })
        }
    }, [roleCreateSuccess])

    useSuccessToast(createSuccessMessage, roleCreateSuccess && rolePermissionCreateSuccess, () => navigate(-1))
    useSuccessToast(updateSuccessMessage, roleUpdateSuccess, () => navigate(-1))
    useErrorToast(roleCreateError || roleUpdateError || rolePermissionCreateError)

    return (
        <ManageLayout
            form={form}
            handleSubmit={handleSubmit}
            title={role ? t('manage.user') : t('add.user')}
            actions={
                <>
                    <Button
                        className="h-12 w-[200px] gap-4"
                        loading={roleCreating || roleUpdating || rolePermissionCreating}
                    >
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
                    <FormItem className="flex flex-col items-start">
                        <FormLabel>{t('permissions')}</FormLabel>
                        {permissionsFetching && <Skeleton className="h-[200px] w-full" />}
                        {permissionsError && <ErrorAlert />}
                        {permissionsSuccess && !permissionsFetching && (
                            <div className="flex w-full flex-col gap-2 rounded-xl border p-4">
                                <DebouncedInput
                                    className="mb-2 bg-transparent"
                                    value=""
                                    debounce={0}
                                    onChange={(value) => setPermissionQuery(String(value))}
                                />
                                {filteredPermissions.length === 0 && <p>{t('nothing.found')}</p>}
                                {filteredPermissions.map((permission, index) => (
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
                            </div>
                        )}
                    </FormItem>
                )}
            />
        </ManageLayout>
    )
}
