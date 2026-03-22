import { createJokulComponentProfile } from "../component-profile";

export const textInputComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/input-group/input-group.min.css",
        "@fremtind/jokul/styles/components/text-input/text-input.min.css",
    ],
    iconContract: {
        usage: "required",
        importPath: false,
        notes: [
            "TextInput deler støtte- og feilmeldingskontrakt med Jøkul sine form support-ikoner, så ikonstilen må være en del av komponentoppsettet.",
            "Uten ikonimporten mister feil- og hjelpetilstandene et sentralt visuelt signal som Jøkul forventer i feltfamilien.",
        ],
    },
    keyboardSupport: "Følger native tastaturstøtte for tekstfelt; Tab flytter fokus og piltaster flytter markøren i feltet.",
    semantics: [
        "Tekstfeltet trenger en tydelig label som beskriver hva som forventes i feltet.",
        "Bruk feilmelding eller hjelpetekst når format, lengde eller enhet ikke er åpenbar.",
        "Vis enhet som støtte, men ikke la den erstatte labelen eller feltets formål.",
    ],
    manualChecks: [
        "Bekreft at placeholder ikke bærer viktig informasjon som burde stå i label eller hjelpetekst.",
        "Bekreft at tallfelt og høyrejustering faktisk hjelper lesbarheten i konteksten.",
    ],
    performanceNotes: [
        "Tekstfeltet rendres som vanlig HTML og CSS i docs; ingen ekstra klient-JS trengs for grunnoppførselen.",
        "Hold action-knapper og ekstra pynt rundt feltet til situasjoner der de faktisk hjelper oppgaven.",
    ],
});
