import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type SelectPropSource = "design-system" | "framework" | "native" | "aria";

interface SelectPropDoc {
    source: SelectPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: SelectPropDoc,
): prop is SelectPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(prop: SelectPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const selectPropDocs: SelectPropDoc[] = [
    {
        source: "design-system",
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Lar selecten stå i kompakte linjer der labelen skjules visuelt, men fortsatt finnes for skjermlesere.",
        interactiveControl: {
            kind: "boolean",
            name: "inline",
            label: "Inline",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Markerer feltet som ugyldig og brukes sammen med en forklarende feilmelding.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "width",
        type: "string",
        defaultValue: "auto",
        description: "Lar deg styre bredden på outer wrapper når selecten trenger en tydelig fast bredde i layouten.",
        interactiveControl: {
            kind: "select",
            name: "width",
            label: "Bredde",
            defaultValue: "auto",
            options: [
                { value: "auto", label: "Auto" },
                { value: "14rem", label: "14rem" },
                { value: "20rem", label: "20rem" },
            ],
        },
    },
    {
        source: "design-system",
        name: "placeholder",
        type: "string",
        defaultValue: `"Velg"`,
        description: "Teksten som vises før brukeren har valgt noe i den native listen.",
        interactiveControl: {
            kind: "select",
            name: "placeholder",
            label: "Placeholder",
            defaultValue: "Velg fase",
            options: [
                { value: "Velg fase", label: "Velg fase" },
                { value: "Velg status", label: "Velg status" },
            ],
        },
    },
    {
        source: "framework",
        name: "data-testautoid",
        type: "string",
        defaultValue: "ingen",
        description: "Stabil test-id fra Jøkul sin kjernetype når selecten må spores i automatiserte tester.",
    },
    {
        source: "framework",
        name: "id",
        type: "string",
        defaultValue: "auto-generert når mulig",
        description: "Lar deg styre koblingen mellom label, support-tekst og det underliggende select-elementet eksplisitt.",
    },
    {
        source: "framework",
        name: "label",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Labelteksten som beskriver hva listen gjelder.",
    },
    {
        source: "framework",
        name: "items",
        type: "Array<string | ValuePair>",
        defaultValue: "påkrevd",
        description: "Alternativene som vises i selecten.",
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på wrapperen når selecten må kobles til lokal layout eller sporing.",
    },
    {
        source: "framework",
        name: "data-testid",
        type: "string",
        defaultValue: "ingen",
        description: "Testkrok på wrapperen når teamet bruker `data-testid` i komponenttester.",
    },
    {
        source: "framework",
        name: "data-size",
        type: "\"small\" | \"medium\" | \"large\"",
        defaultValue: "arver størrelse",
        description: "Lar feltet følge en eksplisitt størrelseskontrakt når layouten trenger det.",
    },
    {
        source: "framework",
        name: "labelProps",
        type: "Omit<LabelProps, \"children\" | \"htmlFor\" | \"standAlone\">",
        defaultValue: "ingen",
        description: "Justerer label-varianten eller skjuler den visuelt uten å miste koblingen til feltet.",
    },
    {
        source: "framework",
        name: "supportLabelProps",
        type: "Omit<SupportLabelProps, \"id\" | \"errorLabel\" | \"helpLabel\">",
        defaultValue: "ingen",
        description: "Styrer hvordan hjelp- eller feilmeldingen under feltet rendres.",
    },
    {
        source: "framework",
        name: "description",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Ekstra beskrivelsetekst mellom label og felt når brukeren trenger mer kontekst før et valg tas.",
    },
    {
        source: "framework",
        name: "tooltip",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Knytter en ekstra forklaring til labelen uten å gjøre den synlige hjelpeteksten permanent.",
    },
    {
        source: "framework",
        name: "style",
        type: "CSSProperties",
        defaultValue: "ingen inline-stiler",
        description: "Lar wrapperen få inline-stiler når layouten må styres programmatisk i en avgrenset kontekst.",
    },
    {
        source: "framework",
        name: "render",
        type: "(props: InputProps) => JSX.Element",
        defaultValue: "ingen custom render",
        description: "Avansert escape hatch når InputGroup-familien må rendres via en egendefinert funksjon.",
    },
    {
        source: "framework",
        name: "helpLabel",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Hjelpetekst under feltet når brukeren trenger ekstra føring før et valg tas.",
    },
    {
        source: "framework",
        name: "errorLabel",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Feilmelding under feltet når selecten er ugyldig eller mangler et påkrevd valg.",
    },
    {
        source: "native",
        name: "value",
        type: "string",
        defaultValue: "tom streng",
        description: "Den valgte verdien når selecten brukes kontrollert.",
        interactiveControl: {
            kind: "select",
            name: "valueState",
            label: "Verdi",
            defaultValue: "empty",
            options: [
                { value: "empty", label: "Ingen valgt" },
                { value: "planning", label: "Planlegging" },
                { value: "published", label: "Publisert" },
            ],
        },
    },
    {
        source: "native",
        name: "name",
        type: "string",
        defaultValue: "påkrevd",
        description: "Feltets navn i skjemaer og ved innsending.",
    },
    {
        source: "native",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Brukes når brukeren midlertidig ikke skal kunne velge i listen.",
        interactiveControl: {
            kind: "boolean",
            name: "disabled",
            label: "Disabled",
            defaultValue: false,
        },
    },
    {
        source: "native",
        name: "required",
        type: "boolean",
        defaultValue: "false",
        description: "Markerer at brukeren må velge en verdi før skjemaet kan sendes inn.",
    },
    {
        source: "native",
        name: "selectClassName",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på det underliggende `<select>`-elementet når bare selve feltknappen må styles eller spores.",
    },
    {
        source: "aria",
        name: "aria-describedby",
        type: "string",
        defaultValue: "ingen",
        description: "Kobler selecten til hjelpetekst eller feilmelding under feltet.",
    },
    {
        source: "aria",
        name: "aria-invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Bør settes når feltet er ugyldig og samtidig peke til en konkret feilmelding.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
];

const selectPropTableDefinitions = [
    {
        source: "design-system",
        description: "Jøkul-props som styrer wrapper, tilstand og førstevalget i den native selecten.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "Props på `NativeSelect` og InputGroup rundt feltet.",
    },
    {
        source: "native",
        description: "Native HTML-attributter som sendes til det underliggende `<select>`-elementet.",
    },
    {
        source: "aria",
        description: "Tilgjengelighetsattributter som knytter selecten til støttetekst og feilstatus.",
    },
] as const;

export const selectPropTables: DesignSystemPropTable[] = selectPropTableDefinitions
    .map((definition) => {
        const rows = selectPropDocs
            .filter((prop) => prop.source === definition.source)
            .map((prop) => ({
                name: prop.name,
                type: prop.type,
                defaultValue: prop.defaultValue,
                description: prop.description,
                interactiveControlName: getInteractiveControlName(prop),
            }));

        if (definition.source === "framework") {
            return {
                source: definition.source,
                frameworkName: definition.frameworkName,
                description: definition.description,
                rows,
            } satisfies DesignSystemPropTable;
        }

        return {
            source: definition.source,
            description: definition.description,
            rows,
        } satisfies DesignSystemPropTable;
    })
    .filter((table) => table.rows.length > 0);

export const selectInteractiveControls = selectPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl)
    .filter((control, index, controls) =>
        controls.findIndex((entry) => entry.name === control.name) === index
    );
