import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const radioButtonComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/input-group/input-group.min.css",
        "@fremtind/jokul/styles/components/radio-button/radio-button.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/radio-button",
            typeName: "RadioButtonGroupProps",
            documentedProps: [
                "data-testautoid",
                "legend",
                "labelProps",
                "supportLabelProps",
                "tooltip",
                "className",
                "helpLabel",
                "errorLabel",
                "description",
                "name",
                "value",
                "onChange",
                "inline",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "radio-button-item",
            importPath: "@fremtind/jokul/radio-button",
            typeName: "RadioButtonProps",
            documentedProps: [
                "children",
                "value",
                "name",
                "onChange",
                "label",
                "helpLabel",
                "supportLabelProps",
            ],
        },
    ]),
    iconContract: {
        usage: "required",
        importPath: false,
        styleImport: false,
        notes: [
            "RadioButton bruker Material Symbols-ligaturer i labelens `:before` for å vise valgt og ikke-valgt tilstand.",
            "Uten Jøkul sine webfonts vises ligaturteksten i stedet for radiosymbolene, selv om radio-button-stilen er lastet.",
        ],
    },
    keyboardSupport: "Følger tastaturmønsteret for radiogrupper; Tab flytter inn og ut av gruppen, og piltaster flytter valgt alternativ.",
    semantics: [
        "Bruk radio buttons når brukeren må velge nøyaktig ett alternativ i en gruppe.",
        "Gi gruppen en tydelig legend som forklarer spørsmålet eller kriteriet brukeren velger ut fra.",
        "Feilstatus må knyttes til hele gruppen, ikke bare til ett enkelt alternativ.",
    ],
    manualChecks: [
        "Bekreft at legend og alternativtekster kan forstås uten ekstra kontekst rundt skjemaet.",
        "Bekreft at rekkefølgen på alternativene støtter oppgaven brukeren prøver å løse.",
    ],
    performanceNotes: [
        "Grunnoppførselen er ren HTML og CSS i docs og krever ingen klienthydrering.",
        "Hold gruppene korte; mange radio buttons blir fort tunge å skanne sammenlignet med select eller stegvis filtrering.",
    ],
});
