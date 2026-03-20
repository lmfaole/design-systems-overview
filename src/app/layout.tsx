import {Metadata} from "next";
import {DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL} from "./_shared/seo";
import {SiteHeader, type SiteLink} from "@/app/_shared/components/SiteHeader";
import {SiteFooter} from "@/app/_shared/components/SiteFooter";
import {SiteBreadcrumb} from "@/app/_shared/components/SiteBreadcrumb";
import "../styles/globals.scss";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
        default: SITE_NAME,
        template: "%s | lmfaole",
    },
    description: DEFAULT_DESCRIPTION,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: "/",
        siteName: SITE_NAME,
        locale: "nb_NO",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const brand: SiteLink = {href: "/", label: "lmfaole"};
    const links: SiteLink[] = [];

    const footerSections = [
        {
            title: "Læringsressurs",
            links: [
                {href: "/", label: "Forside"},
                {href: "/ds", label: "Designsystemer"},
                {href: "/ds/sok", label: "Søk"},
            ],
        },
        {
            title: "Jøkul",
            links: [
                {href: "/ds/jokul", label: "Oversikt"},
                {href: "/ds/jokul/component", label: "Komponenter"},
                {href: "/ds/jokul/token", label: "Designtokens"},
            ],
        },
        {
            title: "Mønstre",
            links: [
                {href: "/ds/monster", label: "Alle mønstre"},
            ],
        },
    ];

    return (
        <html lang="no">
        <body>
        <SiteHeader brand={brand} links={links}/>
        <SiteBreadcrumb/>
        {children}
        <SiteFooter
            sections={footerSections}
            note="En uoffisiell læringsressurs for designsystemer, komponenter og UI-mønstre."
        />
        </body>
        </html>
    );
}
