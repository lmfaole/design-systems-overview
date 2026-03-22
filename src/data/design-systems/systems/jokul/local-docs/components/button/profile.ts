import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const buttonComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/button/button.min.css",
        "@fremtind/jokul/styles/components/loader/loader.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/button",
            typeName: "ButtonProps",
            documentedProps: [
                "as",
                "children",
                "variant",
                "className",
                "loader",
                "iconLeft",
                "iconRight",
                "iconPosition",
                "icon",
            ],
        },
    ]),
    iconContract: {
        usage: "optional",
        notes: [
            "Button kan rendres uten ikoner, men `icon`-prop-en gjør ikonpakken til en del av kontrakten når du bygger ikonknapper eller kombinerer tekst og ikon.",
            "Når du bruker `icon`, må samme oppsett også hente inn Jøkul sine ikonstiler så ikonets størrelse og vertikale rytme følger knappens kontrakt.",
        ],
    },
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
