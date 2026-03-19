import type { Metadata } from "next";
import { createPageMetadata } from "@/app/_shared/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Props-oversikt for Jøkul",
    description: "Søkbar oversikt over props brukt i Jøkul-komponentene.",
    path: "/ds/jokul/component/props",
});

export default function ComponentPropsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
