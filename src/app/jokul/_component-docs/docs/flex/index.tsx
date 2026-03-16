import type { ComponentDoc } from "../types";
import { props } from "./props";
import { FlexPreview } from "./preview";

const doc: ComponentDoc = {
    id: "flex",
    name: "Flex",
    package: "@fremtind/jokul/flex",
    category: "Layout",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Den primære layout-primitiven i Jøkul.",
        long: "Flex er den primære layout-primitiven i Jøkul. Den lar deg bygge flexbox-layouts med Jøkuls spacing-skala for gap, uten å skrive CSS. Komponenten rendres som div som standard, men kan rendres som et hvilket som helst HTML-element via as-proppen.",
    },
    relationships: {
        related: [{ id: "button", description: "Wrapper flere Button-elementer i Flex for å kontrollere mellomrom og justering i en verktøylinje eller skjemafot." }, { id: "tag", description: "Bruk Flex for å legge ut en rad med Tags med konsistent mellomrom og linjebryting." }],
    },
    preview: <FlexPreview />,

    props,
};

export default doc;
