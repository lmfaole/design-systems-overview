import type { Metadata } from "next";

export const SITE_NAME = "lmfaole";
export const SITE_URL = "https://lmfaole.party";
export const DEFAULT_DESCRIPTION =
    "Læringsressurs for designsystemer, Jøkul-komponenter, designtokens og tilgjengelige UI-mønstre.";

type PageMetadataOptions = {
    title: string;
    description: string;
    path?: string;
    type?: "website" | "article";
    noIndex?: boolean;
};

export function createPageMetadata({
    title,
    description,
    path = "/",
    type = "website",
    noIndex = false,
}: PageMetadataOptions): Metadata {
    return {
        title,
        description,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title,
            description,
            url: path,
            siteName: SITE_NAME,
            locale: "nb_NO",
            type,
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
        robots: noIndex
            ? {
                index: false,
                follow: true,
            }
            : undefined,
    };
}
