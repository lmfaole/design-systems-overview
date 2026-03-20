import "./PatternTableOfContents.scss";

export interface PatternTableOfContentsItem {
    id: string;
    label: string;
}

interface PatternTableOfContentsProps {
    items: PatternTableOfContentsItem[];
}

export function PatternTableOfContents({items}: PatternTableOfContentsProps) {
    if (items.length === 0) return null;

    return (
        <nav className="monster-toc" aria-label="Innhold">
            <ol>
                {items.map((item) => (
                    <li key={item.id} className="monster-toc-item">
                        <a href={`#${item.id}`} className="monster-toc-link">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
