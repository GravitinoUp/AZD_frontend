import branchesIcon from '@/assets/icons/navigation/branches-icon.svg'
import FZIcon from '@/assets/icons/navigation/FZ-nav-icon.svg'
import managePropertiesIcon from '@/assets/icons/navigation/manage-properties-icon.svg'
import OrganizationsIcon from '@/assets/icons/navigation/organizations-icon.svg'
import permissionsIcon from '@/assets/icons/navigation/roles-and-permissions-icon.svg'
import usersIcon from '@/assets/icons/navigation/users-icon.svg'
import i18next from '@/shared/i18n/i18n.ts'
import {
    LIMITS,
    PLANS,
    ROLES,
    USERS,
    INITIATE_PURCHASE,
    ORGANIZATIONS,
    BRANCHES, LIMITS_ADD,
    PURCHASES,
    PURCHASE_REFERENCES,
    PURCHASE_PRODUCTS_AND_SERVICES,
} from '@/shared/router/routes.ts'

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
                    href: LIMITS_ADD,
                    isHighlighted: true,
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('all-limits'),
                    href: LIMITS,
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
            title: i18next.t('all-purchase'),
            href: PURCHASES,
            subLinks: [
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('purchase-initiate'),
                    href: INITIATE_PURCHASE,
                    isHighlighted: true,
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('handbook'),
                    href: PURCHASE_REFERENCES,
                },
                {
                    id: crypto.randomUUID(),
                    title: i18next.t('goods-and-services'),
                    href: PURCHASE_PRODUCTS_AND_SERVICES,
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
    {
        id: crypto.randomUUID(),
        link: {
            title: i18next.t('branches'),
            href: BRANCHES,
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
