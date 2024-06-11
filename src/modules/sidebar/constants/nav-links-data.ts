import branchesIcon from '@/assets/icons/navigation/branches-icon.svg'
import FZIcon from '@/assets/icons/navigation/FZ-nav-icon.svg'
import managePropertiesIcon from '@/assets/icons/navigation/manage-properties-icon.svg'
import OrganizationsIcon from '@/assets/icons/navigation/organizations-icon.svg'
import permissionsIcon from '@/assets/icons/navigation/roles-and-permissions-icon.svg'
import usersIcon from '@/assets/icons/navigation/users-icon.svg'
import i18next from '@/shared/i18n/i18n.ts'
import { ROLES, PLANS, USERS, ORGANIZATIONS } from '@/shared/router/routes.ts'

interface SubLink {
    id: string
    title: string
    href: string
    isHighlighted?: boolean // рендерит доп. ссылку в виде +
}

interface NavLink {
    id: string
    link: {
        title: string
        href: string
        subLinks?: SubLink[]
    }
}

const Fz44Links: NavLink[] = [
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('budget-liabilities-limits'),
            href: '/',
            subLinks: [
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('create-limits'),
                    href: '/',
                    isHighlighted: true,
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('all-limits'),
                    href: '/',
                },
            ],
        },
    },
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('plans'),
            href: '/',
            subLinks: [
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('init-plan'),
                    href: '/',
                    isHighlighted: true,
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('all-plans'),
                    href: PLANS,
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('summary-plan'),
                    href: '/',
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('publication-in-EIS'),
                    href: '/',
                },
            ],
        },
    },
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('purchase'),
            href: '/',
            subLinks: [
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('purchase-offer'),
                    href: '/',
                    isHighlighted: true,
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('all-purchase'),
                    href: '/',
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('publication-in-EIS'),
                    href: '/',
                },
            ],
        },
    },
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('goods-and-services'),
            href: '/',
        },
    },
]

const Fz223Links: NavLink[] = [
    Fz44Links[1],
    Fz44Links[2],
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('handbook'),
            href: '/',
        },
    },
    Fz44Links[3],
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('rules'),
            href: '/',
        },
    },
]

const organizationsLinks: NavLink[] = [
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('all.organizations'),
            href: ORGANIZATIONS,
        },
    },
]

const branchesLinks: NavLink[] = [
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('purchase-initiators'),
            href: '/',
        },
    },
]

export const multiLinks = [
    {
        title: i18next.t('44-FZ'),
        icon: FZIcon,
        content: Fz44Links,
    },
    {
        title: i18next.t('223-FZ'),
        icon: FZIcon,
        content: Fz223Links,
    },
    {
        title: i18next.t('organizations'),
        icon: OrganizationsIcon,
        content: organizationsLinks,
    },
    {
        title: i18next.t('branches'),
        icon: branchesIcon,
        content: branchesLinks,
    },
]

export const singleLinks = [
    {
        title: i18next.t('users'),
        href: USERS,
        icon: usersIcon,
    },
    {
        title: i18next.t('roles-and-permissions'),
        href: ROLES,
        icon: permissionsIcon,
    },
    {
        title: i18next.t('manage-properties'),
        href: '/',
        icon: managePropertiesIcon,
    },
]
