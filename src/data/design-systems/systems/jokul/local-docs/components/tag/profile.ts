import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const tagComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/tag/tag.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/tag",
            typeName: "TagProps",
            documentedProps: [
                "variant",
            ],
        },
    ]),
    keyboardSupport: "Tag er ikke interaktiv i seg selv og har derfor ingen egen tastaturkontrakt utover eventuell kontroll den ligger inni.",
    semantics: [
        "Tag bør brukes som en kort status- eller kategorimarkør, ikke som eneste bærer av viktig informasjon.",
        "Hvis taggen faktisk skal være klikkbar, bør den pakkes i en kontroll med tydelig navn og forventet fokusatferd.",
        "Teksten i taggen må være konkret nok til å forstås uten å lene seg fullt på farge.",
    ],
    manualChecks: [
        "Bekreft at statusen fortsatt er forståelig uten farge alene.",
        "Bekreft at taggen ikke forveksles med en knapp eller et filter hvis den bare er ment som visning.",
    ],
    performanceNotes: [
        "Tag er en liten ren CSS-komponent og har ingen egen klient-JS i docs.",
        "Bruk korte etiketter så taggene ikke presser layouten unødig i tabeller og kortlister.",
    ],
});
