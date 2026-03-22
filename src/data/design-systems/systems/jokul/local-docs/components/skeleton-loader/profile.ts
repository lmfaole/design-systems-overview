import { createJokulComponentProfile } from "../component-profile";

export const skeletonLoaderComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/loader/skeleton-loader.min.css",
    ],
    keyboardSupport: "Ingen egen tastaturmodell; skeleton loader er dekorativ og skal ikke være fokusbar.",
    semantics: [
        "Skeleton-markupen må være dekorativ og skjules med aria-hidden=\"true\".",
        "Bruk separat status eller konteksttekst når ventetilstanden er viktig å forstå.",
        "Velg en plassholderstruktur som faktisk matcher det ferdige innholdet.",
    ],
    manualChecks: [
        "Bekreft at skjelettet ligner nok på sluttresultatet til å sette riktige forventninger.",
        "Bekreft at plassholderen forsvinner raskt når dataene er klare.",
    ],
    performanceNotes: [
        "Sweep-animasjonen er CSS-basert og krever ikke klient-JS.",
        "Hold antall samtidige plassholdere nede for å begrense visuell støy.",
    ],
});
