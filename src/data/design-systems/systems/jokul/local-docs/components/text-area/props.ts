import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type TextAreaPropSource = "design-system" | "framework" | "native" | "aria";

interface TextAreaPropDoc {
    source: TextAreaPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: TextAreaPropDoc,
): prop is TextAreaPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(prop: TextAreaPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const textAreaPropDocs: TextAreaPropDoc[] = [
    {
        source: "design-system",
        name: "rows",
        type: "number",
        defaultValue: "7",
        description: "Bestemmer hvor mange tekstlinjer feltet ekspanderer til når det åpnes eller får fokus.",
        interactiveControl: {
            kind: "select",
            name: "rows",
            label: "Rader",
            defaultValue: "7",
            options: [
                { value: "3", label: "3" },
                { value: "7", label: "7" },
                { value: "10", label: "10" },
            ],
        },
    },
    {
        source: "design-system",
        name: "startOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Lar feltet starte i åpen høyde i stedet for å ekspandere først ved fokus eller innhold.",
        interactiveControl: {
            kind: "boolean",
            name: "startOpen",
            label: "Start open",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "autoExpand",
        type: "boolean",
        defaultValue: "false",
        description: "Lar feltet vokse med innholdet i stedet for å bruke intern scrolling.",
        interactiveControl: {
            kind: "boolean",
            name: "autoExpand",
            label: "Auto expand",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "counter",
        type: "{ maxLength: number; hideProgress?: boolean }",
        defaultValue: "ingen teller",
        description: "Viser tegnteller og progresjonslinje når brukeren må forholde seg til en maksimumslengde.",
        interactiveControl: {
            kind: "boolean",
            name: "counter",
            label: "Teller",
            defaultValue: false,
        },
    },
    {
        source: "framework",
        name: "data-testautoid",
        type: "string",
        defaultValue: "ingen",
        description: "Stabil test-id fra Jøkul sin kjernetype når feltet må spores i ende-til-ende-tester.",
    },
    {
        source: "framework",
        name: "id",
        type: "string",
        defaultValue: "auto-generert når mulig",
        description: "Gir deg kontroll over koblingen mellom label, support-tekst og textarea-elementet.",
    },
    {
        source: "framework",
        name: "label",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Labelteksten som forklarer hva brukeren skal beskrive i feltet.",
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på wrapperen når feltet må kobles til lokal layout eller sporing.",
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
        description: "Lar feltet følge en eksplisitt størrelseskontrakt i tettpakkede skjemaer.",
    },
    {
        source: "framework",
        name: "labelProps",
        type: "Omit<LabelProps, \"children\" | \"htmlFor\" | \"standAlone\">",
        defaultValue: "ingen",
        description: "Styrer label-varianten eller skjuler labelen visuelt uten å miste koblingen til feltet.",
    },
    {
        source: "framework",
        name: "supportLabelProps",
        type: "Omit<SupportLabelProps, \"id\" | \"errorLabel\" | \"helpLabel\">",
        defaultValue: "ingen",
        description: "Tilpasser hvordan hjelp- eller feilmeldingen under feltet rendres.",
    },
    {
        source: "framework",
        name: "helpLabel",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Kort støttetekst når brukeren trenger føring om format eller detaljnivå.",
    },
    {
        source: "framework",
        name: "errorLabel",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Feilmelding som forklarer hva som mangler eller er ugyldig i teksten.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
    {
        source: "framework",
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Lar feltet inngå i mer kompakte oppsett der labelen skjules visuelt, men fortsatt finnes for skjermlesere.",
    },
    {
        source: "framework",
        name: "description",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Ekstra beskrivelse mellom label og felt når brukeren trenger mer kontekst før hen begynner å skrive.",
    },
    {
        source: "framework",
        name: "tooltip",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Lar labelen få en tilknyttet forklaring uten å gjøre hjelpeteksten permanent synlig.",
    },
    {
        source: "framework",
        name: "style",
        type: "CSSProperties",
        defaultValue: "ingen inline-stiler",
        description: "Brukes når wrapperen trenger inline-stiler i en avgrenset layout.",
    },
    {
        source: "framework",
        name: "render",
        type: "(props: InputProps) => JSX.Element",
        defaultValue: "ingen custom render",
        description: "Avansert escape hatch når InputGroup-familien må rendres via en egendefinert funksjon.",
    },
    {
        source: "native",
        name: "defaultValue",
        type: "string",
        defaultValue: "tom streng",
        description: "Setter startteksten i et ukontrollert felt når du vil vise et forhåndsutfylt eksempel.",
        interactiveControl: {
            kind: "select",
            name: "valueState",
            label: "Verdi",
            defaultValue: "empty",
            options: [
                { value: "empty", label: "Tom" },
                { value: "filled", label: "Utfylt" },
            ],
        },
    },
    {
        source: "native",
        name: "placeholder",
        type: "string",
        defaultValue: `" "`,
        description: "Brukes internt for å styre høydeoverganger og kan suppleres med et kort hint, men skal ikke erstatte labelen.",
    },
    {
        source: "aria",
        name: "aria-describedby",
        type: "string",
        defaultValue: "ingen",
        description: "Kobler hjelpetekst eller feilmelding til feltet.",
    },
    {
        source: "aria",
        name: "aria-invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Settes sammen med en konkret feilmelding når innholdet ikke er gyldig nok.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
];

const textAreaPropTableDefinitions = [
    {
        source: "design-system",
        description: "Jøkul-props som styrer hvordan tekstfeltet åpner, vokser og viser teller.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "Props som navngir feltet og kobler det til hjelp eller feilmeldinger i InputGroup-familien.",
    },
    {
        source: "native",
        description: "Native textarea-attributter som settes på det underliggende elementet.",
    },
    {
        source: "aria",
        description: "Tilgjengelighetsattributter som gjør støtte- og feilmeldinger lesbare for hjelpemidler.",
    },
] as const;

export const textAreaPropTables: DesignSystemPropTable[] = textAreaPropTableDefinitions
    .map((definition) => {
        const rows = textAreaPropDocs
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

export const textAreaInteractiveControls = textAreaPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl)
    .filter((control, index, controls) =>
        controls.findIndex((entry) => entry.name === control.name) === index
    );
