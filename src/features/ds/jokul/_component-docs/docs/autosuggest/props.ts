import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "label", type: "string", required: true, source: "custom", status: "stable", description: "Synlig label over inputfeltet." },
        { name: "labelProps", type: 'Omit<LabelProps, "children" | "htmlFor" | "standAlone">', required: false, source: "custom", status: "stable", description: "Egenskaper for label-elementet. Bruk f.eks. srOnly: true for å skjule labelen visuelt men beholde tilgjengelighet." },
        { name: "supportLabelProps", type: 'Omit<SupportLabelProps, "id" | "errorLabel" | "helpLabel">', required: false, source: "custom", status: "stable", description: "Egenskaper for supportlabelen som vises under feltet." },
        { name: "allItems", type: "string[]", required: true, source: "custom", status: "stable", description: "Liste over alle forslag som skal kunne vises." },
        { name: "value", type: "string", required: false, source: "native", status: "stable", description: "Kontrollert verdi." },
        { name: "onChange", type: "(value: string) => void", required: false, source: "react", status: "stable", description: "Kalles når inputverdien endres eller et forslag velges." },
        { name: "onInputValueChange", type: "(inputValue: string) => void", required: false, source: "react", status: "stable", description: "Kalles når brukeren skriver i inputfeltet." },
        { name: "onSelect", type: "(value: string) => void", required: false, source: "react", status: "stable", description: "Kalles når brukeren velger et forslag." },
        { name: "placeholder", type: "string", required: false, source: "native", status: "stable", description: "Plassholdertekst." },
        { name: "variant", type: '"large" | "medium" | "small"', required: false, source: "custom", status: "stable", description: "Størrelsesvariant for feltet." },
        { name: "maxNumberOfHits", type: "number", required: false, source: "custom", status: "stable", description: "Maksimalt antall forslag som vises." },
        { name: "showDropdownControllerButton", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Viser knapp for å åpne/lukke forslagslisten." },
        { name: "helpLabel", type: "string", required: false, source: "custom", status: "stable", description: "Hjelpetekst vist under label." },
        { name: "errorLabel", type: "string", required: false, source: "custom", status: "stable", description: "Feilmelding vist under feltet." },
        { name: "noHits", type: "{ items: string[]; text: React.ReactNode }", required: false, source: "custom", status: "stable", description: "Innhold som vises når ingen forslag matcher." },
        { name: "leadText", type: "string", required: false, source: "custom", status: "deprecated", statusDescription: "Bruk helpLabel, eller flytt teksten over skjemafeltets label.", description: "Tekst over inputfeltet." },
        { name: "noHitsMessage", type: "React.ReactNode", required: false, source: "custom", status: "deprecated", statusDescription: "Bruk noHits med text og evt. defaultverdier for items.", description: "Melding vist når ingen forslag matcher (gammel API)." },
    ];
