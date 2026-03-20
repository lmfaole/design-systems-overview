"use client";

import dynamic from "next/dynamic";

const ComponentPageClient = dynamic(() => import("./ComponentPageClient").then((mod) => mod.ComponentPageClient), {
    ssr: false,
});

export function ComponentPageShell({ id }: { id: string }) {
    return <ComponentPageClient id={id} />;
}
