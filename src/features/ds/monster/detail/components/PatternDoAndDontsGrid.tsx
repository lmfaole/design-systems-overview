import type {PatternDoAndDontsItem} from "@/data/monster/patterns";
import {Grid} from "@/components/ds/Grid";
import {PatternFeatureList} from "./PatternFeatureList";
import "./PatternDoAndDontsGrid.scss";

interface PatternDoAndDontsGridProps {
    dos: PatternDoAndDontsItem[];
    donts: PatternDoAndDontsItem[];
}

export function PatternDoAndDontsGrid({
                                          dos,
                                          donts,
                                      }: PatternDoAndDontsGridProps) {
    return (
        <Grid columns={2} gap="var(--site-space-m)" className="monster-guidance-grid">
            <div className="monster-guidance-column" data-tone="success">
                <h3 className="monster-guidance-heading">Gjør dette</h3>
                <PatternFeatureList items={dos} tone="success"/>
            </div>
            <div className="monster-guidance-column" data-tone="error">
                <h3 className="monster-guidance-heading">Unngå dette</h3>
                <PatternFeatureList items={donts} tone="error"/>
            </div>
        </Grid>
    );
}
