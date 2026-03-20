import type { ReactNode } from "react";
import type { PatternExampleVariant } from "@/app/ds/monster/types";

interface ExampleCardProps {
    title: string;
    description?: ReactNode;
    variant: PatternExampleVariant;
}

export function ExampleCard({ title, description, variant }: ExampleCardProps) {
    return (
        <article className="monster-example">
            <div className="monster-example__preview">
                <variant.Example />
            </div>
            <div className="monster-example__body">
                <h3>{title}</h3>
                {description && <p>{description}</p>}
                <p className="monster-kicker">{variant.label}</p>
                {variant.howTo && <p>{variant.howTo}</p>}
                {variant.description && <p>{variant.description}</p>}
                <details className="monster-details">
                    <summary>Vis kode</summary>
                    <pre className="monster-code">
                        <code>{variant.code.trim()}</code>
                    </pre>
                </details>
            </div>
        </article>
    );
}
