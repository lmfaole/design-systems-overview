import type {
    DesignSystemDeprecatedPropMigration,
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type ButtonPropCategory = "jokul" | "react" | "native" | "aria" | "legacy";

interface ButtonPropDocBase {
    name: string;
    type: string;
    defaultValue: string;
}

interface ButtonDescribedPropDoc extends ButtonPropDocBase {
    description: string;
}

interface ButtonDesignSystemPropDoc extends ButtonDescribedPropDoc {
    category: "jokul";
    interactiveControl: DesignSystemInteractiveExampleControl;
}

interface ButtonDocumentedPropDoc extends ButtonDescribedPropDoc {
    category: Exclude<ButtonPropCategory, "jokul" | "legacy">;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

interface ButtonLegacyPropDoc extends ButtonPropDocBase {
    category: "legacy";
    migrationGuide: Omit<DesignSystemDeprecatedPropMigration, "propName" | "warning">;
}

type ButtonPropDoc = ButtonDesignSystemPropDoc | ButtonDocumentedPropDoc | ButtonLegacyPropDoc;

function hasInteractiveControl(
    prop: ButtonPropDoc,
): prop is ButtonPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function isButtonDesignSystemProp(prop: ButtonPropDoc): prop is ButtonDesignSystemPropDoc {
    return prop.category === "jokul";
}

function isButtonLegacyProp(prop: ButtonPropDoc): prop is ButtonLegacyPropDoc {
    return prop.category === "legacy";
}

function getButtonLegacyWarning(prop: ButtonLegacyPropDoc): string {
    return `Utfaset API. Bruk ${prop.migrationGuide.replacement} i stedet.`;
}

function getButtonPropDescription(prop: ButtonPropDoc): string {
    return isButtonLegacyProp(prop)
        ? getButtonLegacyWarning(prop)
        : prop.description;
}

function getButtonInteractiveControlName(prop: ButtonPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const buttonPropDocs: ButtonPropDoc[] = [
    {
        category: "react",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd når du ikke bruker `icon`",
        description: "Synlig etikett eller innhold i knappen. Når du bruker ren ikon-knapp styres innholdet via `icon`.",
    },
    {
        category: "jokul",
        name: "as",
        type: "React.ElementType",
        defaultValue: '"button"',
        description: "Polymorf rendering av knappen som et annet element, for eksempel en lenke når API-et krever det.",
        interactiveControl: {
            kind: "select",
            name: "as",
            label: "As",
            defaultValue: "button",
            options: [
                { value: "button", label: "button" },
                { value: "a", label: "a" },
            ],
        },
    },
    {
        category: "jokul",
        name: "variant",
        type: `"primary" | "secondary" | "tertiary" | "ghost"`,
        defaultValue: `"secondary"`,
        description: "Velger visuelt nivå for handlingen.",
        interactiveControl: {
            kind: "select",
            name: "variant",
            label: "Variant",
            defaultValue: "secondary",
            options: [
                { value: "primary", label: "Primary" },
                { value: "secondary", label: "Secondary" },
                { value: "tertiary", label: "Tertiary" },
                { value: "ghost", label: "Ghost" },
            ],
        },
    },
    {
        category: "jokul",
        name: "density",
        type: `"comfortable" | "compact"`,
        defaultValue: "arver layout-density",
        description: "Overstyrer tettheten for enkeltknappen dersom du ikke vil arve den fra omgivelsene.",
        interactiveControl: {
            kind: "select",
            name: "density",
            label: "Density",
            defaultValue: "inherit",
            options: [
                { value: "inherit", label: "Arv fra kontekst" },
                { value: "comfortable", label: "comfortable" },
                { value: "compact", label: "compact" },
            ],
        },
    },
    {
        category: "native",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Gjør knappen utilgjengelig for aktivering inntil brukeren har fullført nødvendige steg.",
        interactiveControl: {
            kind: "boolean",
            name: "disabled",
            label: "Disabled",
            defaultValue: false,
        },
    },
    {
        category: "native",
        name: "type",
        type: `"button" | "submit" | "reset"`,
        defaultValue: `"button"`,
        description: "Definerer hvordan knappen oppfører seg i skjemaer.",
        interactiveControl: {
            kind: "select",
            name: "type",
            label: "Type",
            defaultValue: "button",
            options: [
                { value: "button", label: "button" },
                { value: "submit", label: "submit" },
                { value: "reset", label: "reset" },
            ],
        },
    },
    {
        category: "react",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på rotelementet når du må koble knappen til lokal layout eller sporing.",
    },
    {
        category: "jokul",
        name: "loader",
        type: "{ showLoader: boolean; textDescription: string }",
        defaultValue: "ingen loader",
        description: "Viser innebygget lasteindikator og krever en tekstlig beskrivelse for skjermlesere.",
        interactiveControl: {
            kind: "select",
            name: "loader",
            label: "Loader",
            defaultValue: "none",
            options: [
                { value: "none", label: "Ingen" },
                { value: "sending", label: "Vis loader" },
            ],
        },
    },
    {
        category: "jokul",
        name: "icon",
        type: "ReactElement",
        defaultValue: "ingen",
        description: "Ikoninnhold for knapper som kombinerer tekst og ikon eller rendres som ren ikon-knapp.",
        interactiveControl: {
            kind: "select",
            name: "icon",
            label: "Icon",
            defaultValue: "none",
            options: [
                { value: "none", label: "Ingen" },
                { value: "download", label: "Download" },
                { value: "arrow", label: "Arrow" },
            ],
        },
    },
    {
        category: "jokul",
        name: "iconPosition",
        type: '"left" | "right"',
        defaultValue: '"left"',
        description: "Plasserer ikonet på venstre eller høyre side når `icon` er satt.",
        interactiveControl: {
            kind: "select",
            name: "iconPosition",
            label: "Icon position",
            defaultValue: "left",
            options: [
                { value: "left", label: "left" },
                { value: "right", label: "right" },
            ],
        },
    },
    {
        category: "legacy",
        name: "iconLeft",
        type: "ReactNode",
        defaultValue: "deprecated",
        migrationGuide: {
            replacement: "`icon` sammen med `iconPosition=\"left\"`",
            replacementCode: 'icon={icon} iconPosition="left"',
            beforeCode: `<Button iconLeft={icon}>Send inn</Button>`,
            afterCode: `<Button icon={icon} iconPosition="left">Send inn</Button>`,
            notes: [
                "Flytt det samme ikoninnholdet over til `icon` uten å endre knappens tekst.",
            ],
        },
    },
    {
        category: "legacy",
        name: "iconRight",
        type: "ReactNode",
        defaultValue: "deprecated",
        migrationGuide: {
            replacement: "`icon` sammen med `iconPosition=\"right\"`",
            replacementCode: 'icon={icon} iconPosition="right"',
            beforeCode: `<Button iconRight={icon}>Send inn</Button>`,
            afterCode: `<Button icon={icon} iconPosition="right">Send inn</Button>`,
            notes: [
                "Behold eksisterende ikon, men flytt plasseringen over til `iconPosition`.",
            ],
        },
    },
    {
        category: "native",
        name: "href",
        type: "string",
        defaultValue: "ikke relevant for vanlig knapp",
        description: "Kommer fra det underliggende elementet når knappen rendres som lenke via `as`.",
    },
    {
        category: "native",
        name: "onClick",
        type: "(event) => void",
        defaultValue: "ingen handler",
        description: "Klikkhåndterer for knappvarianter som faktisk utfører en handling i grensesnittet.",
    },
    {
        category: "aria",
        name: "aria-label",
        type: "string",
        defaultValue: "ingen",
        description: "Brukes når knappen trenger et eksplisitt tilgjengelig navn, for eksempel hvis den bare viser et ikon.",
    },
    {
        category: "aria",
        name: "aria-describedby",
        type: "string",
        defaultValue: "ingen",
        description: "Peker til hjelpetekst eller feilmelding som utdyper hva knappen gjør eller hvorfor den er utilgjengelig.",
    },
];

const buttonPropTableCategories = [
    [
        "jokul",
        {
            source: "design-system",
            description: "Props som er definert av Jøkul sitt eget Button-API eller av den polymorfe kontrakten rundt komponenten.",
        },
    ],
    [
        "react",
        {
            source: "framework",
            frameworkName: "React",
            description: "Props som følger den vanlige React-komponentmodellen.",
        },
    ],
    [
        "native",
        {
            source: "native",
            description: "Props som kommer fra det underliggende HTML-elementet når knappen rendres som `button` eller et annet nativt element.",
        },
    ],
    [
        "aria",
        {
            source: "aria",
            description: "Tilgjengelighetsattributter som kommer fra den underliggende DOM-kontrakten.",
        },
    ],
    [
        "legacy",
        {
            source: "deprecated",
            description: "Gamle Jøkul-props som fortsatt finnes i typen, men bør erstattes av nyere API-er.",
        },
    ],
] as const;

export const buttonPropTables: DesignSystemPropTable[] = buttonPropTableCategories
    .map<DesignSystemPropTable>(([category, meta]) => {
        const rows = buttonPropDocs
            .filter((prop) => prop.category === category)
            .map((prop) => ({
                name: prop.name,
                type: prop.type,
                defaultValue: prop.defaultValue,
                description: getButtonPropDescription(prop),
                interactiveControlName: getButtonInteractiveControlName(prop),
            }));

        if (meta.source === "framework") {
            return {
                source: "framework",
                frameworkName: meta.frameworkName ?? "Framework",
                description: meta.description,
                rows,
            };
        }

        return {
            source: meta.source,
            description: meta.description,
            rows,
        };
    })
    .filter((table) => table.rows.length > 0);

export const buttonInteractiveControls = buttonPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl);

const buttonDesignSystemPropNames = buttonPropDocs
    .filter(isButtonDesignSystemProp)
    .map((prop) => prop.name);
const buttonInteractiveControlNames = new Set(
    buttonInteractiveControls.map((control) => control.name),
);

if (buttonInteractiveControlNames.size !== buttonInteractiveControls.length) {
    throw new Error("Jøkul Button example controls must use unique names.");
}

const missingButtonDesignSystemControls = buttonDesignSystemPropNames.filter((name) =>
    !buttonInteractiveControlNames.has(name));

if (missingButtonDesignSystemControls.length > 0) {
    throw new Error(
        `Jøkul Button docs are missing interactive controls for: ${missingButtonDesignSystemControls.join(", ")}`,
    );
}

export const buttonDeprecatedPropMigrations: DesignSystemDeprecatedPropMigration[] = buttonPropDocs
    .filter(isButtonLegacyProp)
    .map((prop) => ({
        propName: prop.name,
        warning: getButtonLegacyWarning(prop),
        replacement: prop.migrationGuide.replacement,
        beforeCode: prop.migrationGuide.beforeCode,
        afterCode: prop.migrationGuide.afterCode,
        replacementCode: prop.migrationGuide.replacementCode,
        notes: prop.migrationGuide.notes,
    }));

for (const migration of buttonDeprecatedPropMigrations) {
    if (!migration.beforeCode.includes(migration.propName)) {
        throw new Error(
            `Jøkul Button migration for ${migration.propName} must show the deprecated prop in beforeCode.`,
        );
    }

    if (migration.replacementCode && !migration.afterCode.includes(migration.replacementCode)) {
        throw new Error(
            `Jøkul Button migration for ${migration.propName} must use the exact replacement described in replacementCode.`,
        );
    }
}
