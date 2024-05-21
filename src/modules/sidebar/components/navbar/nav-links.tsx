import PlusIcon from '@/assets/icons/navigation/plus-icon.svg'
import { multiLinks, singleLinks } from '@/modules/sidebar/components/navbar/nav-links-data.ts'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion.tsx'
import { Separator } from '@/ui/separator.tsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const NavLinks = ({ expanded }: { expanded?: boolean }) => {
    const { t } = useTranslation()

    return (
        <>
            {expanded && (
                <div className="mt-2 flex items-end gap-1">
                    <span className="text-sm text-[#D2CFCF]">{t('navigation')}</span>
                    <Separator className="mb-0.5 bg-[#2B394A]" />
                </div>
            )}
            {expanded ? (
                <Accordion type="multiple" className="mt-3 w-full">
                    {multiLinks.map(({ title, content, icon: Icon }) => (
                        <AccordionItem key={title} value={title} className="border-none">
                            <AccordionTrigger>
                                <div className="flex gap-3 text-base font-normal text-white">
                                    <Icon />
                                    <span>{title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="nav-links-accordion rounded-lg bg-[#2B394A] p-5 text-base text-white">
                                {content.map((navLink) => (
                                    <div key={navLink.id}>
                                        <Link to={navLink.link.href} className="hover:opacity-60">
                                            {navLink.link.title}
                                        </Link>
                                        {navLink.link.subLinks && (
                                            <ul className="mt-2 flex list-disc flex-col gap-2 pl-7">
                                                {navLink.link.subLinks?.map((subLink) => (
                                                    <li key={subLink.id}>
                                                        <div className="flex justify-between">
                                                            <Link to={subLink.href} className="hover:opacity-60">
                                                                {subLink.title}
                                                            </Link>
                                                            {subLink.isHighlighted && (
                                                                <Link
                                                                    to="/"
                                                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white hover:opacity-60"
                                                                >
                                                                    <PlusIcon />
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {navLink.link.subLinks && <Separator className="mt-3 bg-[#222E3C]" />}
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <>
                    {multiLinks.map(({ title, icon: Icon }) => (
                        <Link key={title} to="/" className="nav-link">
                            <Icon />
                        </Link>
                    ))}
                </>
            )}
            {singleLinks.map(({ title, href, icon: Icon }) => (
                <Link key={title} to={href} className="nav-link">
                    <Icon />
                    {expanded && <span>{title}</span>}
                </Link>
            ))}
            <Separator className="mt-4 bg-[#2B394A]" />
        </>
    )
}
