import { useForm } from '@/components/form'
import { InputField } from '@/components/input-field'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useCreateUser } from './api/use-create-user'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { useSuccessToast } from '@/shared/hooks/use-success-toast'
import { placeholderQuery } from '@/shared/constants'
import { CommandSelect } from '@/components/command'
import { ErrorAlert } from '@/components/error-alert'
import { Skeleton } from '@/ui/skeleton'
import { User } from '@/types/user'
import { useUpdateUser } from './api/use-update-user'
import { useMemo } from 'react'
import { ManageLayout } from '@/components/layout'
import { Button } from '@/ui/button'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import { useGetAllRoles } from '@/modules/roles/api/use-get-all-roles'
import { PropertyField } from '@/components/property-select'

const userSchema = z.object({
    last_name: z.string().min(1, i18next.t('error.required')),
    first_name: z.string().min(1, i18next.t('error.required')),
    patronymic: z.string().optional(),
    post: z.string().min(1, i18next.t('error.required')),
    role_id: z.number().min(1, i18next.t('error.required')),
    legal_basis_uuid: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email(i18next.t('error.email.format')),
    password: z.string().min(6, i18next.t('error.password.length')),
    property_values: z.array(z.object({ property: z.string(), value: z.string() }).required()),
})

export const UserManageModule = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const user: User | undefined = location.state?.user

    const {
        data: roles = { count: 0, data: [] },
        isFetching: rolesFetching,
        isSuccess: rolesSuccess,
        error: rolesError,
    } = useGetAllRoles(placeholderQuery)

    const form = useForm({
        schema: userSchema,
        defaultValues: user
            ? {
                  last_name: user.person.last_name,
                  first_name: user.person.first_name,
                  post: user.person.post,
                  role_id: user.role.role_id,
                  email: user.email,
                  password: '',
                  property_values: [],
              }
            : {
                  last_name: '',
                  first_name: '',
                  post: '',
                  role_id: 1,
                  email: '',
                  password: '',
                  property_values: [],
              },
    })

    const formattedRoles = roles.data.map((value) => ({ value: value.role_id, label: value.role_name }))

    const formattedLegalBasisList = [
        { value: '', label: 'Нет' },
        { value: 'uuid-1', label: 'Тест 1' },
        { value: 'uuid-2', label: 'Тест 2' },
        { value: 'uuid-3', label: 'Тест 3' },
    ]

    const {
        mutate: createUser,
        isPending: userCreating,
        error: userCreateError,
        isSuccess: userCreateSuccess,
    } = useCreateUser()

    const {
        mutate: updateUser,
        isPending: userUpdating,
        error: userUpdateError,
        isSuccess: userUpdateSuccess,
    } = useUpdateUser()

    const handleSubmit = (data: z.infer<typeof userSchema>) => {
        if (user) {
            updateUser(data)
        } else {
            createUser(data)
        }
    }

    const createSuccessMessage = useMemo(() => t('toast.success.create.m', { entity: t('user') }), [])
    const updateSuccessMessage = useMemo(() => t('toast.success.update.m', { entity: t('user') }), [])

    useSuccessToast(createSuccessMessage, userCreateSuccess, () => navigate(-1))
    useSuccessToast(updateSuccessMessage, userUpdateSuccess, () => navigate(-1))
    useErrorToast(userCreateError || userUpdateError)

    return (
        <ManageLayout
            form={form}
            handleSubmit={handleSubmit}
            title={user ? t('manage.user') : t('add.user')}
            actions={
                <>
                    <Button className="h-12 w-[200px] gap-4" loading={userCreating || userUpdating}>
                        <PlusCircleIcon />
                        {user ? t('action.edit') : t('action.add')}
                    </Button>
                    <Button
                        className="h-12 w-[200px] bg-secondary text-destructive"
                        variant="outline"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        {t('action.cancel')}
                    </Button>
                </>
            }
        >
            <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => <InputField label={t('last.name')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => <InputField label={t('first.name')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="patronymic"
                render={({ field }) => <InputField label={t('patronymic')} {...field} />}
            />
            <FormField
                control={form.control}
                name="post"
                render={({ field }) => <InputField label={t('post')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="role_id"
                render={({ field }) => (
                    <FormItem className="flex flex-45 flex-col items-start space-y-2">
                        <FormLabel>{t('role')}</FormLabel>
                        {rolesFetching && <Skeleton className="h-12 w-full" />}
                        {rolesError && <ErrorAlert />}
                        {rolesSuccess && !rolesFetching && (
                            <CommandSelect
                                selectedValue={field.value ? field.value : 0}
                                setSelectedValue={(value) => field.onChange(value !== '' ? value : 0)}
                                items={formattedRoles}
                            />
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="legal_basis_uuid"
                render={({ field }) => (
                    <FormItem className="flex flex-45 flex-col items-start space-y-2">
                        <FormLabel>{t('legal.basis')}</FormLabel>
                        <CommandSelect
                            placeholder="Нет"
                            selectedValue={field.value ? field.value : ''}
                            setSelectedValue={(value) => field.onChange(value !== '' ? value : undefined)}
                            items={formattedLegalBasisList}
                        />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => <InputField label="Email" required {...field} />}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => <InputField label={t('password')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="property_values"
                render={({ field }) => (
                    <PropertyField
                        entity="users"
                        selectedProperties={field.value}
                        setSelectedProperties={field.onChange}
                    />
                )}
            />
        </ManageLayout>
    )
}
