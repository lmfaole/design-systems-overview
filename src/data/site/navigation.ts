import type { SiteLink } from "@/components/site-types";

export const siteBrand: SiteLink = {
    href: "/",
    label: "Designsystemoversikt",
};

export const siteHeaderLinks: SiteLink[] = [
    { href: "/ds", label: "Oversikt" },
    { href: "/ds/mønster", label: "Mønstre" },
    { href: "/ds/systemer", label: "Systemer" },
];

export const siteFooterLinks: SiteLink[] = [
    { href: "/", label: "Forside" },
    { href: "/ds", label: "Oversikt" },
    { href: "/ds/mønster", label: "Mønstre" },
    { href: "/ds/systemer", label: "Systemer" },
    { href: "/ds/søk", label: "Søk" },
];

export const siteFooterNote =
    "En læringsressurs som sammenligner mønstre, innholdsområder og dokumentasjon på tvers av designsystemer.";
