import { Button } from '@/ui/button'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import { Tabs, TabsContent } from '@/ui/tabs'
import { useEffect, useState } from 'react'
import { GeneralInfoTab } from './general-info-tab'
import { Form, useForm } from '@/components/form'
import i18next from 'i18next'
import { z } from 'zod'
import { TechnicalSpecificationTab } from './technical-specification-tab'
import { TabListBreadcrumbs } from '@/components/breadcrumbs'
import { CommercialOffersTab } from './commercial-offers-tab'
import { ContractProjectTab } from './contract-project-tab'
import { NMCKTab } from './nmck-tab'
import { useInitiatePurchase } from './api/use-initiate-purchase'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { Purchase } from '@/types/purchase'
import { formatShortDate } from '@/shared/lib/format-short-date'
import { useUpdatePurchase } from './api/use-update-purchase'

export const propertySchema = z.object({
    property_name: z.string(),
    property_value: z.string(),
    property_measurement: z.string(),
})

export const productSchema = z.object({
    product_id: z.number(),
    product_name: z.string(),
    code: z.string(),
    properties: z.array(propertySchema),
    product_count: z.string(),
    product_measurement: z.string(),
})

const commercialOfferSchema = z.object({ organization_uuid: z.string(), short_name: z.string(), price: z.string() })

const purchaseSchema = z
    .object({
        step: z.number(),
        purchase_uuid: z.string().optional(),
        purchase_name: z.string().min(1, i18next.t('error.required')), // required step 1
        purchase_type_id: z.number().min(1, i18next.t('error.required')), // required step 1
        delivery_address: z.string().min(1, i18next.t('error.required')), // required step 1
        quality_guarantee_period: z.string().min(1, i18next.t('error.required')), // required step 1
        currency_code: z.string().min(1, i18next.t('error.required')), // required step 1
        end_date: z.string().min(1, i18next.t('error.required')), // required step 1
        is_organization_fund: z.boolean(), // TODO required step 1
        is_unilateral_refusal: z.boolean(), // TODO required step 1
        manufacturer_guarantee: z.string().optional(), // optional step 1
        application_enforcement: z.string().optional(), // optional step 1
        contract_enforcement: z.string().optional(), // optional step 1
        warranty_obligations_enforcement: z.string().optional(), // optional step 1
        start_date: z.string().optional(), // optional step 1
        additional_info: z.string().optional(), // optional step 1
        technical_specification: z.string().optional(), // required step 2
        products: z.array(productSchema).optional(), // required step 2
        commercial_offer_text: z.string().optional(), // required step 3
        commercial_offers: z.array(commercialOfferSchema), // required step 3 4 (MIN 3)
        end_application_date: z.string().optional(),
        executor_date: z.string().optional(),
        start_max_price: z.number().optional(), // TODO step 4
        end_price: z.number().optional(), // TODO step 4
        document: z.instanceof(File).optional(), // TODO step 5
        purchase_identification_code: z.string().optional(),
        contract_identification_code: z.string().optional(),
        executor_uuid: z.string().optional(),
    })
    .superRefine((values, ctx) => {
        if (values.step === 0 || values.step === 5) {
            if (values.manufacturer_guarantee && !Number(values.manufacturer_guarantee)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['manufacturer_guarantee'],
                    fatal: true,
                    message: i18next.t('error.number.format'),
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
        } else if (values.step === 1 || values.step === 5) {
            if (!values.technical_specification) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['technical_specification'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
        } else if (values.step === 2 || values.step === 5) {
            if (!values.commercial_offer_text) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['commercial_offer_text'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.commercial_offers || values.commercial_offers.length < 3) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['commercial_offers'],
                    fatal: true,
                    message: i18next.t('error.min.select', { min: 3 }),
                })
            }
        } else if (values.step === 3 || values.step === 5) {
            for (const value in values.commercial_offers) {
                const element = values.commercial_offers[value]
                console.log(!element.price && !Number(element.price))

                if (!element.price || !Number(element.price)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['commercial_offers'],
                        fatal: true,
                        message: i18next.t('error.number.format'),
                    })
                }
            }
        }
    })

export type PurchaseSchema = z.infer<typeof purchaseSchema>

export const InitiatePurchase = () => {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()

    const purchase: Purchase | undefined = location.state?.purchase

    const [currentTab, setCurrentTab] = useState('general-info')

    const form = useForm({
        schema: purchaseSchema,
        defaultValues: purchase
            ? {
                  step: 0,
                  ...purchase,
                  quality_guarantee_period: String(purchase.quality_guarantee_period),
                  manufacturer_guarantee: purchase.manufacturer_guarantee
                      ? String(purchase.manufacturer_guarantee)
                      : '',
                  application_enforcement: purchase.application_enforcement
                      ? String(purchase.application_enforcement)
                      : '',
                  contract_enforcement: purchase.contract_enforcement ? String(purchase.contract_enforcement) : '',
                  warranty_obligations_enforcement: purchase.warranty_obligations_enforcement
                      ? purchase.warranty_obligations_enforcement
                      : '',
                  start_date: purchase.start_date ? formatShortDate(purchase.end_date) : '',
                  end_date: formatShortDate(purchase.end_date),
                  purchase_identification_code: purchase.purchase_identification_code
                      ? purchase.purchase_identification_code
                      : '',
                  contract_identification_code: purchase.contract_identification_code
                      ? purchase.contract_identification_code
                      : '',
                  additional_info: purchase.additional_info ? purchase.additional_info : '',
                  end_application_date: purchase.end_application_date ? purchase.end_application_date : '',
                  executor_date: purchase.executor_date ? purchase.executor_date : '',
                  start_max_price: purchase.start_max_price ? purchase.start_max_price : 0,
                  end_price: purchase.end_price ? purchase.end_price : 0,
              }
            : {
                  step: 0,
                  purchase_name: '',
                  purchase_type_id: 0,
                  delivery_address: '',
                  contract_enforcement: '',
                  quality_guarantee_period: '',
                  manufacturer_guarantee: '',
                  warranty_obligations_enforcement: '',
                  additional_info: '',
                  currency_code: '',
                  end_date: '',
                  products: [],
                  commercial_offers: [],
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
            content: <CommercialOffersTab form={form} />,
        },
        {
            value: 'nmck',
            label: i18next.t('nmck'),
            content: <NMCKTab form={form} />,
        },
        {
            value: 'contract-project',
            label: i18next.t('contract-project'),
            content: <ContractProjectTab form={form} />,
        },
        {
            value: 'done',
            label: i18next.t('done'),
            content: 'Готово',
        },
    ]

    const {
        mutate: initiatePurchase,
        data: createdPurchase,
        isPending: purchaseInitiating,
        error: purchaseInitiateError,
        isSuccess: purchaseInitiateSuccess,
    } = useInitiatePurchase()

    const {
        mutate: updatePurchase,
        isPending: purchaseUpdating,
        error: purchaseUpdateError,
        isSuccess: purchaseUpdateSuccess,
    } = useUpdatePurchase()

    const handleSubmit = (data: z.infer<typeof purchaseSchema>) => {
        if (!purchase) {
            // CREATE
            if (currentStep === 0) {
                initiatePurchase({
                    executor_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac', // TODO remove
                    purchase_name: data.purchase_name,
                    purchase_type_id: data.purchase_type_id,
                    delivery_address: data.delivery_address,
                    quality_guarantee_period: Number(data.quality_guarantee_period),
                    manufacturer_guarantee: data.manufacturer_guarantee
                        ? Number(data.manufacturer_guarantee)
                        : undefined,
                    currency_code: data.currency_code,
                    end_date: data.end_date,
                    is_organization_fund: data.is_organization_fund,
                    is_unilateral_refusal: data.is_unilateral_refusal,
                    application_enforcement: data.application_enforcement ? data.application_enforcement : undefined,
                    contract_enforcement: data.contract_enforcement ? data.contract_enforcement : undefined,
                    warranty_obligations_enforcement: data.warranty_obligations_enforcement
                        ? data.warranty_obligations_enforcement
                        : undefined,
                })
                // TODO create purchase
            } else if (currentStep === 1) {
                // TODO add technical specification and products
            } else if (currentStep === 2) {
                // TODO add organizations
            } else if (currentStep === 3) {
                // TODO calculate NMCK
            } else if (currentStep !== 5) {
                setCurrentTab(tabsData[currentStep + 1].value)
                form.setValue('step', currentStep + 1)
            }
        } else {
            // UPDATE
            if (currentStep === 0) {
                updatePurchase({
                    executor_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac', // TODO remove
                    purchase_uuid: data.purchase_uuid,
                    purchase_name: data.purchase_name,
                    purchase_type_id: data.purchase_type_id,
                    delivery_address: data.delivery_address,
                    quality_guarantee_period: Number(data.quality_guarantee_period),
                    manufacturer_guarantee: data.manufacturer_guarantee
                        ? Number(data.manufacturer_guarantee)
                        : undefined,
                    currency_code: data.currency_code,
                    end_date: data.end_date,
                    is_organization_fund: data.is_organization_fund,
                    is_unilateral_refusal: data.is_unilateral_refusal,
                    application_enforcement: data.application_enforcement ? data.application_enforcement : undefined,
                    contract_enforcement: data.contract_enforcement ? data.contract_enforcement : undefined,
                    warranty_obligations_enforcement: data.warranty_obligations_enforcement
                        ? data.warranty_obligations_enforcement
                        : undefined,
                })
            }
        }
    }

    useEffect(() => {
        if (purchaseInitiateSuccess || purchaseUpdateSuccess) {
            setCurrentTab(tabsData[currentStep + 1].value)
            form.setValue('step', currentStep + 1)

            if (purchaseInitiateSuccess) {
                form.setValue('purchase_uuid', createdPurchase.data?.purchase_uuid)
            }
        }
    }, [purchaseInitiateSuccess, purchaseUpdateSuccess])

    useErrorToast(purchaseInitiateError || purchaseUpdateError)

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
                    <div className="flex-center mt-16 select-none gap-3">
                        <Button className="h-12 w-[200px] gap-4" loading={purchaseInitiating || purchaseUpdating}>
                            <PlusCircleIcon />
                            {t('action.next')}
                        </Button>
                        <Button
                            className="h-12 w-[200px] bg-secondary"
                            variant="outline"
                            type="button"
                            disabled={currentStep > 4}
                            onClick={() => {
                                setCurrentTab(tabsData[currentStep + 1].value)
                                form.setValue('step', currentStep + 1)
                            }}
                        >
                            {t('action.skip')}
                        </Button>
                        <Button
                            className="h-12 w-[200px] bg-secondary"
                            variant="outline"
                            type="button"
                            disabled={currentStep === 0}
                            onClick={() => {
                                setCurrentTab(tabsData[currentStep - 1].value)
                                form.setValue('step', currentStep - 1)
                            }}
                        >
                            {t('action.back')}
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
