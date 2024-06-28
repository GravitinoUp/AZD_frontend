import { ErrorAlert } from '@/components/error-alert'
import { SheetInput } from '@/components/sheet-input'
import { useLimit } from '@/modules/limits/limit/api/use-limit.ts'
import { getCurrentYear } from '@/shared/lib/get-current-year.ts'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

export const LimitInfoTab = () => {
    const { id = '' } = useParams()
    const { t } = useTranslation()
    const { data: limit, isError, isSuccess } = useLimit(id)

    const currentYear = useMemo(() => {
        if (limit?.created_at) {
            return getCurrentYear(limit.created_at || '')
        }

        return new Date().getFullYear()
    }, [limit])

    if (isError) {
        return <ErrorAlert className="mx-auto" />
    }

    return isSuccess ? (
        <>
            <div className="info-wrapper flex gap-10">
                <div className="flex flex-col gap-3">
                    <SheetInput label="Наименование показателя" initialValue={limit.limit_name} />
                    <SheetInput
                        label={t('target-article')}
                        initialValue={limit?.kbk?.kbk_target_article?.kbk_type || ''}
                    />
                    <SheetInput
                        label={t('expenses-type')}
                        initialValue={limit?.kbk?.kbk_expenses_type?.kbk_type || ''}
                    />
                    <SheetInput
                        label="Код аналитического показателя (КОСГУ)"
                        initialValue={limit?.kosgu?.kosgu_code || ''}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <SheetInput label="Код строки" initialValue={limit.line_code} />
                    <SheetInput label={t('section')} initialValue={limit?.kbk?.kbk_section?.kbk_type || ''} />
                    <SheetInput label={t('subsection')} initialValue={limit?.kbk?.kbk_subsection?.kbk_type || ''} />
                </div>
            </div>
            <div className="info-wrapper mt-8">
                <h2 className="text-center text-base font-bold">{`На ${currentYear} год (на текущий финансовый год`}</h2>
                <SheetInput
                    className="flex items-center justify-between"
                    label="В рублях (рублевом эквиваленте)"
                    initialValue={String(limit?.current_year_rub_value) || ''}
                />
                <SheetInput
                    className="flex items-center justify-between"
                    label="В валюте"
                    initialValue={String(limit?.current_year_currency_value) || ''}
                />
                <SheetInput
                    className="flex items-center justify-between"
                    label={t('limit-currency-code')}
                    initialValue={String(limit?.current_year_currency_code) || ''}
                />
            </div>
            <div className="info-wrapper mt-8">
                <h2 className="text-center text-base font-bold">{`На ${
                    currentYear + 1
                } год (на текущий финансовый год`}</h2>
                <SheetInput
                    className="flex items-center justify-between"
                    label="В рублях (рублевом эквиваленте)"
                    initialValue={String(limit?.first_year_rub_value) || ''}
                />
                <SheetInput
                    className="flex items-center justify-between"
                    label="В валюте"
                    initialValue={String(limit?.first_year_currency_value) || ''}
                />
                <SheetInput
                    className="flex items-center justify-between"
                    label={t('limit-currency-code')}
                    initialValue={String(limit?.first_year_currency_code) || ''}
                />
            </div>
            <div className="info-wrapper mt-8">
                <h2 className="text-center text-base font-bold">{`На ${
                    currentYear + 2
                } год (на текущий финансовый год`}</h2>
                <SheetInput
                    className="flex items-center justify-between"
                    label="В рублях (рублевом эквиваленте)"
                    initialValue={String(limit?.second_year_rub_value) || ''}
                />
                <SheetInput
                    className="flex items-center justify-between"
                    label="В валюте"
                    initialValue={String(limit?.second_year_currency_value) || ''}
                />
                <SheetInput
                    className="flex items-center justify-between"
                    label={t('limit-currency-code')}
                    initialValue={String(limit?.second_year_currency_code) || ''}
                />
            </div>
        </>
    ) : (
        <p>нет данных</p>
    )
}
