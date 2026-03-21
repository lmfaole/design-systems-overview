import { Grid } from "@/components/ds/Grid";
import { PatternFeatureList } from "../PatternFeatureList";
import "./styles.scss";
import type { PatternDoAndDontsGridProps } from "./types";

export function PatternDoAndDontsGrid({
    dos,
    donts,
}: PatternDoAndDontsGridProps) {
    return (
        <Grid columns={2} gap="var(--site-space-m)" className="monster-guidance-grid">
            <section
                className="monster-guidance-column"
                data-tone="success"
                aria-labelledby="monster-guidance-dos"
            >
                <h3 id="monster-guidance-dos" className="monster-guidance-heading">
                    Gjør dette
                </h3>
                <PatternFeatureList items={dos} tone="success" />
            </section>
            <section
                className="monster-guidance-column"
                data-tone="error"
                aria-labelledby="monster-guidance-donts"
            >
                <h3 id="monster-guidance-donts" className="monster-guidance-heading">
                    Unngå dette
                </h3>
                <PatternFeatureList items={donts} tone="error" />
            </section>
        </Grid>
    );
}
