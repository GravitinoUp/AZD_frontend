import { cn } from '@/shared/lib/cn'
import { Route } from '@/types/common'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/ui/breadcrumb'
import { Link } from 'react-router-dom'

interface BreadcrumbsProps {
    routes: Route[]
}

export const Breadcrumbs = ({ routes }: BreadcrumbsProps) => (
    <Breadcrumb>
        <BreadcrumbList>
            {routes.map((value, index) => (
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink
                        className={cn(
                            'flex-center h-7 rounded-full text-primary/50',
                            routes.length - 1 === index && 'border bg-[#EEF0F6] px-2 font-medium text-[#0A0A0A]'
                        )}
                    >
                        <Link to={value.route}>{value.label}</Link>
                    </BreadcrumbLink>
                    {routes.length - 1 !== index && <BreadcrumbSeparator />}
                </BreadcrumbItem>
            ))}
        </BreadcrumbList>
    </Breadcrumb>
)
