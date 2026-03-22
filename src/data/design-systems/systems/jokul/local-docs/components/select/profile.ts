import { createJokulComponentProfile } from "../component-profile";

export const selectComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/input-group/input-group.min.css",
        "@fremtind/jokul/styles/components/select/select.min.css",
    ],
    iconContract: {
        usage: "required",
        importPath: false,
        notes: [
            "Select-kontrakten bruker Jøkul sitt chevron-ikon som en del av affordancen i feltet, så ikonoppsettet er ikke valgfritt for full visuell kontrakt.",
            "Feil- og støttetilstander i samme feltfamilie deler også ikonstilen, så komponenten bør dokumenteres og installeres med ikonimporten på plass.",
        ],
    },
    keyboardSupport: "Følger native tastaturstøtte for select; Tab flytter fokus og piltaster blar i alternativene når menyen er åpen.",
    semantics: [
        "Select trenger en tydelig label. Placeholderen kan hjelpe, men skal ikke erstatte labelen.",
        "Bruk select når alternativene er kjente og brukeren skal velge én verdi fra listen.",
        "Feilstatus må forklares med tekst, ikke bare visuell markering av feltet.",
    ],
    manualChecks: [
        "Bekreft at alternativene er formulert tydelig nok til å forstås uten ekstra kontekst.",
        "Bekreft at placeholder og valgt verdi ikke blir forvekslet på små skjermer.",
    ],
    performanceNotes: [
        "Den lokale docs-siden bruker NativeSelect-markup og holder seg til browserens innebygde select-oppførsel.",
        "Hold antall alternativer lavt nok til at brukeren faktisk får oversikt uten søk eller ekstra klientlogikk.",
    ],
});
