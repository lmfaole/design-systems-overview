import { SiteHeader, type SiteLink } from "@/app/_shared/components/SiteHeader";
import { SiteFooter } from "@/app/_shared/components/SiteFooter";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    const brand: SiteLink = { href: "/", label: "Designsystemer" };
    const links: SiteLink[] = [
        { href: "/ds", label: "Designsystemer" },
        { href: "/ds/jokul", label: "Jøkul" },
        { href: "/monster", label: "Mønster" },
    ];
    const footerSections = [
        {
            title: "Utforsk",
            links,
        },
        {
            title: "Snarveier",
            links: [
                { href: "/", label: "Forside" },
                { href: "/sok", label: "Søk" },
            ],
        },
    ];

    return (
        <>
            <SiteHeader brand={brand} links={links} />
            {children}
            <SiteFooter
                sections={footerSections}
                note="En uoffisiell læringsressurs for design-systemer."
            />
        </>
    );
}
