import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

interface SkeletonLoaderPropDoc {
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl: DesignSystemInteractiveExampleControl;
}

const skeletonLoaderPropDocs: SkeletonLoaderPropDoc[] = [
    {
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
];

export const skeletonLoaderPropTables: DesignSystemPropTable[] = [
    {
        source: "design-system",
        description: "Skeleton loader dokumenteres her som markupkontrakt fra monopakka `@fremtind/jokul`.",
        rows: skeletonLoaderPropDocs.map((prop) => ({
            name: prop.name,
            type: prop.type,
            defaultValue: prop.defaultValue,
            description: prop.description,
            interactiveControlName: prop.interactiveControl.name,
        })),
    },
];

export const skeletonLoaderInteractiveControls = skeletonLoaderPropDocs.map((prop) =>
    prop.interactiveControl);
