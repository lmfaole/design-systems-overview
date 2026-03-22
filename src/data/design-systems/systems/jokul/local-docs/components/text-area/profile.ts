import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const textAreaComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/input-group/input-group.min.css",
        "@fremtind/jokul/styles/components/text-area/text-area.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/text-area",
            typeName: "TextAreaProps",
            documentedProps: [
                "data-testautoid",
                "id",
                "className",
                "data-testid",
                "data-size",
                "errorLabel",
                "helpLabel",
                "inline",
                "label",
                "labelProps",
                "supportLabelProps",
                "description",
                "tooltip",
                "style",
                "render",
                "counter",
                "rows",
                "startOpen",
                "autoExpand",
            ],
        },
    ]),
    iconContract: {
        usage: "required",
        importPath: false,
        notes: [
            "TextArea deler støtte- og feilmeldingskontrakt med resten av Jøkul sine skjemafelt, inkludert ikonbruk i error-state.",
            "Når feltet bruker teller eller feilstatus, er både input-group-stiler og ikonoppsett en del av den visuelle kontrakten.",
        ],
    },
    keyboardSupport: "Følger native tastaturstøtte for textarea; Tab flytter fokus, Enter lager linjeskift, og markøren flyttes med piltaster.",
    semantics: [
        "Gi feltet en tydelig label som beskriver hva slags tekst brukeren skal skrive.",
        "Bruk TextArea når innholdet naturlig kan bli flere linjer langt, ikke som standardfelt for korte svar.",
        "Vis teller bare når grensen faktisk er viktig for brukeren å forholde seg til.",
    ],
    manualChecks: [
        "Bekreft at label og eventuell hjelpetekst gjør det tydelig hvor mye detailjnivå brukeren forventes å gi.",
        "Bekreft at autoExpand og startOpen faktisk hjelper lese- og skriveopplevelsen i skjemaet.",
    ],
    performanceNotes: [
        "Docs-siden rendrer TextArea som vanlig HTML og CSS uten klienthydrering.",
        "AutoExpand og teller kan gjøre feltet mer dynamisk, så bruk dem bare når de faktisk hjelper oppgaven.",
    ],
});
