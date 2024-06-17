import { Button } from '@/ui/button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import { Tabs, TabsContent } from '@/ui/tabs'
import { useState } from 'react'
import { GeneralInfoTab } from './general-info-tab'
import { Form, useForm } from '@/components/form'
import i18next from 'i18next'
import { z } from 'zod'
import { TechnicalSpecificationTab } from './technical-specification'
import { TabListBreadcrumbs } from '@/components/breadcrumbs'

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
            label: i18next.t('general-info'),
            content: <GeneralInfoTab form={form} />,
        },
        {
            value: 'technical-specification',
            label: i18next.t('technical-specification'),
            content: <TechnicalSpecificationTab form={form} />,
        },
        {
            value: 'commercial-offers',
            label: i18next.t('commercial-offers'),
            content: 'Коммерческие предложения',
        },
        {
            value: 'nmck',
            label: i18next.t('nmck'),
            content: 'Расчет НМЦК',
        },
        {
            value: 'contract-project',
            label: i18next.t('contract-project'),
            content: 'Проект контракта',
        },
        {
            value: 'done',
            label: i18next.t('done'),
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
                    <TabListBreadcrumbs
                        tabsData={tabsData}
                        onTabClick={(value, index) => {
                            form.setValue('step', index)
                            setCurrentTab(value)
                        }}
                        currentStep={currentStep}
                    />
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
