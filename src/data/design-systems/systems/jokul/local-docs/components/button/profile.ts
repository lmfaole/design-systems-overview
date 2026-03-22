import { createJokulComponentProfile } from "../component-profile";

export const buttonComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/button/button.min.css",
        "@fremtind/jokul/styles/components/loader/loader.min.css",
    ],
    keyboardSupport: "Følger native tastaturstøtte for button og a; Enter aktiverer begge, og Space aktiverer knapper.",
    semantics: [
        "Komponenten trenger et tilgjengelig navn, vanligvis synlig knappetekst.",
        "Bruk button for handlinger og a bare når elementet faktisk navigerer.",
        "Bruk type=\"submit\" når knappen sender inn et skjema.",
    ],
    manualChecks: [
        "Bekreft at etiketten beskriver handlingen tydelig nok i konteksten.",
        "Bekreft at disabled-tilstanden ikke er eneste forklaring når noe mangler.",
    ],
    performanceNotes: [
        "Grunnoppførselen er CSS-basert i docs og krever ikke klient-JS.",
        "Loader-stilene trengs bare når knappen bruker den innebygde loaderen.",
    ],
});
