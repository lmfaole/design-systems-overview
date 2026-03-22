import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const cardComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/card/card.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/card",
            typeName: "CardProps",
            documentedProps: [
                "as",
                "className",
                "clickable",
                "padding",
                "variant",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "card-image",
            importPath: "@fremtind/jokul/card",
            typeName: "CardImageProps",
            documentedProps: [
                "as",
                "placement",
            ],
        },
    ]),
    keyboardSupport: "Card følger tastaturstøtten til elementet du rendre den som. Klikkbare kort må derfor rendres som ekte lenker eller knapper.",
    semantics: [
        "Bruk Card når flere biter innhold hører tett sammen og bør leses eller aktiveres som én samlet enhet.",
        "Hvis hele kortet er klikkbart må det ha et tydelig tilgjengelig navn og ikke inneholde konkurrerende interaktive kontroller.",
        "Velg variant ut fra kontrasten i omgivelsene, ikke bare ut fra visuell smak.",
    ],
    manualChecks: [
        "Bekreft at hele kortet bare er klikkbart når dette faktisk gjør oppgaven enklere enn en tydelig sekundær lenke eller knapp.",
        "Bekreft at bildeplasseringen fortsatt fungerer når kortet brukes med lengre tekst eller smalere bredder.",
    ],
    performanceNotes: [
        "Card er ren HTML og CSS uten egen klientruntime.",
        "Bruk lette bilder eller reserver riktig plass for dem for å unngå layoutskift når kortene lastes inn i lister.",
    ],
});
