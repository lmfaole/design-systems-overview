import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type LoaderPropSource = "design-system" | "framework" | "native" | "aria";

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
        name: "variant",
        type: `"large" | "medium" | "small"`,
        defaultValue: `"large"`,
        description: "Styrer loaderens størrelse gjennom Jøkul sin variantkontrakt.",
        interactiveControl: {
            kind: "select",
            name: "variant",
            label: "Variant",
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
        name: "textDescription",
        type: "string",
        defaultValue: "påkrevd",
        description: "Tekstlig status som skjermlesere kan annonsere mens loaderen vises.",
        interactiveControl: {
            kind: "select",
            name: "textDescription",
            label: "Status",
            defaultValue: "Laster inn oversikten",
            options: [
                { value: "Laster inn oversikten", label: "Laster inn oversikten" },
                { value: "Sender inn skjemaet", label: "Sender inn skjemaet" },
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
        source: "design-system",
        name: "delay",
        type: "number",
        defaultValue: "0",
        description: "Venter et gitt antall millisekunder før loaderen rendres, slik at korte operasjoner slipper unødvendig flimring.",
        interactiveControl: {
            kind: "select",
            name: "delay",
            label: "Delay",
            defaultValue: "0",
            options: [
                { value: "0", label: "0 ms" },
                { value: "250", label: "250 ms" },
                { value: "600", label: "600 ms" },
            ],
        },
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på wrapperen når loaderen må kobles til lokal layout eller sporing.",
    },
    {
        source: "framework",
        name: "dataTestAutoId",
        type: "string",
        defaultValue: "ingen",
        description: "Test-id for Jøkul sin React-komponent når du trenger en stabil hook i automatiserte tester.",
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
        description: "Offentlige Loader-props som styrer variant, statusmelding, plassering og forsinket visning.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "React-spesifikke props rundt wrapper, testkroker og lokal integrasjon.",
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
    .map((definition) => {
        const rows = loaderPropDocs
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

export const loaderInteractiveControls = loaderPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl);
