import { Form, useForm } from '@/components/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useAuth } from './api/use-auth'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormField } from '@/ui/form'
import { InputField } from '@/components/input-field'
import { Button } from '@/ui/button'
import { setCookieValue } from '@/shared/lib/set-cookie-value'
import { REGISTER } from '@/shared/router/routes'

const authSchema = z.object({
    email: z.string().email(i18next.t('error.email.format')),
    password: z.string().min(1, i18next.t('error.required')),
})

export const AuthModule = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const form = useForm({
        schema: authSchema,
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const {
        mutate: authUser,
        data: authData,
        isPending: authPending,
        error: authError,
        isSuccess: authSuccess,
    } = useAuth()

    const handleSubmit = (data: z.infer<typeof authSchema>) => {
        authUser(data)
    }

    useEffect(() => {
        if (authSuccess) {
            setCookieValue('accessToken', authData.accessToken, '43200')
            setCookieValue('refreshToken', authData.refreshToken, '')

            navigate('/', { replace: true })
        }
    }, [authSuccess])

    useErrorToast(authError)

    return (
        <div className="flex h-screen w-screen justify-end bg-black">
            <div className="flex-center h-full w-full flex-col bg-white md:w-2/3 lg:w-1/2">
                <h1 className="text-xl font-bold">{t('app-name')}</h1>
                <p className="mb-5 mt-10 text-center">{t('provide.description')}</p>
                <Form className="w-3/4 max-w-[500px]" form={form} onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
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
                        <Button className="h-[50px] rounded-2xl shadow-xl" loading={authPending}>
                            {t('action.auth')}
                        </Button>
                    </div>
                </Form>
                <Link to={REGISTER} className="mt-10 rounded-md px-4 py-2 hover:bg-black/5">
                    <p className="text-base font-normal">
                        {t('no.account')} <span className="font-semibold">{t('action.register')}</span>
                    </p>
                </Link>
            </div>
        </div>
    )
}
