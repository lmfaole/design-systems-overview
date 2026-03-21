import type { ComponentDoc } from "../types";
import { props } from "./props";
import { PopoverBasicPreview } from "./preview";

const doc: ComponentDoc = {
    id: "popover",
    name: "Popover",
    package: "@fremtind/jokul/popover",
    category: "Overlegg",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "hard",
        notes: {
            use: "Plassering, fokus og klikk-utenfor gjør riktig integrasjon krevende.",
            maintenance: "Avhenger av flytende posisjonering og portal-/overlay-logikk.",
        },
    },
    description: {
        short: "Flytende informasjonsboks som vises ved siden av et trigger-element.",
        long: "Popover er en flytende informasjonsboks som vises ved siden av et trigger-element. Den brukes til kontekstuell informasjon, forklaringer og enkle handlinger som ikke krever en full modal. Bygget på Floating UI.",
    },
    preview: <PopoverBasicPreview />,
    example: (props) => <PopoverBasicPreview {...props} />,

    relationships: {
        related: [{ id: "tooltip", description: "Bruk Tooltip for korte skrivebeskyttede hint; Popover støtter interaktivt innhold som skjemaer eller handlingsmenyer." }, { id: "modal", description: "Bruk Modal når overlegget må blokkere resten av siden og krever en bevisst avvisning." }],
        subcomponents: [
            { id: "popover-trigger", description: "Elementet som åpner og lukker popoveren." },
            { id: "popover-content", description: "Det flytende innholdsområdet som vises når popoveren er åpen." },
        ],
    },
    props,
};

export default doc;
