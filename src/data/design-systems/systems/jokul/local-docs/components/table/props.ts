import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";
import { tableSubcomponentInteractiveControls } from "./subcomponents";

interface TableRootPropDoc {
    category: "design-system" | "framework";
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: TableRootPropDoc,
): prop is TableRootPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(prop: TableRootPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const tableRootPropDocs: TableRootPropDoc[] = [
    {
        category: "design-system",
        name: "layoutDensity",
        type: `"comfortable" | "compact"`,
        defaultValue: `"comfortable"`,
        description: "Tettheten arves fra layoutkonteksten og påvirker padding i både headers og celler.",
        interactiveControl: {
            kind: "select",
            name: "density",
            label: "Density",
            defaultValue: "comfortable",
            options: [
                { value: "comfortable", label: "comfortable" },
                { value: "compact", label: "compact" },
            ],
        },
    },
    {
        category: "framework",
        name: "Table.fullWidth",
        type: "boolean",
        defaultValue: "false",
        description: "Setter `jkl-table--full-width` slik at tabellen fyller hele den tilgjengelige bredden.",
        interactiveControl: {
            kind: "boolean",
            name: "fullWidth",
            label: "Full width",
            defaultValue: false,
        },
    },
    {
        category: "framework",
        name: "Table.collapseToList",
        type: "boolean",
        defaultValue: "false",
        description: "Bryter ned tabellen til listevisning på små skjermer. Da må hver celle ha `data-th`.",
        interactiveControl: {
            kind: "boolean",
            name: "collapseToList",
            label: "Collapse to list",
            defaultValue: false,
        },
    },
];

const tableRootPropTableDefinitions = [
    {
        source: "design-system",
        description: "Tverrgående Jøkul-kontekst som påvirker tabellens rytme og tetthet.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "Props på `Table` som styrer overordnet bredde og responsiv nedbrytning.",
    },
] as const;

export const tablePropTables: DesignSystemPropTable[] = tableRootPropTableDefinitions
    .map((definition) => {
        const rows = tableRootPropDocs
            .filter((prop) => prop.category === definition.source)
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

export const tableInteractiveControls = [
    ...tableRootPropDocs
        .filter(hasInteractiveControl)
        .map((prop) => prop.interactiveControl),
    ...tableSubcomponentInteractiveControls,
].filter((control, index, controls) =>
    controls.findIndex((entry) => entry.name === control.name) === index);
