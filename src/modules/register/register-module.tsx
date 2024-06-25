import { Form, useForm } from '@/components/form'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormField } from '@/ui/form'
import { InputField } from '@/components/input-field'
import { Button } from '@/ui/button'
import { AUTH } from '@/shared/router/routes'
import { useRegister } from './api/use-register'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/types/fetch'
import { AppLogo } from '@/components/app-logo'
import { Watermark } from '@/components/watermark'
import { LOGIN_IMAGES } from '@/shared/constants'
import { Eye, EyeOff } from 'lucide-react'

const registerSchema = z
    .object({
        last_name: z.string().min(1, i18next.t('error.required')),
        first_name: z.string().min(1, i18next.t('error.required')),
        patronymic: z.string().optional(),
        post: z.string().optional(),
        email: z.string().email(i18next.t('error.email.format')),
        phone: z.string().optional(),
        password: z.string().min(1, i18next.t('error.required')),
        repeat_password: z.string().min(1, i18next.t('error.required')),
    })
    .refine((data) => data.password === data.repeat_password, {
        message: i18next.t('error.password.mismatch'),
        path: ['repeat_password'],
    })

export const RegisterModule = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [passwordShown, setPasswordShown] = useState(false)
    const [bgImage, setBgImage] = useState('')

    const EyeIcon = passwordShown ? Eye : EyeOff

    const form = useForm({
        schema: registerSchema,
        defaultValues: {
            last_name: '',
            first_name: '',
            post: '',
            email: '',
            password: '',
            repeat_password: '',
        },
    })

    const {
        mutate: registerUser,
        isPending: registerPending,
        error: registerError,
        isSuccess: registerSuccess,
    } = useRegister()

    const handleSubmit = (data: z.infer<typeof registerSchema>) => {
        registerUser(data)
    }

    useEffect(() => {
        if (registerSuccess) {
            navigate(AUTH)
        }
    }, [registerSuccess])

    useEffect(() => {
        if (registerError) {
            const axiosError = registerError as AxiosError
            const errorResponse = axiosError.response?.data as ErrorResponse

            form.setError('password', { message: errorResponse.message ? errorResponse.message : '' })
        }
    }, [registerError])

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
            <div className="flex h-screen w-screen justify-end overflow-x-hidden bg-white">
                <div className="flex-center h-full w-full flex-col bg-white md:w-2/3 lg:w-1/2">
                    <div className="flex-grow" />
                    <AppLogo variant="dark" expanded />
                    <p className="mb-5 mt-10 text-center">{t('provide.description')}</p>
                    <Form className="w-3/4 max-w-[500px]" form={form} onSubmit={handleSubmit}>
                        <div className="flex flex-wrap gap-2">
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <InputField
                                        label={t('last.name')}
                                        placeholder={t('last.name')}
                                        inputClassName="rounded-2xl"
                                        required
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <InputField
                                        label={t('first.name')}
                                        placeholder={t('first.name')}
                                        inputClassName="rounded-2xl"
                                        required
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="patronymic"
                                render={({ field }) => (
                                    <InputField
                                        className="w-full flex-none"
                                        label={t('patronymic')}
                                        placeholder={t('patronymic')}
                                        inputClassName="rounded-2xl"
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="post"
                                render={({ field }) => (
                                    <InputField
                                        className="w-full flex-none"
                                        label={t('post')}
                                        placeholder={t('post')}
                                        inputClassName="rounded-2xl"
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <InputField
                                        className="w-full flex-none"
                                        label={t('phone')}
                                        placeholder={t('phone')}
                                        inputClassName="rounded-2xl"
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <InputField
                                        className="w-full flex-none"
                                        label="Email"
                                        placeholder="Email"
                                        inputClassName="rounded-2xl"
                                        required
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <InputField
                                        label={t('password')}
                                        type={passwordShown ? 'text' : 'password'}
                                        placeholder={t('password')}
                                        inputClassName="rounded-2xl"
                                        required
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="repeat_password"
                                render={({ field }) => (
                                    <InputField
                                        label={t('repeat-password')}
                                        type={passwordShown ? 'text' : 'password'}
                                        placeholder={t('repeat-password')}
                                        inputClassName="rounded-2xl"
                                        required
                                        suffixIcon={
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="h-12 rounded-l-none rounded-r-xl px-4"
                                                onClick={() => setPasswordShown(!passwordShown)}
                                            >
                                                <EyeIcon size={20} strokeWidth={2.4} color="#3F434A" />
                                            </Button>
                                        }
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <Button className="mt-2 h-[50px] w-full rounded-2xl shadow-xl" loading={registerPending}>
                            {t('action.register')}
                        </Button>
                    </Form>
                    <Link to={AUTH} className="mt-10 rounded-md px-4 py-2 hover:bg-black/5">
                        <p className="text-base font-normal">
                            {t('has.account')} <span className="font-semibold">{t('action.auth')}</span>
                        </p>
                    </Link>
                    <div className="flex-grow" />
                    <Watermark />
                </div>
            </div>
        </>
    )
}
