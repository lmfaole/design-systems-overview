import type { Metadata } from "next";
import { createPageMetadata } from "@/app/_shared/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Designsystemer",
    description: "Oversikt over designsystemene som er samlet i læringsressursen.",
    path: "/ds",
});

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page">{children}</div>
    );
}
