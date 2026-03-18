import type { PatternPost } from "@/app/monster/data";

interface DoAndDontsSectionProps {
    doAndDonts: NonNullable<PatternPost["doAndDonts"]>;
}

export function DoAndDontsSection({ doAndDonts }: DoAndDontsSectionProps) {
    return (
        <section className="monster-section" aria-labelledby="dos-and-donts">
            <h2 id="dos-and-donts">Hvorfor bruke mønsteret</h2>
            <div className="monster-grid" data-columns={2}>
                <div>
                    <h3>Hvorfor bruke</h3>
                    <ul className="monster-list">
                        {doAndDonts.use.map((item, index) => (
                            <li key={index}>
                                <strong>{item.title}</strong>
                                <div className="monster-inline-meta">{item.description}</div>
                                <div>{item.example}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Hvorfor ikke bruke</h3>
                    <ul className="monster-list">
                        {doAndDonts.avoid.map((item, index) => (
                            <li key={index}>
                                <strong>{item.title}</strong>
                                <div className="monster-inline-meta">{item.description}</div>
                                <div>{item.example}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
