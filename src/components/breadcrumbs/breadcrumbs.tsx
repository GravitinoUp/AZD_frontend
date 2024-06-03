import { cn } from '@/shared/lib/cn'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/ui/breadcrumb'

export interface RouteInterface {
    route: string
    label: string
}

interface BreadcrumbsProps {
    routes: RouteInterface[]
}

const Breadcrumbs = ({ routes }: BreadcrumbsProps) => (
    <Breadcrumb>
        <BreadcrumbList>
            {routes.map((value, index) => (
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink
                        href={value.route}
                        className={cn(
                            'flex-center h-7 rounded-full text-primary/50',
                            routes.length - 1 === index && 'border bg-[#EEF0F6] px-2 font-medium text-[#0A0A0A]'
                        )}
                    >
                        {value.label}
                    </BreadcrumbLink>
                    {routes.length - 1 !== index && <BreadcrumbSeparator />}
                </BreadcrumbItem>
            ))}
        </BreadcrumbList>
    </Breadcrumb>
)

export default Breadcrumbs
