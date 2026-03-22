import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const descriptionListComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/description-list/description-list.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/description-list",
            typeName: "DescriptionListProps",
            documentedProps: [
                "alignment",
                "children",
                "className",
                "separators",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "description-term",
            importPath: "@fremtind/jokul/description-list",
            typeName: "DescriptionTermProps",
            documentedProps: [
                "children",
                "className",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "description-detail",
            importPath: "@fremtind/jokul/description-list",
            typeName: "DescriptionDetailProps",
            documentedProps: [
                "children",
                "className",
            ],
        },
    ]),
    keyboardSupport: "DescriptionList har ingen egen tastaturadferd utover vanlig navigasjon mellom eventuelle lenker eller kontroller du legger inn i innholdet.",
    semantics: [
        "Bruk en beskrivelsesliste når hvert felt består av en term og en tilhørende verdi, og rekkefølgen mellom dem betyr noe.",
        "Hold samme rytme gjennom hele listen slik at brukeren kan skanne term og detalj parvis.",
        "Velg alignment ut fra hva som gjør verdiene lettest å lese i den tilgjengelige bredden.",
    ],
    manualChecks: [
        "Bekreft at termene faktisk fungerer som korte feltetiketter og ikke som hele setninger.",
        "Bekreft at verdiinnholdet fortsatt er lesbart når listen bryter over flere linjer på små skjermer.",
    ],
    performanceNotes: [
        "DescriptionList er ren HTML og CSS uten klientruntime.",
        "Komponenten er lett, men lange verdier kan skape tunge tekstblokker hvis listen brukes som erstatning for tabell eller kort.",
    ],
});
