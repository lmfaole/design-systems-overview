import type { Metadata } from "next";
import { getComponentDoc } from "@/app/ds/jokul/_component-docs/data";
import { createPageMetadata } from "@/app/_shared/seo";

export const runtime = "edge";

type Awaitable<T> = T | Promise<T>;

export async function generateMetadata({ params }: { params: Awaitable<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const doc = getComponentDoc(resolvedParams.id);

    if (!doc) {
        return createPageMetadata({
            title: "Fant ikke komponent",
            description: "Komponenten du prøvde å åpne finnes ikke i Jøkul-dokumentasjonen.",
            path: `/ds/jokul/component/${resolvedParams.id}`,
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: `${doc.name} i Jøkul`,
        description: doc.description.long,
        path: `/ds/jokul/component/${doc.id}`,
    });
}

export default function ComponentLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
