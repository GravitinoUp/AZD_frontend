import { useForm } from '@/components/form'
import { InputField } from '@/components/input-field'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useCreateOrganization } from './api/use-create-organization'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { useSuccessToast } from '@/shared/hooks/use-success-toast'
import { useUpdateOrganization } from './api/use-update-organization'
import { useMemo } from 'react'
import { ManageLayout } from '@/components/layout'
import { Organization } from '@/types/organization'
import { ManageActions } from '@/components/manage-actions'
import { useGetAllOrganizationTypes } from '../api/use-get-all-organization-types'
import { Skeleton } from '@/ui/skeleton'
import { ErrorAlert } from '@/components/error-alert'
import { CommandSelect } from '@/components/command'
import { useGetAllPeople } from '@/modules/users/api/use-get-all-people'
import { formatInitials } from '@/shared/lib/format-initials'
import { placeholderQuery } from '@/shared/constants'
import { Button } from '@/ui/button'

const organizationSchema = z
    .object({
        is_organization: z.boolean(),
        organization_type_id: z.number().min(1, i18next.t('error.required')),
        contact_person_uuid: z.string(),
        full_name: z.string().min(1, i18next.t('error.required')),
        short_name: z.string().min(1, i18next.t('error.required')),
        register_number: z.string(),
        bic: z.string(),
        address: z.string().min(1, i18next.t('error.required')),
        mail_address: z.string(),
        phone: z.string(),
        ogrn: z.string(),
        inn: z.string(),
        kpp: z.string(),
        okpo: z.string(),
        region: z.string(),
        fax: z.string().optional(),
        email: z.string().optional(),
        additional_info: z.string().optional(),
        web_site: z.string().optional(),
    })
    .superRefine((values, ctx) => {
        if (values.is_organization) {
            if (!values.contact_person_uuid) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['contact_person_uuid'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.register_number) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['register_number'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.bic) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['bic'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.mail_address) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['mail_address'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.phone) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['phone'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.ogrn) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['ogrn'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.inn) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['inn'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.kpp) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['kpp'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.okpo) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['okpo'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.region) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['region'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
        }
    })

export const OrganizationManageModule = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const organization: Organization | undefined = location.state?.organization

    const form = useForm({
        schema: organizationSchema,
        defaultValues: organization
            ? {
                  ...organization,
                  is_organization: true,
                  contact_person_uuid: organization.contact_person.person_uuid,
                  organization_type_id: organization.organization_type.organization_type_id,
                  fax: organization.fax ? organization.fax : undefined,
                  email: organization.email ? organization.email : undefined,
                  additional_info: organization.additional_info ? organization.additional_info : undefined,
                  web_site: organization.web_site ? organization.web_site : undefined,
              }
            : {
                  is_organization: true,
                  organization_type_id: 0,
                  contact_person_uuid: '',
                  full_name: '',
                  short_name: '',
                  register_number: '',
                  bic: '',
                  address: '',
                  mail_address: '',
                  phone: '',
                  ogrn: '',
                  inn: '',
                  kpp: '',
                  okpo: '',
                  region: '',
              },
    })

    const is_organization = form.watch('is_organization')

    const {
        data: organizationTypes = [],
        isFetching: organizationTypesFetching,
        isSuccess: organizationTypesSuccess,
        error: organizationTypesError,
    } = useGetAllOrganizationTypes()
    const formattedTypes = organizationTypes.map((value) => ({
        value: value.organization_type_id,
        label: value.organization_type_name,
    }))

    const {
        data: people = [],
        isFetching: peopleFetching,
        isSuccess: peopleSuccess,
        error: peopleError,
    } = useGetAllPeople(placeholderQuery)
    const formattedPeople = people.map((value) => ({
        value: value.person_uuid,
        label: formatInitials(value.last_name, value.first_name, value.patronymic),
    }))

    const {
        mutate: createOrganization,
        isPending: organizationCreating,
        error: organizationCreateError,
        isSuccess: organizationCreateSuccess,
    } = useCreateOrganization()

    const {
        mutate: updateOrganization,
        isPending: organizationUpdating,
        error: organizationUpdateError,
        isSuccess: organizationUpdateSuccess,
    } = useUpdateOrganization()

    const {
        mutate: createBranch,
        isPending: branchCreating,
        error: branchCreateError,
        isSuccess: branchCreateSuccess,
    } = useCreateOrganization()

    const {
        mutate: updateBranch,
        isPending: branchUpdating,
        error: branchUpdateError,
        isSuccess: branchUpdateSuccess,
    } = useUpdateOrganization()

    const handleSubmit = (data: z.infer<typeof organizationSchema>) => {
        if (is_organization) {
            if (organization) {
                updateOrganization(data)
            } else {
                createOrganization(data)
            }
        } else {
            if (organization) {
                updateBranch(data)
            } else {
                createBranch(data)
            }
        }
    }

    const createSuccessMessage = useMemo(() => t('toast.success.create.f', { entity: t('organization.title') }), [])
    const updateSuccessMessage = useMemo(() => t('toast.success.update.f', { entity: t('organization.title') }), [])

    useSuccessToast(createSuccessMessage, organizationCreateSuccess || branchCreateSuccess, () => navigate(-1))
    useSuccessToast(updateSuccessMessage, organizationUpdateSuccess || branchUpdateSuccess, () => navigate(-1))
    useErrorToast(organizationCreateError || organizationUpdateError || branchCreateError || branchUpdateError)

    return (
        <ManageLayout
            form={form}
            handleSubmit={handleSubmit}
            title={organization ? t('manage.organization') : t('add.organization')}
            actions={
                <ManageActions
                    editing={typeof organization !== 'undefined'}
                    loading={organizationCreating || organizationUpdating || branchCreating || branchUpdating}
                />
            }
        >
            <FormField
                control={form.control}
                name="is_organization"
                render={({ field }) => (
                    <FormItem className="flex-center w-full gap-2 space-y-0">
                        <Button
                            className="w-[120px]"
                            type="button"
                            variant={field.value ? 'default' : 'outline'}
                            onClick={() => field.onChange(true)}
                        >
                            {t('organization.title')}
                        </Button>
                        <Button
                            className="w-[120px]"
                            type="button"
                            variant={!field.value ? 'default' : 'outline'}
                            onClick={() => field.onChange(false)}
                        >
                            {t('branch')}
                        </Button>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => <InputField label={t('organization.full.name')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="short_name"
                render={({ field }) => <InputField label={t('organization.short.name')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => <InputField label={t('address')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="organization_type_id"
                render={({ field }) => (
                    <FormItem className="flex flex-45 flex-col items-start space-y-2">
                        <FormLabel className="label-required">{t('organization.type')}</FormLabel>
                        {organizationTypesFetching && <Skeleton className="h-12 w-full" />}
                        {organizationTypesError && <ErrorAlert />}
                        {organizationTypesSuccess && !organizationTypesFetching && (
                            <CommandSelect
                                selectedValue={field.value ? field.value : 0}
                                setSelectedValue={(value) => field.onChange(value !== '' ? value : 0)}
                                items={formattedTypes}
                            />
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="mail_address"
                render={({ field }) => <InputField label={t('mail.address')} required={is_organization} {...field} />}
            />
            <FormField
                control={form.control}
                name="contact_person_uuid"
                render={({ field }) => (
                    <FormItem className="flex flex-45 flex-col items-start space-y-2">
                        <FormLabel className={is_organization ? 'label-required' : ''}>
                            {t('organization.contact.person')}
                        </FormLabel>
                        {peopleFetching && <Skeleton className="h-12 w-full" />}
                        {peopleError && <ErrorAlert />}
                        {peopleSuccess && !peopleFetching && (
                            <CommandSelect
                                selectedValue={field.value ? field.value : ''}
                                setSelectedValue={field.onChange}
                                items={formattedPeople}
                            />
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="register_number"
                render={({ field }) => (
                    <InputField label={t('organization.register.number')} required={is_organization} {...field} />
                )}
            />
            <FormField
                control={form.control}
                name="bic"
                render={({ field }) => (
                    <InputField label={t('organization.bic')} required={is_organization} {...field} />
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => <InputField label={t('phone')} required={is_organization} {...field} />}
            />
            <FormField
                control={form.control}
                name="ogrn"
                render={({ field }) => (
                    <InputField label={t('organization.ogrn')} required={is_organization} {...field} />
                )}
            />
            <FormField
                control={form.control}
                name="inn"
                render={({ field }) => (
                    <InputField label={t('organization.inn')} required={is_organization} {...field} />
                )}
            />
            <FormField
                control={form.control}
                name="kpp"
                render={({ field }) => (
                    <InputField label={t('organization.kpp')} required={is_organization} {...field} />
                )}
            />
            <FormField
                control={form.control}
                name="okpo"
                render={({ field }) => (
                    <InputField label={t('organization.okpo')} required={is_organization} {...field} />
                )}
            />
            <FormField
                control={form.control}
                name="region"
                render={({ field }) => <InputField label={t('region')} required={is_organization} {...field} />}
            />
            <FormField
                control={form.control}
                name="fax"
                render={({ field }) => <InputField label={t('organization.fax')} {...field} />}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => <InputField label="Email" {...field} />}
            />
            <FormField
                control={form.control}
                name="additional_info"
                render={({ field }) => <InputField label={t('additional.info')} {...field} />}
            />
            <FormField
                control={form.control}
                name="web_site"
                render={({ field }) => <InputField label={t('web.site')} {...field} />}
            />
        </ManageLayout>
    )
}
