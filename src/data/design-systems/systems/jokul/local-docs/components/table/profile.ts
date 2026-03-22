import { createJokulComponentProfile } from "../component-profile";

export const tableComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/table/table.min.css",
    ],
    keyboardSupport: "Bruker native tabellsemantikk; tastaturnavigasjon skjer via eventuelle interaktive elementer inni cellene.",
    semantics: [
        "Tabellen trenger en meningsfull caption.",
        "Headerceller må bruke riktig scope.",
        "Når collapseToList brukes, trenger hver datacelle data-th.",
    ],
    manualChecks: [
        "Bekreft at tabellen fortsatt kan skannes på små skjermer.",
        "Bekreft at caption fortsatt gir mening i konteksten, også når den skjules visuelt.",
        "Bekreft at sticky head ikke skjuler innhold eller viktige filterkontroller.",
    ],
    performanceNotes: [
        "Standardtabellen i docs krever ikke klient-JS eller hydrering.",
        "Store datasett bør pagineres eller virtualiseres utenfor basekomponenten.",
    ],
});
