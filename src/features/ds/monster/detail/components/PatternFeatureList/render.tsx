import "./styles.scss";
import type { PatternFeatureListProps } from "./types";

export function PatternFeatureList({
    items,
    ordered = false,
    tone = "neutral",
}: PatternFeatureListProps) {
    const ListTag = ordered ? "ol" : "ul";

    return (
        <ListTag
            className="ds-grid monster-feature-list"
            data-ordered={ordered}
            data-tone={tone}
        >
            {items.map((item, index) => (
                <li key={item.href ?? index} className="monster-feature-item">
                    <article className="monster-feature-body">
                        <p className="monster-feature-title">
                            {item.href ? <a href={item.href}>{item.title}</a> : item.title}
                        </p>
                        {item.description && (
                            <div className="monster-feature-description">{item.description}</div>
                        )}
                    </article>
                </li>
            ))}
        </ListTag>
    );
}
