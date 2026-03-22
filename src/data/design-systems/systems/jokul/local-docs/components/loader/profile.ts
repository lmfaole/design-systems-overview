import { createJokulComponentProfile } from "../component-profile";

export const loaderComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/loader/loader.min.css",
    ],
    keyboardSupport: "Ingen egen tastaturmodell; loaderen er ikke en interaktiv kontroll.",
    semantics: [
        "Selve animasjonen må skjules med aria-hidden=\"true\".",
        "Kombiner loaderen med status- eller hjelpetekst, eventuelt en live region.",
        "Bruk ikke loaderen som eneste signal om hva som skjer.",
    ],
    manualChecks: [
        "Bekreft at statusmeldingen oppdateres eller forsvinner når arbeidet er ferdig.",
        "Bekreft at lange ventetider får mer konkret fremdrift eller forklaring.",
    ],
    performanceNotes: [
        "Komponenten er bare CSS-animasjon i docs og trenger ikke klient-JS.",
        "Vis loaderen bare mens arbeid faktisk pågår for å unngå unødvendig bevegelse.",
    ],
});
