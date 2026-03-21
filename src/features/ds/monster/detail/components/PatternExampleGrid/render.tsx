import "./styles.scss";
import type {PatternExampleGridProps} from "./types";

export function PatternExampleGrid({heading, label, examples}: PatternExampleGridProps) {
    if (examples.length === 0) return null;

    return (
        <section className="monster-implementation-group" aria-label={label}>
            <h4>{heading}</h4>
            <ul
                className="bare-list monster-live-examples"
            >
                {examples.map((example, index) => (
                    <li key={index} className="monster-example-grid-item">
                        {example}
                    </li>
                ))}
            </ul>
        </section>
    );
}
