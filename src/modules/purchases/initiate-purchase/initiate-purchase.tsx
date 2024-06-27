import { Button } from '@/ui/button'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import { Tabs, TabsContent } from '@/ui/tabs'
import { useEffect, useMemo, useState } from 'react'
import { GeneralInfoTab } from './general-info-tab'
import { Form, useForm } from '@/components/form'
import i18next from 'i18next'
import { z } from 'zod'
import { TechnicalSpecificationTab } from './technical-specification-tab'
import { TabListBreadcrumbs } from '@/components/breadcrumbs'
import { CommercialOffersTab } from './commercial-offers-tab'
import { ContractProjectTab } from './contract-project-tab'
import { StartMaxPriceTab } from './start-max-price-tab'
import { useInitiatePurchase } from './api/use-initiate-purchase'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { Purchase } from '@/types/purchase'
import { formatShortDate } from '@/shared/lib/format-short-date'
import { useUpdatePurchase } from './api/use-update-purchase'
import { useGetStartMaxPrice } from './api/use-get-start-max-price'
import { ContractExecutionTab } from './contract-execution-tab'
import { PublishToEISTab } from './publish-to-eis-tab'

export const fileSchema = z.object({
    id: z.string(),
    fileURL: z.string().optional(),
    file: z.instanceof(File).optional(),
})

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
        purchase_name: z.string().optional(), // required step 0
        purchase_type_id: z.number().optional(), // required step 0
        delivery_address: z.string().optional(), // required step 0
        quality_guarantee_period: z.string().optional(), // required step 0
        currency_code: z.string().optional(), // required step 0
        is_organization_fund: z.boolean(), // TODO required step 0
        is_unilateral_refusal: z.boolean(), // TODO required step 0
        manufacturer_guarantee: z.string().optional(), // optional step 0
        application_enforcement: z.string().optional(), // optional step 0
        contract_enforcement: z.string().optional(), // optional step 0
        warranty_obligations_enforcement: z.string().optional(), // optional step 0
        additional_info: z.string().optional(), // optional step 0
        technical_specification: z.string().optional(), // required step 1
        products: z.array(productSchema).optional(), // required step 1
        commercial_offer_text: z.string().optional(), // required step 2
        commercial_offers: z.array(commercialOfferSchema), // required step 2 3 (MIN 3)
        need_update: z.boolean(), // step 3
        start_max_price: z.number().optional(), // optional step 3
        end_application_date: z.string().optional(),
        executor_date: z.string().optional(),
        end_price: z.number().optional(), // TODO step 3
        documents: z.array(fileSchema), // TODO step 4
        start_date: z.string().optional(), // step 5
        end_date: z.string().optional(), // step 5
        executor_uuid: z.string().optional(), // step 5
        purchase_identification_code: z.string().optional(),
        contract_identification_code: z.string().optional(),
    })
    .superRefine((values, ctx) => {
        if (values.step === 0 || values.step === 4) {
            if (values.quality_guarantee_period && !Number(values.quality_guarantee_period)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['quality_guarantee_period'],
                    fatal: true,
                    message: i18next.t('error.number.format'),
                })
            }
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
        }

        if (values.step === 4) {
            // STEP 0
            if (!values.purchase_name) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['purchase_name'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.purchase_type_id || values.purchase_type_id === 0) {
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
            if (!values.currency_code) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['currency_code'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }
            if (!values.quality_guarantee_period || !Number(values.quality_guarantee_period)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['quality_guarantee_period'],
                    fatal: true,
                    message: i18next.t('error.number.format'),
                })
            }

            // STEP 1
            if (!values.technical_specification) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['technical_specification'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }

            // STEP 2
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

            // STEP 3
            for (const value in values.commercial_offers) {
                const element = values.commercial_offers[value]

                if (!element.price || !Number(element.price)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['commercial_offers'],
                        fatal: true,
                        message: i18next.t('error.number.format'),
                    })
                }
            }
        } else if (values.step === 6) {
            if (!values.start_date) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['start_date'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }

            if (!values.end_date) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['end_date'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
            }

            if (!values.executor_uuid) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['executor_uuid'],
                    fatal: true,
                    message: i18next.t('error.required'),
                })
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
                  purchase_uuid: purchase.purchase_uuid,
                  purchase_name: purchase.purchase_name ?? undefined,
                  purchase_type_id: purchase.purchase_type ? purchase.purchase_type.purchase_type_id : 0,
                  delivery_address: purchase.delivery_address ?? undefined,
                  quality_guarantee_period: purchase.quality_guarantee_period
                      ? String(purchase.quality_guarantee_period)
                      : '',
                  currency_code: purchase.currency_code ?? undefined,
                  is_organization_fund: purchase.is_organization_fund ?? false,
                  is_unilateral_refusal: purchase.is_unilateral_refusal ?? false,
                  manufacturer_guarantee: purchase.manufacturer_guarantee
                      ? String(purchase.manufacturer_guarantee)
                      : '',
                  application_enforcement: purchase.application_enforcement
                      ? String(purchase.application_enforcement)
                      : '',
                  contract_enforcement: purchase.contract_enforcement
                      ? String(purchase.contract_enforcement)
                      : undefined,
                  warranty_obligations_enforcement: purchase.warranty_obligations_enforcement ?? undefined,
                  additional_info: purchase.additional_info ?? undefined,
                  technical_specification: undefined,
                  products: [],
                  commercial_offer_text: undefined,
                  commercial_offers: [],
                  need_update: true,
                  start_max_price: purchase.start_max_price ?? 0,
                  end_application_date: purchase.end_application_date
                      ? formatShortDate(purchase.end_application_date)
                      : '',
                  executor_date: purchase.executor_date ? formatShortDate(purchase.executor_date) : '',
                  end_price: purchase.end_price ?? 0,
                  documents: [],
                  start_date: purchase.start_date ? formatShortDate(purchase.start_date) : '',
                  end_date: purchase.end_date ? formatShortDate(purchase.end_date) : '',
                  executor_uuid: purchase.executor ? purchase.executor.organization_uuid : '',
                  purchase_identification_code: purchase.purchase_identification_code ?? undefined,
                  contract_identification_code: purchase.contract_identification_code ?? undefined,
              }
            : {
                  step: 0,
                  purchase_type_id: 0,
                  products: [],
                  commercial_offers: [],
                  documents: [],
                  start_max_price: 0,
                  is_organization_fund: false,
                  is_unilateral_refusal: false,
                  need_update: true,
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
            content: <StartMaxPriceTab form={form} />,
        },
        {
            value: 'publish-purchase',
            label: i18next.t('publication-in-EIS'),
            content: <PublishToEISTab form={form} />,
        },
        {
            value: 'contract-project',
            label: i18next.t('contract-project'),
            content: <ContractProjectTab form={form} />,
        },
        {
            value: 'contract-execution',
            label: i18next.t('contract-execution'),
            content: <ContractExecutionTab form={form} />,
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

    const {
        mutate: getStartMaxPrice,
        data: startMaxPrice,
        isPending: startMaxPricePending,
        isSuccess: startMaxPriceSuccess,
        error: startMaxPriceError,
    } = useGetStartMaxPrice()

    const handleSubmit = (data: z.infer<typeof purchaseSchema>) => {
        if (currentStep === 0) {
            if (!data.purchase_uuid) {
                initiatePurchase({
                    purchase_name: data.purchase_name,
                    purchase_type_id: data.purchase_type_id !== 0 ? data.purchase_type_id : undefined,
                    delivery_address: data.delivery_address,
                    quality_guarantee_period: data.quality_guarantee_period ? Number(data.quality_guarantee_period) : 0,
                    manufacturer_guarantee: data.manufacturer_guarantee ? Number(data.manufacturer_guarantee) : 0,
                    currency_code: data.currency_code !== '' ? data.currency_code : undefined,
                    is_organization_fund: data.is_organization_fund,
                    is_unilateral_refusal: data.is_unilateral_refusal,
                    application_enforcement: data.application_enforcement ? data.application_enforcement : '',
                    contract_enforcement: data.contract_enforcement ? data.contract_enforcement : '',
                    warranty_obligations_enforcement: data.warranty_obligations_enforcement
                        ? data.warranty_obligations_enforcement
                        : '',
                })
            } else {
                updatePurchase({
                    purchase_uuid: data.purchase_uuid,
                    purchase_name: data.purchase_name,
                    purchase_type_id: data.purchase_type_id !== 0 ? data.purchase_type_id : undefined,
                    delivery_address: data.delivery_address,
                    quality_guarantee_period: data.quality_guarantee_period ? Number(data.quality_guarantee_period) : 0,
                    manufacturer_guarantee: data.manufacturer_guarantee ? Number(data.manufacturer_guarantee) : 0,
                    currency_code: data.currency_code !== '' ? data.currency_code : undefined,
                    application_enforcement: data.application_enforcement ? data.application_enforcement : '0',
                    contract_enforcement: data.contract_enforcement ? data.contract_enforcement : '0',
                    warranty_obligations_enforcement: data.warranty_obligations_enforcement
                        ? data.warranty_obligations_enforcement
                        : '0',
                    is_organization_fund: data.is_organization_fund,
                    is_unilateral_refusal: data.is_unilateral_refusal,
                })
            }
        } else if (currentStep === 1) {
            // TODO send technical specification
            updatePurchase({
                purchase_uuid: data.purchase_uuid,
            })
        } else if (currentStep === 2) {
            // TODO send commercial offers
        } else if (currentStep === 3) {
            if (!data.need_update) {
                updatePurchase({
                    purchase_uuid: data.purchase_uuid,
                    start_max_price: data.start_max_price,
                })
            } else {
                const commercialValues = data.commercial_offers.map((value) => Number(value.price))
                getStartMaxPrice({ prices: commercialValues, formula: 'min' })
            }
        } else if (currentStep === 4) {
            // TODO contract project
        } else if (currentStep === 5) {
            // TODO publish to EIS
        } else if (currentStep === 6) {
            updatePurchase({
                purchase_uuid: data.purchase_uuid,
                start_date: data.start_date,
                end_date: data.end_date,
                executor_uuid: data.executor_uuid,
            })
        } else if (currentStep !== 7) {
            setCurrentTab(tabsData[currentStep + 1].value)
            form.setValue('step', currentStep + 1)
        }
    }

    useEffect(() => {
        if (startMaxPriceSuccess) {
            form.setValue('start_max_price', startMaxPrice)
            form.setValue('need_update', false)
        }
    }, [startMaxPriceSuccess])

    useEffect(() => {
        if (purchaseInitiateSuccess) {
            setCurrentTab(tabsData[currentStep + 1].value)
            form.setValue('step', currentStep + 1)
            form.setValue('purchase_uuid', createdPurchase.data?.purchase_uuid)
        }
    }, [purchaseInitiateSuccess])

    useEffect(() => {
        if (purchaseUpdateSuccess) {
            setCurrentTab(tabsData[currentStep + 1].value)
            form.setValue('step', currentStep + 1)
        }
    }, [purchaseUpdateSuccess])

    useErrorToast(purchaseInitiateError)
    useErrorToast(purchaseUpdateError)
    useErrorToast(startMaxPriceError)

    const nextButtonText = useMemo(
        () => (currentStep !== 4 ? t('action.save.and.next') : t('action.publish')),
        [currentStep]
    )

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
                    <div className="flex-center mt-16 select-none flex-wrap gap-3">
                        <Button
                            className="h-12 gap-4"
                            loading={purchaseInitiating || purchaseUpdating || startMaxPricePending}
                        >
                            <PlusCircleIcon />
                            {nextButtonText}
                        </Button>
                        <Button
                            className="h-12 w-[200px] bg-secondary"
                            variant="outline"
                            type="button"
                            disabled={currentStep > 3}
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
