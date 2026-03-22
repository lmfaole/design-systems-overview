import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const checkboxComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/checkbox/checkbox.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/checkbox",
            typeName: "CheckboxProps",
            documentedProps: [
                "data-testautoid",
                "children",
                "name",
                "value",
                "checked",
                "inline",
                "className",
                "invalid",
                "onChange",
                "onFocus",
                "onBlur",
                "indeterminate",
            ],
        },
    ]),
    iconContract: {
        usage: "required",
        importPath: false,
        styleImport: false,
        notes: [
            "Checkbox tegner boksen og hakeikonet gjennom Jøkul sine Material Symbols-ligaturer i labelens `:before`, så fontoppsettet er en del av kontrakten.",
            "Uten Jøkul sine webfonts vises ligaturteksten i stedet for checkbox-symbolet, selv om selve komponent-CSS-en er lastet.",
        ],
    },
    keyboardSupport: "Følger native tastaturstøtte for checkbox; Tab flytter fokus og Space veksler avhukingen.",
    semantics: [
        "Checkbox trenger en tydelig label som beskriver hva brukeren slår av eller på.",
        "Bruk checkbox for uavhengige valg eller enkle av/på-tilstander, ikke når brukeren bare kan velge ett alternativ.",
        "Feilstatus må følges av forklaring i tekst, ikke bare visuell error-state.",
    ],
    manualChecks: [
        "Bekreft at labelteksten fortsatt gir mening uten omkringliggende hjelpetekst.",
        "Bekreft at error-state forklarer hva brukeren må gjøre for å komme videre.",
    ],
    performanceNotes: [
        "Komponenten er ren HTML og CSS i docs og krever ikke ekstra klient-JS for grunnoppførselen.",
        "Inline-varianten bør brukes sparsomt så skannbarheten i skjemaet ikke blir dårligere.",
    ],
});
