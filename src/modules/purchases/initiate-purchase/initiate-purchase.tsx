import { Button } from '@/ui/button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import { Tabs, TabsContent, TabsList } from '@/ui/tabs'
import { useState } from 'react'
import { cn } from '@/shared/lib/cn'
import { GeneralInfoTab } from './general-info-tab'
import { Form, useForm } from '@/components/form'
import i18next from 'i18next'
import { z } from 'zod'

const purchaseSchema = z
    .object({
        step: z.number(),
        purchase_name: z.string(),
        purchase_type_id: z.number(),
        initiator_uuid: z.string().optional(), // TODO required
        executor_uuid: z.string().optional(),
        purchase_identification_code: z.string().optional(),
        contract_identification_code: z.string().optional(),
        start_date: z.string().optional(),
        end_application_date: z.string().optional(),
        executor_date: z.string().optional(),
        end_date: z.string().optional(), // TODO required
        start_max_price: z.number().optional(),
        end_price: z.number().optional(),
        currency_code: z.string().optional(), // TODO required
        delivery_address: z.string(),
        is_organization_fund: z.boolean().optional(), // TODO required
        application_enforcement: z.string().optional(),
        is_unilateral_refusal: z.boolean().optional(), // TODO required
        contract_enforcement: z.string().optional(),
        quality_guarantee_period: z.string(),
        manufacturer_guarantee: z.string().optional(),
        warranty_obligations_enforcement: z.string().optional(),
        additional_info: z.string().optional(),
    })
    .superRefine((values, ctx) => {
        if (values.step === 0) {
            if (!values.purchase_name) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['purchase_name'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.purchase_type_id) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['purchase_type_id'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.delivery_address) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['delivery_address'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (values.application_enforcement && !Number(values.application_enforcement)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['application_enforcement'],
                    fatal: true,
                    message: i18next.t('error.number.format'),
                })
            }
            if (!values.quality_guarantee_period) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['quality_guarantee_period'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (values.contract_enforcement && !Number(values.contract_enforcement)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['contract_enforcement'],
                    fatal: true,
                    message: i18next.t('error.number.format'),
                })
            }
            if (values.warranty_obligations_enforcement && !Number(values.warranty_obligations_enforcement)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['warranty_obligations_enforcement'],
                    fatal: true,
                    message: i18next.t('error.number.format'),
                })
            }
        }
    })

export type PurchaseSchema = z.infer<typeof purchaseSchema>

export const InitiatePurchase = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [currentTab, setCurrentTab] = useState('general-info')

    const form = useForm({
        schema: purchaseSchema,
        defaultValues: {
            step: 0,
            purchase_name: '',
            purchase_type_id: 0,
            delivery_address: '',
            contract_enforcement: '',
            quality_guarantee_period: '',
            manufacturer_guarantee: '',
            warranty_obligations_enforcement: '',
            additional_info: '',
        },
    })

    const currentStep = form.watch('step')

    const tabsData = [
        {
            value: 'general-info',
            label: 'Общая информация',
            content: <GeneralInfoTab form={form} />,
        },
        {
            value: 'technical-specification',
            label: 'Техническое задание',
            content: 'Техническое задание',
        },
        {
            value: 'commercial-offers',
            label: 'Коммерческие предложения',
            content: 'Коммерческие предложения',
        },
        {
            value: 'nmck',
            label: 'Расчет НМЦК',
            content: 'Расчет НМЦК',
        },
        {
            value: 'contract-project',
            label: 'Проект контракта',
            content: 'Проект контракта',
        },
        {
            value: 'done',
            label: 'Готово',
            content: 'Готово',
        },
    ]

    const handleSubmit = () => {
        // TODO
    }

    return (
        <div className="mx-auto w-[95%]">
            <h1 className="mt-20 text-3xl font-bold">{t('initiate-purchase')}</h1>
            <Form form={form} onSubmit={handleSubmit}>
                <Tabs value={currentTab}>
                    <TabsList className="my-14 w-full select-none items-start self-center">
                        {tabsData.map(({ value, label }, index) => (
                            <div
                                key={value}
                                className={cn('flex flex-col gap-1', index !== tabsData.length - 1 && 'w-full')}
                                onClick={() => {
                                    form.setValue('step', index)
                                    setCurrentTab(value)
                                }}
                            >
                                <div className="flex items-center">
                                    <div
                                        className={cn(
                                            'flex-center min-h-8 min-w-8 rounded-full border-2 border-[#F3F3F3]',
                                            currentStep >= index ? 'bg-primary' : 'bg-white'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'h-[10px] w-[10px] rounded-full',
                                                currentStep >= index ? 'bg-white' : 'bg-[#F3F3F3]'
                                            )}
                                        />
                                    </div>
                                    {index !== tabsData.length - 1 && (
                                        <div
                                            className={cn(
                                                'h-[6px] w-full',
                                                currentStep > index ? 'bg-primary' : 'bg-white'
                                            )}
                                        />
                                    )}
                                </div>
                                <p className="text-start font-semibold">{label}</p>
                            </div>
                        ))}
                    </TabsList>
                    <div className="flex-center mt-16 gap-3">
                        <Button className="h-12 w-[200px] gap-4" loading={false}>
                            <PlusCircleIcon />
                            {t('action.next')}
                        </Button>
                        <Button
                            className="h-12 w-[200px] bg-secondary"
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setCurrentTab(tabsData[currentStep + 1].value)
                                form.setValue('step', currentStep + 1)
                            }}
                        >
                            {t('action.skip')}
                        </Button>
                        <Button
                            className="h-12 w-[200px] bg-secondary text-destructive"
                            variant="outline"
                            type="button"
                            onClick={() => navigate(-1)}
                        >
                            {t('action.cancel')}
                        </Button>
                    </div>
                    {tabsData.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value}>
                            {tab.content}
                        </TabsContent>
                    ))}
                </Tabs>
            </Form>
        </div>
    )
}
