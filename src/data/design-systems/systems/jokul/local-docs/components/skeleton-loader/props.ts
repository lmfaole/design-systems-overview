import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type SkeletonLoaderPropSource = "design-system" | "framework" | "native";

interface SkeletonLoaderPropDoc {
    source: SkeletonLoaderPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: SkeletonLoaderPropDoc,
): prop is SkeletonLoaderPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

const skeletonLoaderPropDocs: SkeletonLoaderPropDoc[] = [
    {
        source: "design-system",
        name: "pattern",
        type: `"element" | "input" | "table"`,
        defaultValue: `"element"`,
        description: "Velger hvilken ferdig skeleton-struktur du vil bruke i markupen.",
        interactiveControl: {
            kind: "select",
            name: "pattern",
            label: "Pattern",
            defaultValue: "element",
            options: [
                { value: "element", label: "Element" },
                { value: "input", label: "Input" },
                { value: "table", label: "Table" },
            ],
        },
    },
    {
        source: "design-system",
        name: "compact",
        type: "boolean",
        defaultValue: "false",
        description: "Legg til compact-modifieren når skeletonen må samsvare med en kompakt layout eller tabell.",
        interactiveControl: {
            kind: "boolean",
            name: "compact",
            label: "Compact",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "shape",
        type: `"rectangle" | "circle"`,
        defaultValue: `"rectangle"`,
        description: "Styrer form på `jkl-skeleton-element` når du bruker den enkleste element-varianten.",
        interactiveControl: {
            kind: "select",
            name: "shape",
            label: "Shape",
            defaultValue: "rectangle",
            options: [
                { value: "rectangle", label: "Rectangle" },
                { value: "circle", label: "Circle" },
            ],
        },
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på skeleton-wrapperen eller den aktuelle primitive varianten når du må koble den til lokal layout eller sporing.",
    },
    {
        source: "framework",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd for animasjons- og tabellvarianter",
        description: "Innholdet som pakkes inn i `SkeletonAnimation`, `SkeletonTableHeader` og `SkeletonTableRow` for å bygge den endelige plassholderstrukturen.",
    },
    {
        source: "framework",
        name: "textDescription",
        type: "string",
        defaultValue: "\"Vennligst vent\"",
        description: "Skjult statusbeskrivelse for `SkeletonAnimation` når ventetilstanden må forklares tekstlig for skjermlesere.",
    },
    {
        source: "framework",
        name: "delay",
        type: "number",
        defaultValue: "0",
        description: "Forsinker rendringen av skeletonen når du vil unngå flimring ved svært korte ventetider.",
    },
    {
        source: "framework",
        name: "style",
        type: "CSSProperties",
        defaultValue: "ingen inline-stiler",
        description: "Brukes når den enkelte primitive skeleton-varianten trenger eksplisitt bredde eller høyde via inline-stiler.",
    },
    {
        source: "framework",
        name: "width",
        type: "number | string",
        defaultValue: "påkrevd for element- og tabellvarianter",
        description: "Styrer bredden på `SkeletonElement`, `SkeletonButton` og `SkeletonTable` når plassholderen må speile det endelige innholdet.",
    },
    {
        source: "framework",
        name: "height",
        type: "number | string",
        defaultValue: "påkrevd for `SkeletonElement`",
        description: "Styrer høyden på `SkeletonElement` når du vil etterligne en konkret blokk eller avatar.",
    },
    {
        source: "framework",
        name: "labelProps",
        type: "SkeletonLabelProps",
        defaultValue: "ingen",
        description: "Lar sammensatte skeleton-varianter styre label-plassholderen separat fra inputdelen.",
    },
    {
        source: "framework",
        name: "inputProps",
        type: "SkeletonElementProps",
        defaultValue: "ingen",
        description: "Tilpasser formen og størrelsen på inputdelen i skjelettvarianter for feltgrupper.",
    },
    {
        source: "framework",
        name: "checkboxes",
        type: "number",
        defaultValue: "påkrevd for `SkeletonCheckboxGroup`",
        description: "Antall checkbox-rader som skal vises i en skjelettgruppe.",
    },
    {
        source: "framework",
        name: "radioButtons",
        type: "number",
        defaultValue: "påkrevd for `SkeletonRadioButtonGroup`",
        description: "Antall radio button-rader som skal vises i en skjelettgruppe.",
    },
    {
        source: "native",
        name: "role",
        type: "AriaRole",
        defaultValue: "ingen",
        description: "Kan brukes på `SkeletonAnimation` når ventetilstanden skal bo i en eksplisitt live region.",
    },
];

const skeletonLoaderPropTableDefinitions = [
    {
        source: "design-system",
        description: "Playground-kontroller og sentrale primitive props som styrer struktur og form i den lokale skjelettvisningen.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "Eksplisitte props på de eksporterte skeleton-primitivene i `@fremtind/jokul/loader`.",
    },
    {
        source: "native",
        description: "Tilgjengelighets- og rolleattributter som kan knyttes til animasjonswrapperen.",
    },
] as const;

export const skeletonLoaderPropTables: DesignSystemPropTable[] = skeletonLoaderPropTableDefinitions
    .map((definition) => {
        const rows = skeletonLoaderPropDocs
            .filter((prop) => prop.source === definition.source)
            .map((prop) => ({
                name: prop.name,
                type: prop.type,
                defaultValue: prop.defaultValue,
                description: prop.description,
                interactiveControlName: hasInteractiveControl(prop)
                    ? prop.interactiveControl.name
                    : undefined,
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

export const skeletonLoaderInteractiveControls = skeletonLoaderPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl);
