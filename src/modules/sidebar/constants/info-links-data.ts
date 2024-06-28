import AdministrationIcon from '@/assets/icons/navigation/administration.svg'
import HandbookIcon from '@/assets/icons/navigation/handbook.svg'
import HelpIcon from '@/assets/icons/navigation/help.svg'
import MailIcon from '@/assets/icons/navigation/mail.svg'
import NotificationsIcon from '@/assets/icons/navigation/notifications.svg'
import RulesIcon from '@/assets/icons/navigation/rules.svg'
import i18next from '@/shared/i18n/i18n.ts'
import { HANDBOOK } from '@/shared/router/routes'

interface SubLink {
    id: string
    title: string
    href: string
}

interface InfoLink extends SubLink {
    icon: string
    isCollapsible?: boolean
    subLinks?: SubLink[]
}

export const infoLinks: InfoLink[] = [
    {
        id: crypto.randomUUID(),
        title: i18next.t('administration'),
        href: '/',
        icon: AdministrationIcon,
    },
    {
        id: crypto.randomUUID(),
        title: i18next.t('handbook'),
        href: HANDBOOK,
        icon: HandbookIcon,
        isCollapsible: true,
        subLinks: [
            {
                id: crypto.randomUUID(),
                title: i18next.t('all-handbook'),
                href: HANDBOOK,
            },
            {
                id: crypto.randomUUID(),
                title: i18next.t('КБК'),
                href: '/',
            },
            {
                id: crypto.randomUUID(),
                title: i18next.t('ОКПД2'),
                href: '/',
            },
            {
                id: crypto.randomUUID(),
                title: i18next.t('КТРУ'),
                href: '/',
            },
            {
                id: crypto.randomUUID(),
                title: i18next.t('Нормирование'),
                href: '/',
            },
            {
                id: crypto.randomUUID(),
                title: i18next.t('Целевые-статьи'),
                href: '/',
            },
        ],
    },
    {
        id: crypto.randomUUID(),
        title: i18next.t('rules'),
        href: '/',
        icon: RulesIcon,
    },
    {
        id: crypto.randomUUID(),
        title: i18next.t('help'),
        href: '/',
        icon: HelpIcon,
    },
    {
        id: crypto.randomUUID(),
        title: i18next.t('mail'),
        href: '/',
        icon: MailIcon,
    },
    {
        id: crypto.randomUUID(),
        title: i18next.t('notifications'),
        href: '/',
        icon: NotificationsIcon,
    },
]
