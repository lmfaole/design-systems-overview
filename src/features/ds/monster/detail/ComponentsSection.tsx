import type { ComponentId } from "@/data/jokul/component-docs";

interface ComponentsSectionProps {
    components: ComponentId[];
}

export function ComponentsSection({ components }: ComponentsSectionProps) {
    if (components.length === 0) return null;

    return (
        <section className="monster-section" aria-labelledby="komponenter">
            <h2 id="komponenter">Komponenter</h2>
            <ul className="monster-chiplist">
                {components.map((id) => (
                    <li key={id}>
                        <a href={`/ds/jokul/component/${id}`}>{id}</a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
