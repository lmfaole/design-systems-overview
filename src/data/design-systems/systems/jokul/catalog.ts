import type { DesignSystemCatalogSection } from "../../types";
import { jokulIconCatalogItems } from "./local-docs/icons";

export const jokulCatalog: DesignSystemCatalogSection[] = [
    {
        slug: "komponenter",
        kind: "component",
        title: "Komponenter",
        description: "React-komponenter, props, migrering og relasjoner mellom assets.",
        status: "documented",
        localPath: "/ds/jokul/komponenter",
        packageNames: [
            "@fremtind/jokul",
        ],
        items: [
            {
                slug: "button",
                title: "Button",
                description: "Pilotkomponent for lokal Jøkul-dokumentasjon med eksempel, tilgjengelighetsnotater og et lite prop-utvalg.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/button",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Primær handling",
                    "Disabled med forklaring",
                ],
            },
            {
                slug: "checkbox",
                title: "Checkbox",
                description: "Lokal komponentside for av/på-valg og korte flervalgssett med ekte Jøkul-checkbox-markup.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/checkbox",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Samtykke",
                    "Inline",
                    "Feilstatus",
                ],
            },
            {
                slug: "loader",
                title: "Loader",
                description: "Lokal komponentside for ventetilstander med ekte Jøkul-loader og tilgjengelighetsnotater.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/loader",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Statusområde",
                    "Inline i tekst",
                ],
            },
            {
                slug: "radio-button",
                title: "RadioButtonGroup",
                description: "Lokal komponentside for enkeltvalg med RadioButtonGroup, RadioButton og felles valideringskontrakt.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/radio-button",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Én valgt verdi",
                    "Inline gruppe",
                    "Feilstatus",
                ],
            },
            {
                slug: "select",
                title: "Select",
                description: "Lokal komponentside for native select med Jøkul-wrapper, placeholder og feilstatus.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/select",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Ingen valgt verdi",
                    "Fast bredde",
                    "Feilstatus",
                ],
            },
            {
                slug: "skeleton-loader",
                title: "Skeleton loader",
                description: "Lokal komponentside for skjelettvisning med ekte Jøkul skeleton-markup og styrbar struktur.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/skeleton-loader",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Element",
                    "Input",
                    "Table",
                ],
            },
            {
                slug: "table",
                title: "Table",
                description: "Lokal komponentside for sammensatte datatabeller med ekte Jøkul markup, anatomy og responsiv listevisning.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/table",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Standard",
                    "Collapse to list",
                    "Sticky head",
                ],
            },
            {
                slug: "tag",
                title: "Tag",
                description: "Lokal komponentside for kompakte status- og kategorimarkører med Jøkul sine variantklasser.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/tag",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Neutral",
                    "Warning",
                    "Success",
                ],
            },
            {
                slug: "text-area",
                title: "TextArea",
                description: "Lokal komponentside for flerlinjefelt med høydekontroll, teller og feilstatus i InputGroup-familien.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/text-area",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Start open",
                    "Teller",
                    "Feilstatus",
                ],
            },
            {
                slug: "text-input",
                title: "TextInput",
                description: "Lokal komponentside for korte tekstfelt med InputGroup-kontrakt, enhet og feilstatus.",
                status: "documented",
                localPath: "/ds/jokul/komponenter/text-input",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "Beløpsfelt",
                    "Enhet",
                    "Feilstatus",
                ],
            },
        ],
    },
    {
        slug: "formattere",
        kind: "formatter",
        title: "Formattere",
        description: "Formattere trenger egne oppslagssider med input/output-eksempler, ikke bare omtale i komponentdocs.",
        status: "planned",
        localPath: "/ds/jokul/formattere",
        packageNames: [
            "@fremtind/jokul",
        ],
        examples: [
            "Dato",
            "Valuta",
            "Telefonnummer",
        ],
    },
    {
        slug: "hooks",
        kind: "hook",
        title: "Hooks",
        description: "Hooks skal dokumenteres som selvstendige assets med installasjon, API og bruksmønstre.",
        status: "planned",
        localPath: "/ds/jokul/hooks",
        packageNames: [
            "@fremtind/jokul",
        ],
    },
    {
        slug: "mixins",
        kind: "mixin",
        title: "Mixins",
        description: "SCSS-mixins og stilverktøy må kunne dokumenteres uten å trekkes inn i komponentartiklene.",
        status: "planned",
        localPath: "/ds/jokul/mixins",
        packageNames: [
            "@fremtind/jokul",
        ],
    },
    {
        slug: "tokens",
        kind: "token",
        title: "Designtokens",
        description: "Farger, spacing, typografi og bevegelse bør få egne seksjoner som kan brukes på tvers av komponenter og mønstre.",
        status: "documented",
        localPath: "/ds/jokul/tokens",
        packageNames: [
            "@fremtind/jokul",
        ],
        items: [
            {
                slug: "spacing",
                title: "Spacing",
                description: "Pilotgruppe for lokale tokenoppslag med tabell over vanlige tokens og kodeeksempler i CSS og SCSS.",
                status: "documented",
                localPath: "/ds/jokul/tokens/spacing",
                packageNames: [
                    "@fremtind/jokul",
                ],
                examples: [
                    "CSS-variabler",
                    "SCSS",
                ],
            },
        ],
    },
    {
        slug: "ikoner",
        kind: "icon",
        title: "Ikoner",
        description: "Lokale oppslag for Jøkul sine statiske ikoner som brukes i komponenter, statusmeldinger, menyer og navigasjon.",
        status: "documented",
        localPath: "/ds/jokul/ikoner",
        packageNames: [
            "@fremtind/jokul",
        ],
        items: jokulIconCatalogItems,
    },
    {
        slug: "tooling",
        kind: "tooling",
        title: "Tooling",
        description: "Repo-oppsett, CSS-importer, fonter og andre avhengigheter bør dokumenteres eksplisitt.",
        status: "planned",
        localPath: "/ds/jokul/tooling",
    },
];
