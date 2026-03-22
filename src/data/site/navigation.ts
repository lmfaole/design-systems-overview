import type { SiteLink } from "@/components/site-types";

export const siteBrand: SiteLink = {
    href: "/",
    label: "lmfaole",
};

export const siteHeaderLinks: SiteLink[] = [];

export const siteFooterLinks: SiteLink[] = [
    { href: "/", label: "Forside" },
    { href: "/ds", label: "Designsystemer" },
    { href: "/ds/mønster", label: "Mønstre" },
    { href: "/ds/søk", label: "Søk" },
];

export const siteFooterNote =
    "En uoffisiell læringsressurs for designsystemer, komponenter og UI-mønstre.";
