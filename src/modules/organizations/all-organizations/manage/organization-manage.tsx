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
import { Skeleton } from '@/ui/skeleton'
import { ErrorAlert } from '@/components/error-alert'
import { CommandSelect } from '@/components/command'
import { useGetAllPeople } from '@/modules/users/api/use-get-all-people'
import { formatInitials } from '@/shared/lib/format-initials'
import { placeholderQuery } from '@/shared/constants'
import { useGetAllOrganizationTypes } from '../api/use-get-all-organization-types'

const organizationSchema = z.object({
    organization_type_id: z.number().min(1, i18next.t('error.required')),
    contact_person_uuid: z.string().min(1, i18next.t('error.required')),
    full_name: z.string().min(1, i18next.t('error.required')),
    short_name: z.string().min(1, i18next.t('error.required')),
    register_number: z.string().min(1, i18next.t('error.required')),
    bic: z.string().min(1, i18next.t('error.required')),
    address: z.string().min(1, i18next.t('error.required')),
    mail_address: z.string().min(1, i18next.t('error.required')),
    phone: z.string().min(1, i18next.t('error.required')),
    ogrn: z.string().min(1, i18next.t('error.required')),
    inn: z.string().min(1, i18next.t('error.required')),
    kpp: z.string().min(1, i18next.t('error.required')),
    okpo: z.string().min(1, i18next.t('error.required')),
    region: z.string().min(1, i18next.t('error.required')),
    fax: z.string().optional(),
    email: z.string().optional(),
    additional_info: z.string().optional(),
    web_site: z.string().optional(),
})

export const OrganizationManage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const organization: Organization | undefined = location.state?.organization

    const form = useForm({
        schema: organizationSchema,
        defaultValues: organization
            ? {
                  ...organization,
                  contact_person_uuid: organization.contact_person.person_uuid,
                  organization_type_id: organization.organization_type.organization_type_id,
                  fax: organization.fax ? organization.fax : undefined,
                  email: organization.email ? organization.email : undefined,
                  additional_info: organization.additional_info ? organization.additional_info : undefined,
                  web_site: organization.web_site ? organization.web_site : undefined,
              }
            : {
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

    const handleSubmit = (data: z.infer<typeof organizationSchema>) => {
        if (organization) {
            updateOrganization(data)
        } else {
            createOrganization(data)
        }
    }

    const createSuccessMessage = useMemo(() => t('toast.success.create.f', { entity: t('organization.title') }), [])
    const updateSuccessMessage = useMemo(() => t('toast.success.update.f', { entity: t('organization.title') }), [])

    useSuccessToast(createSuccessMessage, organizationCreateSuccess, () => navigate(-1))
    useSuccessToast(updateSuccessMessage, organizationUpdateSuccess, () => navigate(-1))
    useErrorToast(organizationCreateError || organizationUpdateError)

    return (
        <ManageLayout
            form={form}
            handleSubmit={handleSubmit}
            title={organization ? t('manage.organization') : t('add.organization')}
            actions={
                <ManageActions
                    editing={typeof organization !== 'undefined'}
                    loading={organizationCreating || organizationUpdating}
                />
            }
        >
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
                render={({ field }) => <InputField label={t('mail.address')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="contact_person_uuid"
                render={({ field }) => (
                    <FormItem className="flex flex-45 flex-col items-start space-y-2">
                        <FormLabel className="label-required">{t('organization.contact.person')}</FormLabel>
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
                render={({ field }) => <InputField label={t('organization.register.number')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="bic"
                render={({ field }) => <InputField label={t('organization.bic')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => <InputField label={t('phone')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="ogrn"
                render={({ field }) => <InputField label={t('organization.ogrn')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="inn"
                render={({ field }) => <InputField label={t('organization.inn')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="kpp"
                render={({ field }) => <InputField label={t('organization.kpp')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="okpo"
                render={({ field }) => <InputField label={t('organization.okpo')} required {...field} />}
            />
            <FormField
                control={form.control}
                name="region"
                render={({ field }) => <InputField label={t('region')} required {...field} />}
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
