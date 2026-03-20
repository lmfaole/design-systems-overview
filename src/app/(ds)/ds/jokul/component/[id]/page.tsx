import { componentDocs } from "@/app/ds/jokul/_component-docs/data";
import { ComponentPageShell } from "./ComponentPageShell";

export const dynamicParams = false;

type Awaitable<T> = T | Promise<T>;

export function generateStaticParams() {
    return componentDocs.map((doc) => ({
        id: doc.id,
    }));
}

export default async function ComponentPage({
    params,
}: {
    params: Awaitable<{ id: string }>;
}) {
    const resolvedParams = await params;

    return <ComponentPageShell id={resolvedParams.id} />;
}
