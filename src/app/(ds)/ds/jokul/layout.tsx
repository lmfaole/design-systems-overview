import type { Metadata } from "next";
import { createPageMetadata } from "@/app/_shared/seo";
import "../jokul/_styles/jokul.scss";

export const metadata: Metadata = createPageMetadata({
    title: "Jøkul",
    description: "Dokumentasjon, komponenter, tokens og mønstre for Jøkul designsystem.",
    path: "/ds/jokul",
});

export default function JokulLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="jkl site-layout" data-theme="auto">
            {children}
        </div>
    );
}
