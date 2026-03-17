import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "label", type: "string", required: true, source: "custom", status: "stable", description: "Synlig label over nedtrekksmenyen." },
        { name: "labelProps", type: 'Omit<LabelProps, "children" | "htmlFor" | "standAlone">', required: false, source: "custom", status: "stable", description: "Egenskaper for label-elementet. Bruk f.eks. srOnly: true for å skjule labelen visuelt." },
        { name: "supportLabelProps", type: 'Omit<SupportLabelProps, "id" | "errorLabel" | "helpLabel">', required: false, source: "custom", status: "stable", description: "Egenskaper for supportlabelen som vises under feltet." },
        { name: "name", type: "string", required: true, source: "custom", status: "stable", description: "Skjemafeltets navn — brukes av react-hook-form og native form submit." },
        { name: "items", type: "Array<string | ValuePair>", required: true, source: "custom", status: "stable", description: "Liste over valgmuligheter. Bruk ValuePair ({ value, label }) for å skille mellom verdi og visningsnavn." },
        { name: "value", type: "string", required: false, source: "custom", status: "stable", description: "Valgt verdi (kontrollert)." },
        { name: "onChange", type: "SelectChangeEventHandler", required: false, source: "custom", status: "stable", description: "Kalles med { type: 'change', target: { name, value } } ved valg. Kompatibel med react-hook-form." },
        { name: "onBlur", type: "SelectChangeEventHandler", required: false, source: "custom", status: "stable", description: "Kalles med { type: 'blur', target: { name, value } } når feltet mister fokus." },
        { name: "errorLabel", type: "string", required: false, source: "custom", status: "stable", description: "Feilmelding vist under feltet." },
        { name: "helpLabel", type: "string", required: false, source: "custom", status: "stable", description: "Hjelpetekst vist under feltet." },
        { name: "defaultPrompt", type: "string", required: false, source: "custom", status: "stable", default: '"Velg"', description: "Plassholdertekst som vises når ingenting er valgt." },
        { name: "searchable", type: "boolean | ((searchValue: string, item: string | ValuePair) => boolean)", required: false, source: "custom", status: "stable", default: "false", description: "Aktiverer søk i listen. Kan ta en egendefinert filtreringsfunksjon." },
        { name: "maxShownOptions", type: "number", required: false, source: "custom", status: "stable", default: "5", description: "Antall valg synlig i listen før den scroller." },
        { name: "inline", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Viser label og nedtrekksmeny på samme linje." },
        { name: "width", type: "string", required: false, source: "custom", status: "stable", description: "Setter bredden på nedtrekksmenyen (CSS-verdi)." },
    ];
