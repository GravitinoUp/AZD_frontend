import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import PlusRoundedIcon from '@/assets/icons/plus-rounded.svg'
import { CommandSelect } from '@/components/command'
import { CommandWithSuggest } from '@/components/command-with-suggest'
import { ErrorAlert } from '@/components/error-alert'
import { useForm } from '@/components/form'
import { InputField } from '@/components/input-field'
import { ManageLayout } from '@/components/layout'
import { useAddLimit } from '@/modules/limits/limit-add/api/use-add-limit.ts'
import { useCurrencyCodes } from '@/modules/limits/limit-add/api/use-currency-codes.ts'
import { useKbkValuesType } from '@/modules/limits/limit-add/api/use-kbk-values-type.ts'
import { useGetAllBranches } from '@/modules/organizations/branches/api/use-get-all-branches.ts'
import { placeholderQuery } from '@/shared/constants'
import { useErrorToast } from '@/shared/hooks/use-error-toast.tsx'
import { useSuccessToast } from '@/shared/hooks/use-success-toast.tsx'
import i18next from '@/shared/i18n/i18n.ts'
import { KBKTypeCodes } from '@/types/kbk.ts'
import { Button } from '@/ui/button.tsx'
import { FormField, FormItem, FormLabel, FormMessage } from '@/ui/form.tsx'
import { Skeleton } from '@/ui/skeleton.tsx'
import { BookX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z, ZodRawShape } from 'zod'

type YearValues = {
    [key: number]: {
        rub_value: string
        currency_value: string
        currency_code: string
    }
}

const numericRegex = /^[0-9]*$/
const CURRENT_YEAR = new Date().getFullYear()
const YEARS_DEFAULT_COUNT = 3
const YEARS_LIST = Array.from({ length: YEARS_DEFAULT_COUNT }, (_, index) => CURRENT_YEAR + index)

const yearsSchema = z.object({
    rub_value: z.string().min(1, i18next.t('error.required')).regex(numericRegex, i18next.t('incorrect-format')),
    currency_value: z.string().regex(numericRegex, i18next.t('incorrect-format')).optional(),
    currency_code: z.string().optional(),
})

const createFormSchema = (years: number[]) => {
    const dynamicYearsSchema = z.object(
        years.reduce((acc: ZodRawShape, year) => {
            acc[year] = yearsSchema
            return acc
        }, {})
    )

    return z.object({
        limit_name: z.string().min(1, i18next.t('error.required')),
        section: z.string().min(1, i18next.t('error.required')).regex(numericRegex, i18next.t('incorrect-format')),
        subsection: z.string().min(1, i18next.t('error.required')).regex(numericRegex, i18next.t('incorrect-format')),
        target_article: z.string().min(1, i18next.t('error.required')),
        expenses_type: z
            .string()
            .min(1, i18next.t('error.required'))
            .regex(numericRegex, i18next.t('incorrect-format')),
        line_code: z.string().min(1, i18next.t('error.required')).regex(numericRegex, i18next.t('incorrect-format')),
        kosgu_uuid: z.string().min(1, i18next.t('error.required')).regex(numericRegex, i18next.t('incorrect-format')),
        branch_uuid: z.string().min(1, i18next.t('error.required')),
        years: dynamicYearsSchema,
    })
}

export const LimitAdd = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [years, setYears] = useState(YEARS_LIST)
    const formSchema = useMemo(() => createFormSchema(years), [years])
    const formData = useForm({
        schema: formSchema,
        mode: 'onChange',
        defaultValues: {
            limit_name: '',
            section: '',
            subsection: '',
            target_article: '',
            expenses_type: '',
            line_code: '',
            kosgu_uuid: '',
            branch_uuid: '',
            years: years.reduce((acc: YearValues, year) => {
                acc[year] = {
                    rub_value: '',
                    currency_value: '',
                    currency_code: '',
                }
                return acc
            }, {}),
        },
    })

    const { data: sections = { count: 0, data: [] } } = useKbkValuesType(KBKTypeCodes.SECTION)
    const formattedSections = useMemo(
        () =>
            sections.data.map((section) => ({
                value: section.kbk_value,
                label: section.kbk_value,
            })),
        [sections]
    )

    const { data: subsections = { count: 0, data: [] } } = useKbkValuesType(KBKTypeCodes.SUBSECTION)
    const formattedSubSections = useMemo(
        () =>
            subsections.data.map((subsection) => ({
                value: subsection.kbk_value,
                label: subsection.kbk_value,
            })),
        [subsections]
    )

    const { data: targetArticles = { count: 0, data: [] } } = useKbkValuesType(KBKTypeCodes.TARGET_ARTICLE)
    const formattedArticles = useMemo(
        () =>
            targetArticles.data.map((article) => ({
                value: article.kbk_value,
                label: article.kbk_value,
            })),
        [targetArticles]
    )

    const { data: expensesType = { count: 0, data: [] } } = useKbkValuesType(KBKTypeCodes.EXPENSES_TYPE)
    const formattedExpensesType = useMemo(
        () =>
            expensesType.data.map((expense) => ({
                value: expense.kbk_value,
                label: expense.kbk_value,
            })),
        [expensesType]
    )

    const {
        data: branches = { count: 0, data: [] },
        isLoading: branchesLoading,
        isError: branchesError,
        isSuccess: branchesSuccess,
    } = useGetAllBranches(placeholderQuery)
    const formattedBranches = useMemo(
        () =>
            branches.data.map((branch) => ({
                value: branch.branch_uuid,
                label: branch.branch_name,
            })),
        [branches]
    )

    const {
        data: codes = { count: 0, data: [] },
        isLoading: codesLoading,
        isError: codesError,
        isSuccess: codesSuccess,
    } = useCurrencyCodes(placeholderQuery)
    const formattedCurrencyCodes = useMemo(
        () =>
            codes.data.map((code) => ({
                value: code.currency_code,
                label: code.currency_name,
            })),
        [codes]
    )

    const { mutate: addLimit, isPending: limitAdding, error: limitAddError, isSuccess: limitAddSuccess } = useAddLimit()

    const handleSubmitLimit = (data: z.infer<typeof formSchema>) => {
        const limitYears = years.map((year) => ({
            limit_value_year: year,
            rub_value: Number(data.years[year].rub_value),
            currency_value: Number(data.years[year].currency_value),
            currency_code: data.years[year].currency_code,
        }))

        const newLimitData = {
            limit_name: data.limit_name,
            line_code: data.line_code.trim(),
            kbk_values: {
                kbk_name: data.limit_name,
                kbk_section: data.section.trim(),
                kbk_subsection: data.subsection.trim(),
                kbk_target_article: data.target_article.trim().replace(/\s+/g, ''),
                kbk_expenses_type: data.expenses_type.trim(),
            },
            kosgu_code: data.kosgu_uuid.trim(),
            years: limitYears,
            branch_uuid: data.branch_uuid.trim(),
        }

        addLimit(newLimitData)
    }

    const handleAddYear = () => {
        const lastYear = years[years.length - 1]
        setYears([...years, lastYear + 1])
    }

    const handleRemoveYear = (selectedYear: number) => {
        const filteredYears = years.filter((year) => year !== selectedYear)
        setYears(filteredYears)

        formData.reset({
            ...formData.getValues(),
            years: filteredYears.reduce((acc: YearValues, year) => {
                acc[year] = formData.getValues().years[year] || {
                    rub_value: '',
                    currency_value: '',
                    currency_code: '',
                }
                return acc
            }, {}),
        })
    }

    const addSuccessMessage = useMemo(() => t('toast.success.update.m', { entity: t('limit') }), [])

    useSuccessToast(addSuccessMessage, limitAddSuccess)
    useErrorToast(limitAddError)

    return (
        <ManageLayout
            form={formData}
            handleSubmit={handleSubmitLimit}
            title={t('limit-add')}
            className="flex-col gap-6"
            actions={
                <>
                    <Button type="submit" className="h-12 w-[200px] gap-4" loading={limitAdding}>
                        <PlusCircleIcon />
                        {t('action.add')}
                    </Button>
                    <Button
                        className="h-12 w-[200px] bg-secondary text-destructive"
                        variant="outline"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        {t('action.cancel')}
                    </Button>
                </>
            }
        >
            <FormField
                control={formData.control}
                name="limit_name"
                render={({ field }) => <InputField label={t('field-name')} required {...field} />}
            />
            <div>
                <h2 className="w-fit text-base font-semibold">КБК</h2>
                <div className="flex flex-col gap-3 border-l-2 border-l-primary">
                    <div className="flex items-center">
                        <div className="mt-7 w-[30px] border-b-2 border-b-primary" />
                        <FormField
                            control={formData.control}
                            name="section"
                            render={({ field }) => (
                                <FormItem className="flex flex-45 flex-col items-start space-y-2">
                                    <FormLabel>{t('section')}</FormLabel>
                                    <CommandWithSuggest
                                        selectedValue={field.value}
                                        setSelectedValue={(value) => field.onChange(value)}
                                        suggestions={formattedSections}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="mt-7 w-[30px] border-b-2 border-b-primary" />
                        <FormField
                            control={formData.control}
                            name="subsection"
                            render={({ field }) => (
                                <FormItem className="flex flex-45 flex-col items-start space-y-2">
                                    <FormLabel>{t('subsection')}</FormLabel>
                                    <CommandWithSuggest
                                        selectedValue={field.value}
                                        setSelectedValue={(value) => field.onChange(value)}
                                        suggestions={formattedSubSections}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="mt-7 w-[30px] border-b-2 border-b-primary" />
                        <FormField
                            control={formData.control}
                            name="target_article"
                            render={({ field }) => (
                                <FormItem className="flex flex-45 flex-col items-start space-y-2">
                                    <FormLabel>{t('target-article')}</FormLabel>
                                    <CommandWithSuggest
                                        selectedValue={field.value}
                                        setSelectedValue={(value) => field.onChange(value)}
                                        suggestions={formattedArticles}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="mt-7 w-[30px] border-b-2 border-b-primary" />
                        <FormField
                            control={formData.control}
                            name="expenses_type"
                            render={({ field }) => (
                                <FormItem className="flex flex-45 flex-col items-start space-y-2">
                                    <FormLabel>{t('expenses-type')}</FormLabel>
                                    <CommandWithSuggest
                                        selectedValue={field.value}
                                        setSelectedValue={(value) => field.onChange(value)}
                                        suggestions={formattedExpensesType}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>
            <FormField
                control={formData.control}
                name="kosgu_uuid"
                render={({ field }) => <InputField label={t('KOSGU')} required {...field} />}
            />
            <FormField
                control={formData.control}
                name="line_code"
                render={({ field }) => <InputField label={t('line-code')} required {...field} />}
            />
            <FormField
                control={formData.control}
                name="branch_uuid"
                render={({ field }) => (
                    <FormItem className="flex flex-45 flex-col items-start space-y-2">
                        <FormLabel>{t('branch')}</FormLabel>
                        {branchesLoading && <Skeleton className="h-12 w-full" />}
                        {branchesError && <ErrorAlert title={t('error.branches')} />}
                        {branchesSuccess && (
                            <CommandSelect
                                selectedValue={field.value ? field.value : 0}
                                setSelectedValue={(value) => field.onChange(value !== '' ? value : 0)}
                                items={formattedBranches}
                            />
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
            {years.map((year, index) => {
                const isDefaultYears = index === 0 || index === 1 || index === 2

                return (
                    <div key={year} className="relative flex flex-col gap-2">
                        {!isDefaultYears && (
                            <button
                                onClick={() => handleRemoveYear(year)}
                                type="button"
                                className="absolute right-0 h-6 w-6 hover:opacity-60"
                            >
                                <BookX />
                            </button>
                        )}
                        <FormField
                            control={formData.control}
                            name={`years.${year}.rub_value`}
                            render={({ field }) => (
                                <InputField
                                    label={String(year)}
                                    {...field}
                                    placeholder={t('limit-value-placeholder')}
                                />
                            )}
                        />
                        <FormField
                            control={formData.control}
                            name={`years.${year}.currency_value`}
                            render={({ field }) => (
                                <InputField {...field} placeholder={t('limit-currency-placeholder')} />
                            )}
                        />
                        <FormField
                            control={formData.control}
                            name={`years.${year}.currency_code`}
                            render={({ field }) => (
                                <FormItem className="flex flex-45 flex-col items-start space-y-2">
                                    {codesLoading && <Skeleton className="h-12 w-full" />}
                                    {codesError && <ErrorAlert title={t('error.codes')} />}
                                    {codesSuccess && (
                                        <CommandSelect
                                            selectedValue={field.value}
                                            setSelectedValue={(value) => field.onChange(value)}
                                            items={formattedCurrencyCodes}
                                            placeholder={t('limit-currency-code')}
                                            className="font-normal"
                                        />
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )
            })}
            <div className="flex gap-3 self-start">
                <p>Добавить год</p>
                <Button onClick={handleAddYear} type="button" className="h-6 w-6 rounded-full" size="icon">
                    <PlusRoundedIcon />
                </Button>
            </div>
        </ManageLayout>
    )
}
