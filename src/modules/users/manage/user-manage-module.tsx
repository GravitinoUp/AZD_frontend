import CommandSelect from '@/components/command/command-select'
import Form, { useForm } from '@/components/form/form'
import { InputField } from '@/components/input-field/input-field'
import { FormField, FormItem, FormLabel } from '@/ui/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const userSchema = z.object({
    last_name: z.string(),
    first_name: z.string(),
    patronymic: z.string().optional(),
    post: z.string(),
    role_id: z.number(),
    legal_basis_id: z.number().optional(),
    phone: z.string().optional(),
    email: z.string().email(i18next.t('error.email.format')),
    password: z.string().min(6, i18next.t('error.password.length')),
})

export const UserManageModule = () => {
    const { t } = useTranslation()

    const form = useForm({
        schema: userSchema,
        defaultValues: {
            last_name: '',
            first_name: '',
            post: '',
            role_id: 1,
            email: '',
            password: '',
        },
    })

    const formattedLegalBasisList = [
        { value: '', label: 'Нет' },
        { value: 1, label: 'Тест 1' },
        { value: 2, label: 'Тест 2' },
        { value: 3, label: 'Тест 3' },
    ]

    const handleSubmit = () => {
        // TODO create or manage
    }

    return (
        <div className="mx-auto w-[95%]">
            <h1 className="my-20 text-3xl font-bold">{t('add.user')}</h1>
            <Form className="rounded-xl border bg-white" form={form} onSubmit={handleSubmit}>
                <div className="mx-auto flex w-[80%] flex-wrap gap-x-20 gap-y-10 py-10">
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
                                <CommandSelect
                                    placeholder="Нет"
                                    selectedValue={field.value ? field.value : 0}
                                    setSelectedValue={(value) => field.onChange(value !== '' ? value : 0)}
                                    items={formattedLegalBasisList}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="legal_basis_id"
                        render={({ field }) => (
                            <FormItem className="flex flex-45 flex-col items-start space-y-2">
                                <FormLabel>{t('legal.basis')}</FormLabel>
                                <CommandSelect
                                    placeholder="Нет"
                                    selectedValue={field.value ? field.value : 0}
                                    setSelectedValue={(value) => field.onChange(value !== '' ? value : 0)}
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
                </div>
            </Form>
        </div>
    )
}
