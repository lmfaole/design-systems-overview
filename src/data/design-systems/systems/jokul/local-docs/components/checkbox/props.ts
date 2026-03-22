import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type CheckboxPropSource = "design-system" | "framework" | "native" | "aria";

interface CheckboxPropDoc {
    source: CheckboxPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: CheckboxPropDoc,
): prop is CheckboxPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(prop: CheckboxPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const checkboxPropDocs: CheckboxPropDoc[] = [
    {
        source: "design-system",
        name: "checked",
        type: "boolean",
        defaultValue: "false",
        description: "Setter komponenten i avhuket tilstand når den brukes som kontrollert felt.",
        interactiveControl: {
            kind: "boolean",
            name: "checked",
            label: "Checked",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Legger til `jkl-checkbox--inline` når checkboxen skal stå tett sammen med annen tekst eller andre kontroller.",
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
        description: "Markerer feltet som ugyldig og legger til Jøkul sin error-state på wrapperen.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
    {
        source: "framework",
        name: "data-testautoid",
        type: "string",
        defaultValue: "ingen",
        description: "Stabil test-id fra Jøkul sin kjernetype når feltet må spores i automatiserte tester uten å lene seg på labelteksten.",
    },
    {
        source: "framework",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Synlig labeltekst som også blir tilgjengelig navn for checkboxen.",
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på wrapperen når komponenten må kobles til lokal layout eller sporing.",
    },
    {
        source: "native",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Brukes når brukeren midlertidig ikke skal kunne endre valget.",
        interactiveControl: {
            kind: "boolean",
            name: "disabled",
            label: "Disabled",
            defaultValue: false,
        },
    },
    {
        source: "native",
        name: "name",
        type: "string",
        defaultValue: "påkrevd",
        description: "Navnet som sendes med skjemaet når checkboxen ligger i et formfelt.",
    },
    {
        source: "native",
        name: "value",
        type: "string",
        defaultValue: "påkrevd",
        description: "Verdien som sendes når checkboxen er krysset av.",
    },
    {
        source: "native",
        name: "onChange",
        type: "(event) => void",
        defaultValue: "ingen handler",
        description: "Håndterer endringer når komponenten brukes kontrollert i React.",
    },
    {
        source: "native",
        name: "onFocus",
        type: "(event) => void",
        defaultValue: "ingen handler",
        description: "Brukes når feltet må reagere idet checkboxen får fokus, for eksempel for lokal hjelpetekst eller analyse.",
    },
    {
        source: "native",
        name: "onBlur",
        type: "(event) => void",
        defaultValue: "ingen handler",
        description: "Brukes når du vil validere eller rydde opp etter at checkboxen mister fokus.",
    },
    {
        source: "native",
        name: "indeterminate",
        type: "boolean",
        defaultValue: "false",
        description: "Viser en mellomtilstand når et overordnet valg bare er delvis oppfylt, for eksempel i hierarkiske sjekklister.",
    },
    {
        source: "aria",
        name: "aria-describedby",
        type: "string",
        defaultValue: "ingen",
        description: "Pek til hjelpetekst eller feilmelding som utdyper hva valget gjelder.",
    },
    {
        source: "aria",
        name: "aria-invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Settes når feltet er ugyldig og bør da peke til en forklarende feilmelding.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
];

const checkboxPropTableDefinitions = [
    {
        source: "design-system",
        description: "Jøkul-props og wrappermodifikatorer som styrer tilstand og layout rundt checkboxen.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "Vanlige React-props som påvirker hvordan checkboxen brukes i komponenttrær.",
    },
    {
        source: "native",
        description: "Native HTML-attributter som sendes videre til det underliggende `<input type=\"checkbox\">`-elementet.",
    },
    {
        source: "aria",
        description: "Tilgjengelighetsattributter som kobler checkboxen til hjelpetekst og feilmeldinger.",
    },
] as const;

export const checkboxPropTables: DesignSystemPropTable[] = checkboxPropTableDefinitions
    .map((definition) => {
        const rows = checkboxPropDocs
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

export const checkboxInteractiveControls = checkboxPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl)
    .filter((control, index, controls) =>
        controls.findIndex((entry) => entry.name === control.name) === index
    );
