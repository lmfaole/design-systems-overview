import type {
    DesignSystemCatalogItem,
    DesignSystemContentSection,
    DesignSystemReferenceAssetDoc,
    DesignSystemRelatedLink,
} from "../../../../types";
import { getJokulAssetHref, getJokulInstallGuideHref } from "../paths";

type JokulIconUsageKind = "status" | "navigation" | "action";

interface JokulIconDefinition {
    slug: string;
    exportName: string;
    glyph: string;
    description: string;
    keywords: string[];
    usageKind: JokulIconUsageKind;
    useText: string;
    contextText: string;
    defaultBold?: boolean;
    defaultFilled?: boolean;
    relatedLinks?: DesignSystemRelatedLink[];
}

function getIconClassName(definition: JokulIconDefinition): string {
    return [
        "jkl-icon",
        definition.defaultBold ? "jkl-icon--bold" : "",
        definition.defaultFilled ? "jkl-icon--filled" : "",
    ].filter(Boolean).join(" ");
}

function getDefaultStyleSummary(definition: JokulIconDefinition): string {
    if (definition.defaultBold && definition.defaultFilled) {
        return "filled og bold som standard";
    }

    if (definition.defaultBold) {
        return "bold som standard";
    }

    if (definition.defaultFilled) {
        return "filled som standard";
    }

    return "nøytral linjevariant som standard";
}

function renderSizeExample(
    definition: JokulIconDefinition,
    label: string,
    fontSize: string,
): string {
    return [
        "<li>",
        `<p><strong>${label}</strong></p>`,
        `<p style="font-size: ${fontSize};"><span class="${getIconClassName(definition)}" aria-hidden="true">${definition.glyph}</span></p>`,
        "</li>",
    ].join("");
}

function renderIconPreview(definition: JokulIconDefinition): string {
    return [
        '<div class="jkl">',
        `<p><small>${definition.exportName} · ${getDefaultStyleSummary(definition)}</small></p>`,
        "<section>",
        "<h4>Skalerer med typografien</h4>",
        "<ul>",
        renderSizeExample(definition, "Brødtekst", "1rem"),
        renderSizeExample(definition, "Mellomtittel", "1.25rem"),
        renderSizeExample(definition, "Større fremheving", "1.5rem"),
        "</ul>",
        "</section>",
        "<section>",
        "<h4>I kontekst</h4>",
        `<p><span class="${getIconClassName(definition)}" aria-hidden="true">${definition.glyph}</span> ${definition.contextText}</p>`,
        "</section>",
        "</div>",
    ].join("");
}

function renderIconReactCode(definition: JokulIconDefinition): string {
    return `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/icon/icon.min.css";
import "@fremtind/jokul/styles/fonts/webfonts.min.css";
import { ${definition.exportName} } from "@fremtind/jokul/icon";

export function Example() {
    return (
        <span>
            <${definition.exportName} aria-hidden="true" />
            <span>${definition.contextText}</span>
        </span>
    );
}`;
}

function renderIconHtmlCode(definition: JokulIconDefinition): string {
    return `<span>
    <span class="${getIconClassName(definition)}" aria-hidden="true">${definition.glyph}</span>
    <span>${definition.contextText}</span>
</span>`;
}

function getUsageSections(definition: JokulIconDefinition): DesignSystemContentSection[] {
    const commonAccessibilityItems = [
        "Skjul dekorative ikoner med `aria-hidden=\"true\"` når teksten rundt allerede forklarer meningen.",
        "Hvis ikonet brukes alene i en knapp eller lenke, må kontrollen få et tydelig tilgjengelig navn.",
    ];

    if (definition.usageKind === "status") {
        return [
            {
                id: "bruk",
                title: `Når du skal bruke ${definition.exportName}`,
                paragraphs: [
                    `${definition.exportName} bør brukes når ${definition.useText}.`,
                    "Statusikoner fungerer best når de støtter en tydelig tekstlig etikett eller melding, ikke når de alene skal bære hele betydningen.",
                ],
                items: [
                    "Bruk samme ikon konsekvent for samme type status på tvers av flater.",
                    "La farge, ikon og tekst støtte hverandre i stedet for å legge all betydning i én kanal.",
                ],
            },
            {
                id: "tilgjengelighet",
                title: "Tilgjengelighet",
                paragraphs: [
                    "Statusikoner må kombineres med tekst som forklarer hva brukeren skal forstå eller gjøre videre.",
                    "Ikonet alene er sjelden nok for skjermlesere eller for brukere som ikke skiller farger og symboler raskt.",
                ],
                items: commonAccessibilityItems,
            },
        ];
    }

    if (definition.usageKind === "navigation") {
        return [
            {
                id: "bruk",
                title: `Når du skal bruke ${definition.exportName}`,
                paragraphs: [
                    `${definition.exportName} passer når ${definition.useText}.`,
                    "Navigasjonsikoner bør støtte retning og forventning, men teksten rundt må fortsatt beskrive målet eller handlingen klart.",
                ],
                items: [
                    "Bruk samme ikon konsekvent for samme type bevegelse, åpning eller retning.",
                    "Ikonet bør understøtte en etikett, ikke erstatte den i vanlige lenker og knapper.",
                ],
            },
            {
                id: "tilgjengelighet",
                title: "Tilgjengelighet",
                paragraphs: [
                    "Retningsikoner kan være nyttige for seende brukere, men kontrollen må fortsatt ha et tydelig navn.",
                    "Ikonet bør skjules fra skjermlesere når teksten allerede beskriver navigasjonen godt nok.",
                ],
                items: commonAccessibilityItems,
            },
        ];
    }

    return [
        {
            id: "bruk",
            title: `Når du skal bruke ${definition.exportName}`,
            paragraphs: [
                `${definition.exportName} fungerer best når ${definition.useText}.`,
                "Handlingsikoner bør brukes varsomt og bare når formen er allment forstått i konteksten eller støttes av synlig tekst.",
            ],
            items: [
                "Bruk ikon og tekst sammen når handlingen ikke er helt selvforklarende.",
                "Hold samme ikon for samme type handling på tvers av liknende flater og mønstre.",
            ],
        },
        {
            id: "tilgjengelighet",
            title: "Tilgjengelighet",
            paragraphs: [
                "Ikonbaserte handlinger må alltid ha et tilgjengelig navn via synlig tekst eller `aria-label` på kontrollen rundt.",
                "Dekorative handlingsikoner bør skjules fra skjermlesere når teksten ved siden av allerede beskriver handlingen.",
            ],
            items: commonAccessibilityItems,
        },
    ];
}

function createJokulIconDoc(
    definition: JokulIconDefinition,
): DesignSystemReferenceAssetDoc<"icon"> {
    return {
        slug: definition.slug,
        kind: "icon",
        title: definition.exportName,
        description: definition.description,
        keywords: [
            "jokul icon",
            "jokul ikon",
            definition.exportName,
            ...definition.keywords,
        ],
        packageName: "@fremtind/jokul",
        installGuideSlug: "react-og-core",
        intro: [
            `${definition.exportName} er et Jøkul-ikon som ${definition.useText}.`,
            `Eksporten \`${definition.exportName}\` bygger på Jøkul sin felles Icon-wrapper og bruker materialsymbol-fonten som følger med ikonstilene.`,
            `Denne eksporten rendres som ${getDefaultStyleSummary(definition)}, så docs-siden viser den slik komponenter normalt vil møte den i praksis.`,
        ],
        example: {
            slug: `${definition.slug}-preview`,
            previewHtml: renderIconPreview(definition),
            codeExamples: [
                {
                    label: "React",
                    language: "tsx",
                    code: renderIconReactCode(definition),
                },
                {
                    label: "HTML",
                    language: "html",
                    code: renderIconHtmlCode(definition),
                },
            ],
            notes: [
                "La vanligvis ikonets størrelse følge font-size i konteksten i stedet for å styre det hardt med egne mål.",
                definition.defaultBold || definition.defaultFilled
                    ? `Eksporten ${definition.exportName} setter allerede opp standardstilen som brukes i Jøkul.`
                    : `Eksporten ${definition.exportName} er en nøytral grunnvariant som kan kombineres med tekst i flere kontekster.`,
            ],
        },
        sections: getUsageSections(definition),
        tables: [
            {
                id: "ikonkontrakt",
                title: "Ikonkontrakt",
                columns: [
                    { key: "field", label: "Felt" },
                    { key: "value", label: "Verdi" },
                    { key: "note", label: "Notat" },
                ],
                rows: [
                    {
                        field: "Eksport",
                        value: definition.exportName,
                        note: "Navnet du importerer fra `@fremtind/jokul/icon`.",
                    },
                    {
                        field: "Import",
                        value: "@fremtind/jokul/icon",
                        note: "Jøkul samler ikonene i samme ikoninngang som den felles wrapperen.",
                    },
                    {
                        field: "Standardstil",
                        value: getDefaultStyleSummary(definition),
                        note: "Det er denne varianten komponentene normalt bruker som utgangspunkt.",
                    },
                    {
                        field: "Typisk bruk",
                        value: definition.usageKind,
                        note: definition.useText,
                    },
                ],
            },
        ],
        relatedLinks: [
            ...(definition.relatedLinks ?? []),
            {
                title: "Installer Jøkul",
                href: getJokulInstallGuideHref("react-og-core"),
                description: "Hent inn core og ikonstilene før du bruker Jøkul-ikonene lokalt.",
            },
        ],
    };
}

function createJokulIconCatalogItem(
    definition: JokulIconDefinition,
): DesignSystemCatalogItem {
    return {
        slug: definition.slug,
        title: definition.exportName,
        description: definition.description,
        status: "documented",
        localPath: getJokulAssetHref("ikoner", definition.slug),
        packageNames: ["@fremtind/jokul"],
    };
}

const jokulIconDefinitions: JokulIconDefinition[] = [
    {
        slug: "arrow-down",
        exportName: "ArrowDownIcon",
        glyph: "",
        description: "ArrowDownIcon markerer retning nedover til mer innhold, neste del av samme flate eller en meny som åpnes under kontrollen.",
        keywords: ["arrow down", "pil ned", "nedover", "vis mer"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at innhold eller navigasjon fortsetter nedover",
        contextText: "Se flere detaljer under",
    },
    {
        slug: "arrow-left",
        exportName: "ArrowLeftIcon",
        glyph: "",
        description: "ArrowLeftIcon markerer tilbake, forrige steg eller bevegelse mot venstre i en kontroll eller flyt.",
        keywords: ["arrow left", "pil venstre", "tilbake", "forrige"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at retningen går tilbake eller mot venstre",
        contextText: "Tilbake til forrige steg",
    },
    {
        slug: "arrow-north-east",
        exportName: "ArrowNorthEastIcon",
        glyph: "",
        description: "ArrowNorthEastIcon markerer at navigasjonen går ut av nåværende retning eller peker mot en ekstern ressurs.",
        keywords: ["arrow north east", "pil nordøst", "ekstern", "ut av flyten"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at navigasjonen peker ut av nåværende retning eller kontekst",
        contextText: "Gå til ekstern dokumentasjon",
    },
    {
        slug: "arrow-right",
        exportName: "ArrowRightIcon",
        glyph: "",
        description: "ArrowRightIcon markerer retning mot neste steg, neste side eller videre navigasjon.",
        keywords: ["arrow right", "pil høyre", "neste steg", "videre"],
        usageKind: "navigation",
        useText: "brukeren skal forstå retningen videre mot neste steg eller neste visning",
        contextText: "Gå til neste steg",
        relatedLinks: [
            {
                title: "Button",
                href: getJokulAssetHref("komponenter", "button"),
                description: "Brukes ofte i handlingsknapper som peker brukeren videre i en flyt.",
            },
        ],
    },
    {
        slug: "arrow-up",
        exportName: "ArrowUpIcon",
        glyph: "",
        description: "ArrowUpIcon markerer retning oppover, tilbake til toppen eller en bevegelse som trekker innhold oppover igjen.",
        keywords: ["arrow up", "pil opp", "til toppen", "oppover"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at retningen går oppover eller tilbake mot toppen",
        contextText: "Til toppen av siden",
    },
    {
        slug: "calendar",
        exportName: "CalendarIcon",
        glyph: "",
        description: "CalendarIcon markerer dato, kalender og valg av tidspunkt i skjemaer og planleggingsflater.",
        keywords: ["calendar", "kalender", "dato", "tidspunkt"],
        usageKind: "action",
        useText: "brukeren skal forstå at kontrollen gjelder dato, kalender eller valg av tidspunkt",
        contextText: "Velg dato",
    },
    {
        slug: "check",
        exportName: "CheckIcon",
        glyph: "",
        description: "CheckIcon markerer bekreftet, valgt eller fullført tilstand.",
        keywords: ["check", "bekreftet", "fullført", "valg"],
        usageKind: "status",
        useText: "brukeren skal se at noe er valgt, godkjent eller fullført",
        contextText: "Valget er lagret",
        relatedLinks: [
            {
                title: "Checkbox",
                href: getJokulAssetHref("komponenter", "checkbox"),
                description: "Naturlig sammen med avhukede valg og bekreftede tilstander i skjemaer.",
            },
        ],
    },
    {
        slug: "chevron-down",
        exportName: "ChevronDownIcon",
        glyph: "",
        description: "ChevronDownIcon viser at noe kan åpnes, foldes ut eller velges fra en nedtrekksliste.",
        keywords: ["chevron down", "nedtrekk", "utvid", "åpne"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at mer innhold eller flere valg åpnes nedover",
        contextText: "Vis flere valg",
        relatedLinks: [
            {
                title: "Select",
                href: getJokulAssetHref("komponenter", "select"),
                description: "Typisk ikon for nedtrekksfelt og andre kontroller som åpner en liste.",
            },
        ],
    },
    {
        slug: "chevron-left",
        exportName: "ChevronLeftIcon",
        glyph: "",
        description: "ChevronLeftIcon viser at brukeren kan gå til forrige element, side eller steg i en kompakt navigasjon.",
        keywords: ["chevron left", "forrige", "venstre", "tilbake"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at noe flyttes eller navigeres mot venstre",
        contextText: "Forrige side",
    },
    {
        slug: "chevron-right",
        exportName: "ChevronRightIcon",
        glyph: "",
        description: "ChevronRightIcon viser at brukeren kan gå til neste element, side eller steg i en kompakt navigasjon.",
        keywords: ["chevron right", "neste", "høyre", "videre"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at noe flyttes eller navigeres mot høyre",
        contextText: "Neste side",
    },
    {
        slug: "chevron-up",
        exportName: "ChevronUpIcon",
        glyph: "",
        description: "ChevronUpIcon viser at innhold kan skjules, foldes sammen eller trekkes opp igjen.",
        keywords: ["chevron up", "skjul", "kollaps", "opp"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at innhold kan lukkes eller trekkes oppover",
        contextText: "Skjul detaljer",
    },
    {
        slug: "close",
        exportName: "CloseIcon",
        glyph: "",
        description: "CloseIcon brukes for å lukke, avvise eller fjerne noe i en tett kontrollflate.",
        keywords: ["close", "lukk", "fjern", "avbryt"],
        usageKind: "action",
        useText: "brukeren skal avslutte, lukke eller fjerne noe raskt fra en kjent kontroll",
        contextText: "Lukk panelet",
    },
    {
        slug: "copy",
        exportName: "CopyIcon",
        glyph: "",
        description: "CopyIcon markerer kopiering av tekst, kode eller identifikatorer til utklippstavlen.",
        keywords: ["copy", "kopier", "clipboard", "utklippstavle"],
        usageKind: "action",
        useText: "brukeren skal forstå at innhold kan kopieres uten å forlate flaten",
        contextText: "Kopier koden",
    },
    {
        slug: "dots",
        exportName: "DotsIcon",
        glyph: "",
        description: "DotsIcon markerer at flere sekundære handlinger er samlet i en kompakt meny.",
        keywords: ["dots", "more", "flere valg", "meny"],
        usageKind: "action",
        useText: "brukeren skal forstå at flere sekundære handlinger ligger samlet bak en meny",
        contextText: "Flere handlinger",
    },
    {
        slug: "drag",
        exportName: "DragIcon",
        glyph: "",
        description: "DragIcon markerer at et element kan flyttes, sorteres eller dras til en ny posisjon.",
        keywords: ["drag", "flytt", "sorter", "reorder"],
        usageKind: "action",
        useText: "brukeren skal forstå at et element kan flyttes eller sorteres direkte",
        contextText: "Flytt raden",
    },
    {
        slug: "error",
        exportName: "ErrorIcon",
        glyph: "",
        description: "ErrorIcon viser alvorlig feilstatus som krever oppfølging eller korrigering.",
        keywords: ["error", "feil", "kritisk", "validering"],
        usageKind: "status",
        useText: "brukeren må forstå at noe er feil og trenger oppmerksomhet før arbeidet kan fortsette",
        contextText: "Feltet har en feil som må rettes",
        defaultBold: true,
        defaultFilled: true,
        relatedLinks: [
            {
                title: "TextInput",
                href: getJokulAssetHref("komponenter", "text-input"),
                description: "Brukes ofte sammen med feilmeldinger og valideringsstatus i skjemaer.",
            },
        ],
    },
    {
        slug: "hamburger",
        exportName: "HamburgerIcon",
        glyph: "",
        description: "HamburgerIcon brukes for å åpne global eller lokal meny når navigasjonen ellers er skjult eller komprimert.",
        keywords: ["hamburger", "meny", "navigasjon", "åpne meny"],
        usageKind: "navigation",
        useText: "brukeren skal åpne en meny eller navigasjon som ellers er skjult",
        contextText: "Åpne menyen",
    },
    {
        slug: "info",
        exportName: "InfoIcon",
        glyph: "",
        description: "InfoIcon markerer nøytral tilleggsinformasjon eller forklaring som brukeren bør kunne oppdage raskt.",
        keywords: ["info", "informasjon", "hjelp", "forklaring"],
        usageKind: "status",
        useText: "brukeren skal få en ekstra forklaring eller rolig informasjonsstatus uten at det er en feil",
        contextText: "Mer informasjon er tilgjengelig",
        defaultBold: true,
        defaultFilled: true,
        relatedLinks: [
            {
                title: "TextInput",
                href: getJokulAssetHref("komponenter", "text-input"),
                description: "Nyttig sammen med hjelpetekst og forklaringer rundt felt og skjemaer.",
            },
        ],
    },
    {
        slug: "link",
        exportName: "LinkIcon",
        glyph: "",
        description: "LinkIcon markerer lenker, delbare koblinger eller handlinger som knytter brukeren til en URL.",
        keywords: ["link", "lenke", "url", "delbar"],
        usageKind: "action",
        useText: "brukeren skal forstå at kontrollen gjelder en lenke eller en delbar kobling",
        contextText: "Kopier delbar lenke",
    },
    {
        slug: "minus",
        exportName: "MinusIcon",
        glyph: "",
        description: "MinusIcon brukes for å redusere, fjerne eller trekke sammen noe i en tydelig kontroll.",
        keywords: ["minus", "fjern", "reduser", "trekk sammen"],
        usageKind: "action",
        useText: "brukeren skal forstå at noe fjernes, reduseres eller trekkes sammen",
        contextText: "Fjern et valg",
    },
    {
        slug: "open-in-new",
        exportName: "OpenInNewIcon",
        glyph: "",
        description: "OpenInNewIcon viser at en lenke åpner et nytt vindu eller tar brukeren ut av nåværende kontekst.",
        keywords: ["open in new", "nytt vindu", "ekstern lenke", "utenfor"],
        usageKind: "navigation",
        useText: "brukeren skal forstå at navigasjonen går ut av nåværende kontekst eller åpner en ny flate",
        contextText: "Åpne dokumentasjon i nytt vindu",
    },
    {
        slug: "pen",
        exportName: "PenIcon",
        glyph: "",
        description: "PenIcon markerer redigering, endring eller klargjøring av eksisterende innhold.",
        keywords: ["pen", "rediger", "endre", "edit"],
        usageKind: "action",
        useText: "brukeren skal forstå at eksisterende innhold kan endres eller redigeres",
        contextText: "Rediger innhold",
    },
    {
        slug: "plus",
        exportName: "PlusIcon",
        glyph: "",
        description: "PlusIcon markerer oppretting, tillegg eller utvidelse av innhold og valg.",
        keywords: ["plus", "legg til", "opprett", "utvid"],
        usageKind: "action",
        useText: "brukeren skal forstå at noe nytt legges til eller at innhold kan utvides",
        contextText: "Legg til et nytt element",
    },
    {
        slug: "question",
        exportName: "QuestionIcon",
        glyph: "",
        description: "QuestionIcon markerer hjelp, usikkerhet eller et sted der brukeren kan få en forklaring.",
        keywords: ["question", "spørsmål", "hjelp", "forklaring"],
        usageKind: "action",
        useText: "brukeren skal forstå at hjelp eller en ekstra forklaring kan åpnes",
        contextText: "Vis hjelp til feltet",
    },
    {
        slug: "search",
        exportName: "SearchIcon",
        glyph: "",
        description: "SearchIcon brukes for søkefelt, søkehandlinger og innganger til oppslag.",
        keywords: ["search", "søk", "forstørrelsesglass", "oppslag"],
        usageKind: "action",
        useText: "brukeren skal forstå at kontrollen søker i innhold eller åpner en søkeflate",
        contextText: "Søk i dokumentasjonen",
        relatedLinks: [
            {
                title: "Søk i dokumentasjonen",
                href: "/ds/søk",
                description: "Se hvordan søkeinnganger brukes i selve oversiktsprosjektet.",
            },
        ],
    },
    {
        slug: "success",
        exportName: "SuccessIcon",
        glyph: "",
        description: "SuccessIcon viser tydelig positiv status når noe er ferdig, lagret eller fullført uten feil.",
        keywords: ["success", "suksess", "fullført", "lagret"],
        usageKind: "status",
        useText: "brukeren skal forstå at noe er vellykket fullført eller lagret",
        contextText: "Endringen ble lagret",
        defaultBold: true,
        defaultFilled: true,
    },
    {
        slug: "thumb-down",
        exportName: "ThumbDownIcon",
        glyph: "",
        description: "ThumbDownIcon brukes for negativ tilbakemelding, vurdering eller eksplisitt avvisning av noe.",
        keywords: ["thumb down", "negativ", "ikke nyttig", "avvis"],
        usageKind: "action",
        useText: "brukeren skal forstå at kontrollen gir negativ tilbakemelding eller avvisning",
        contextText: "Marker som ikke nyttig",
    },
    {
        slug: "thumb-up",
        exportName: "ThumbUpIcon",
        glyph: "",
        description: "ThumbUpIcon brukes for positiv tilbakemelding, vurdering eller eksplisitt bekreftelse.",
        keywords: ["thumb up", "positiv", "nyttig", "bekreft"],
        usageKind: "action",
        useText: "brukeren skal forstå at kontrollen gir positiv tilbakemelding eller bekreftelse",
        contextText: "Marker som nyttig",
    },
    {
        slug: "trash-can",
        exportName: "TrashCanIcon",
        glyph: "",
        description: "TrashCanIcon brukes for sletting og fjerning når handlingen må være tydelig og vanskelig å misforstå.",
        keywords: ["trash", "slett", "fjerne", "delete"],
        usageKind: "action",
        useText: "brukeren skal forstå at noe slettes eller fjernes permanent eller semipermanent",
        contextText: "Slett elementet",
    },
    {
        slug: "warning",
        exportName: "WarningIcon",
        glyph: "",
        description: "WarningIcon peker på forhold brukeren bør lese eller vurdere før arbeidet fortsetter.",
        keywords: ["warning", "advarsel", "oppmerksomhet", "risiko"],
        usageKind: "status",
        useText: "brukeren bør stoppe opp og lese en advarsel eller viktig merknad",
        contextText: "Sjekk informasjonen før du går videre",
        defaultBold: true,
        defaultFilled: true,
    },
];

export const jokulIconDocs = jokulIconDefinitions.map(createJokulIconDoc);
export const jokulIconCatalogItems = jokulIconDefinitions.map(createJokulIconCatalogItem);
