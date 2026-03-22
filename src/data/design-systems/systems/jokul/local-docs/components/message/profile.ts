import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const messageComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/list/list.min.css",
        "@fremtind/jokul/styles/components/message/message.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/message",
            typeName: "MessageProps",
            documentedProps: [
                "dismissAction",
                "dismissed",
                "fullWidth",
                "variant",
            ],
        },
        {
            owner: "subcomponent",
            subcomponentSlug: "form-error-message",
            importPath: "@fremtind/jokul/message",
            typeName: "FormErrorMessageProps",
            documentedProps: [
                "className",
                "errors",
                "id",
                "isSubmitted",
                "isValid",
                "messageProps",
            ],
        },
    ]),
    iconContract: {
        usage: "required",
        importPath: false,
        notes: [
            "Message bruker Jøkul-ikoner internt for statusvariantene og den valgfrie avvis-knappen.",
            "Ikon- og fontstilene må derfor følge med selv om forbrukeren ikke importerer noe direkte fra `@fremtind/jokul/icon`.",
        ],
    },
    keyboardSupport: "Message har ingen egen tastaturadferd før du legger til `dismissAction`. Da må avvis-knappen kunne nås og aktiveres med tastatur som en vanlig knapp.",
    semantics: [
        "Bruk Message til avgrenset status eller viktig informasjon i en flyt, ikke som erstatning for full sidefeedback eller modal blokkering.",
        "Velg variant ut fra alvorlighetsgrad og forventet handling, ikke bare ut fra hvilken farge som ser best ut visuelt.",
        "FormErrorMessage passer når flere feil må samles på skjema-nivå i tillegg til feltspesifikke meldinger.",
    ],
    manualChecks: [
        "Bekreft at meldingen faktisk tilhører innholdet rundt, og ikke burde vært løst med lokal hjelpetekst nærmere det konkrete problemet.",
        "Bekreft at avvisbare meldinger ikke skjuler kritisk informasjon brukeren fortsatt trenger senere i oppgaven.",
    ],
    performanceNotes: [
        "Message er lett, men er avhengig av ikon- og webfont-stiler for å vise variantikonene riktig.",
        "FormErrorMessage kan samle mange feil; hold teksten kort og konkret så oppsummeringen ikke blir en tung blokk som er vanskelig å skanne.",
    ],
});
