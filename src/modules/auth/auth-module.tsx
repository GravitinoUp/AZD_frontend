import { Form, useForm } from '@/components/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useAuth } from './api/use-auth'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormField } from '@/ui/form'
import { InputField } from '@/components/input-field'
import { Button } from '@/ui/button'
import { setCookieValue } from '@/shared/lib/set-cookie-value'
import { REGISTER } from '@/shared/router/routes'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/types/fetch'
import { AppLogo } from '@/components/app-logo'
import { Watermark } from '@/components/watermark'
import { LOGIN_IMAGES } from '@/shared/constants'
import { Eye, EyeOff } from 'lucide-react'

const authSchema = z.object({
    email: z.string().email(i18next.t('error.email.format')),
    password: z.string().min(1, i18next.t('error.required')),
})

export const AuthModule = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [passwordShown, setPasswordShown] = useState(false)
    const [bgImage, setBgImage] = useState('')

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

    useEffect(() => {
        if (authError) {
            const axiosError = authError as AxiosError
            const errorResponse = axiosError.response?.data as ErrorResponse

            form.setError('password', { message: errorResponse.message ? errorResponse.message : '' })
        }
    }, [authError])

    useEffect(() => {
        setBgImage(LOGIN_IMAGES[Math.floor(1 + Math.random() * 9)])
    }, [])

    return (
        <>
            <div className="absolute h-full w-1/2 overflow-hidden">
                <img
                    src={bgImage}
                    draggable={false}
                    className="h-screen w-screen animate-scale-infinite select-none object-cover"
                />
            </div>
            <div className="flex h-screen w-screen justify-end">
                <div className="flex-center z-10 h-full w-full flex-col bg-white md:w-2/3 lg:w-1/2">
                    <div className="flex-grow" />
                    <AppLogo variant="dark" expanded />
                    <p className="mb-5 mt-10 text-center">{t('provide.description')}</p>
                    <Form className="w-3/4 max-w-[500px]" form={form} onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <InputField label="Email" inputClassName="rounded-2xl" required {...field} />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <InputField
                                        label={t('password')}
                                        type={passwordShown ? 'text' : 'password'}
                                        inputClassName="rounded-2xl"
                                        required
                                        suffixIcon={
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="h-12 rounded-l-none rounded-r-xl px-4"
                                                onClick={() => setPasswordShown(!passwordShown)}
                                            >
                                                {passwordShown ? (
                                                    <Eye size={20} strokeWidth={2.4} color="#3F434A" />
                                                ) : (
                                                    <EyeOff size={20} strokeWidth={2.4} color="#3F434A" />
                                                )}
                                            </Button>
                                        }
                                        {...field}
                                    />
                                )}
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
                    <div className="flex-grow" />
                    <Watermark />
                </div>
            </div>
        </>
    )
}
