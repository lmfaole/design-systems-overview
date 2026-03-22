import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type LoaderPropSource = "design-system" | "native" | "aria";

interface LoaderPropDoc {
    source: LoaderPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: LoaderPropDoc,
): prop is LoaderPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(prop: LoaderPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const loaderPropDocs: LoaderPropDoc[] = [
    {
        source: "design-system",
        name: "size",
        type: `"large" | "medium" | "small"`,
        defaultValue: `"large"`,
        description: "Styrer loaderens størrelse gjennom Jøkul sine modifier-klasser.",
        interactiveControl: {
            kind: "select",
            name: "size",
            label: "Størrelse",
            defaultValue: "large",
            options: [
                { value: "large", label: "Large" },
                { value: "medium", label: "Medium" },
                { value: "small", label: "Small" },
            ],
        },
    },
    {
        source: "design-system",
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Legg til `jkl-loader--inline` når loaderen skal flyte med tekst eller andre inline-elementer.",
        interactiveControl: {
            kind: "boolean",
            name: "inline",
            label: "Inline",
            defaultValue: false,
        },
    },
    {
        source: "native",
        name: "role",
        type: `"status" | utelatt`,
        defaultValue: `"status"`,
        description: "Bruk `role=\"status\"` når loaderen skal annonsere oppdateringer i en live region.",
        interactiveControl: {
            kind: "select",
            name: "role",
            label: "Role",
            defaultValue: "status",
            options: [
                { value: "status", label: "status" },
                { value: "none", label: "Utelat" },
            ],
        },
    },
    {
        source: "aria",
        name: "aria-live",
        type: `"polite" | "assertive" | "off"`,
        defaultValue: `"polite"`,
        description: "Angir hvor påtrengende statusoppdateringen skal annonseres når loaderen brukes i en live region.",
        interactiveControl: {
            kind: "select",
            name: "ariaLive",
            label: "Aria-live",
            defaultValue: "polite",
            options: [
                { value: "polite", label: "polite" },
                { value: "assertive", label: "assertive" },
                { value: "off", label: "off" },
            ],
        },
    },
    {
        source: "aria",
        name: "aria-hidden",
        type: `"true"`,
        defaultValue: `"true"`,
        description: "Skjul selve animasjonen fra skjermlesere og la den tekstlige statusen formidle hva som skjer.",
    },
];

const loaderPropTableDefinitions = [
    {
        source: "design-system",
        description: "Markup-baserte valg i Jøkul sin loaderkontrakt. Disse styrer klassemodifikatorer og plassering.",
    },
    {
        source: "native",
        description: "Native HTML-attributter som brukes rundt loaderen når den skal annonsere status.",
    },
    {
        source: "aria",
        description: "Tilgjengelighetsattributter som gjør loaderen begripelig for skjermlesere.",
    },
] as const;

export const loaderPropTables: DesignSystemPropTable[] = loaderPropTableDefinitions
    .map<DesignSystemPropTable>((definition) => ({
        source: definition.source,
        description: definition.description,
        rows: loaderPropDocs
            .filter((prop) => prop.source === definition.source)
            .map((prop) => ({
                name: prop.name,
                type: prop.type,
                defaultValue: prop.defaultValue,
                description: prop.description,
                interactiveControlName: getInteractiveControlName(prop),
            })),
    }))
    .filter((table) => table.rows.length > 0);

export const loaderInteractiveControls = loaderPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl);
