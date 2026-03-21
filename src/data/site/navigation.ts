import type { SiteFooterSection, SiteLink } from "@/components/site-types";

export const siteBrand: SiteLink = {
    href: "/",
    label: "lmfaole",
};

export const siteHeaderLinks: SiteLink[] = [];

export const siteFooterSections: SiteFooterSection[] = [
    {
        title: "Utforsk",
        links: [
            { href: "/", label: "Forside" },
            { href: "/ds", label: "Designsystemer" },
            { href: "/ds/monster", label: "Mønstre" },
            { href: "/ds/sok", label: "Søk" },
        ],
    },
    {
        title: "Jøkul",
        links: [
            { href: "/ds/jokul", label: "Oversikt" },
            { href: "/ds/jokul/component", label: "Komponenter" },
            { href: "/ds/jokul/token", label: "Designtokens" },
        ],
    },
    {
        title: "Utvalgte mønstre",
        links: [
            { href: "/ds/monster/lastetilstander", label: "Lastetilstander" },
            { href: "/ds/monster/tomtilstander", label: "Tomtilstander" },
            {
                href: "/ds/monster/bekreftelse-etter-handling",
                label: "Bekreftelse etter handling",
            },
        ],
    },
];

export const siteFooterNote =
    "En uoffisiell læringsressurs for designsystemer, komponenter og UI-mønstre.";
