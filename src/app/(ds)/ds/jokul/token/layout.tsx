import type { Metadata } from "next";
import { createPageMetadata } from "@/app/_shared/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Jøkul designtokens",
    description: "Typografi, farger, spacing og andre designtokens i Jøkul.",
    path: "/ds/jokul/token",
});

export default function TokenSectionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
