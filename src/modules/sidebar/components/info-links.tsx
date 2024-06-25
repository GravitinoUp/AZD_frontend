import { Copyright } from '@/components/copyright'
import { infoLinks } from '@/modules/sidebar/constants/info-links-data.ts'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion.tsx'
import { Separator } from '@/ui/separator.tsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const InfoLinks = ({ expanded }: { expanded?: boolean }) => {
    const { t } = useTranslation()

    return (
        <>
            {expanded && (
                <div className="mb-3 mt-2 flex items-end gap-1">
                    <span className="text-sm text-caption">{t('information')}</span>
                    <Separator className="mb-0.5 bg-accent-sidebar" />
                </div>
            )}
            {expanded ? (
                <>
                    {infoLinks.map(({ id, title, href, icon: Icon, isCollapsible, subLinks }) => (
                        <div key={id}>
                            {isCollapsible ? (
                                <Accordion type="multiple" className="nav-link-svg w-full">
                                    <AccordionItem key={id} value={title} className="border-none">
                                        <AccordionTrigger>
                                            <div className="flex gap-3 text-base font-normal text-white">
                                                <Icon />
                                                <span>{title}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="nav-links-accordion rounded-lg bg-accent-sidebar p-5 text-base text-white">
                                            {subLinks && (
                                                <ul className="flex list-disc flex-col gap-2 pl-7">
                                                    {subLinks?.map((subLink) => (
                                                        <li key={subLink.id}>
                                                            <div className="flex justify-between">
                                                                <Link to={subLink.href} className="hover:opacity-60">
                                                                    {subLink.title}
                                                                </Link>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ) : (
                                <Link to={href} className="nav-link">
                                    <Icon />
                                    <span>{title}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {infoLinks.map(({ id, href, icon: Icon }) => (
                        <Link key={id} to={href} className="nav-link">
                            <Icon />
                        </Link>
                    ))}
                </>
            )}
            {expanded && (
                <>
                    <Separator className="mb-8 mt-4 bg-accent-sidebar" />
                    <Copyright />
                </>
            )}
        </>
    )
}
