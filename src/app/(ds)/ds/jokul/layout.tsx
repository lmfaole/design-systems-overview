import { Flex } from "@fremtind/jokul/flex";
import { Link } from "@fremtind/jokul/link";
import { DESIGN_SYSTEMS } from "@/app/ds/_data/design-systems";
import { SiteHeader, type SiteLink } from "@/app/_shared/components/SiteHeader";
import { SiteFooter } from "@/app/_shared/components/SiteFooter";
import "../jokul/_styles/jokul.scss";

export default function JokulLayout({ children }: { children: React.ReactNode }) {
    const designSystem = DESIGN_SYSTEMS.find((system) => system.name === "Jøkul");
    const brand: SiteLink = { href: "/ds/jokul", label: "Jøkul" };
    const links: SiteLink[] = [
        { href: "/ds/jokul/token", label: "Designtokens" },
        { href: "/ds/jokul/component", label: "Komponenter" },
    ];
    const footerSections = [
        {
            title: "Jøkul",
            links,
        },
        {
            title: "Hele ressursen",
            links: [
                { href: "/ds", label: "Alle designsystemer" },
                { href: "/monster", label: "Mønstre" },
            ],
        },
        {
            title: "Offisielle lenker",
            links: designSystem ? [
                { href: designSystem.externalLinks.frontPage, label: "Forside" },
                { href: designSystem.externalLinks.changelog, label: "Endringslogg" },
                { href: designSystem.externalLinks.about, label: "Om" },
            ] : [],
        },
    ];
    const renderSiteLink = (link: SiteLink, className: string) => {
        if (link.href.startsWith("http")) {
            return (
                <Link className={className} external href={link.href}>{link.label}</Link>
            );
        }

        return <Link className={className} href={link.href}>{link.label}</Link>;
    };

    return (
        <div className="jkl site-layout" data-theme="auto">
            <SiteHeader
                brand={brand}
                links={links}
                LayoutComponent={Flex}
                layoutProps={{ alignItems: "center", justifyContent: "space-between", gap: "m", wrap: "wrap" }}
                NavListComponent={Flex}
                navListProps={{ as: "ul", gap: "xs", wrap: "wrap" }}
                renderLink={renderSiteLink}
            />
            {children}
            <SiteFooter
                sections={footerSections}
                note="En uoffisiell læringsressurs for Jøkul — Fremtinds designsystem."
                LayoutComponent={Flex}
                layoutProps={{ alignItems: "center", justifyContent: "space-between", gap: "l", wrap: "wrap" }}
                NavGroupComponent={Flex}
                navGroupProps={{ as: "section", alignItems: "flex-start", gap: "l", justifyContent: "space-between", width: "100%" }}
                NavListComponent={Flex}
                navListProps={{ as: "ul", gap: "xs", wrap: "wrap" }}
                renderLink={renderSiteLink}
            />
        </div>
    );
}
