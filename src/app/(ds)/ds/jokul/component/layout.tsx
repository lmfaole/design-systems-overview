import type { Metadata } from "next";
import { createPageMetadata } from "@/app/_shared/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Jøkul-komponenter",
    description: "Komponentdokumentasjon for Jøkul med API, props og levende eksempler.",
    path: "/ds/jokul/component",
});

export default function ComponentSectionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
