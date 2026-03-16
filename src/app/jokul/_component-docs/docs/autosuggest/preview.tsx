"use client";
import { Autosuggest } from "@fremtind/jokul/autosuggest";

export function AutosuggestPreview() {
    const allItems = ["Bilforsikring", "Båtforsikring", "Hjemforsikring", "Reiseforsikring"];
    return (
        <Autosuggest
            label="Søk etter forsikring"
            allItems={allItems}
            value=""
            onChange={() => undefined}
        />
    );
}
