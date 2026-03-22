import type {
    DesignSystemComponentSubcomponentDoc,
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type SummaryTablePropSource = "design-system" | "framework";

interface SummaryTableRootPropDoc {
    source: SummaryTablePropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

interface SummaryTableSubcomponentPropDoc extends SummaryTableRootPropDoc {
    subcomponent: "summary-table-row";
}

function hasInteractiveControl(
    prop: SummaryTableRootPropDoc | SummaryTableSubcomponentPropDoc,
): prop is (SummaryTableRootPropDoc | SummaryTableSubcomponentPropDoc) & {
    interactiveControl: DesignSystemInteractiveExampleControl;
} {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(
    prop: SummaryTableRootPropDoc | SummaryTableSubcomponentPropDoc,
): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const summaryTableRootPropDocs: SummaryTableRootPropDoc[] = [
    {
        source: "framework",
        name: "body",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Rendrer kroppsradene, vanligvis satt sammen av flere `SummaryTableRow`-elementer.",
    },
    {
        source: "design-system",
        name: "caption",
        type: "string",
        defaultValue: "ingen",
        description: "Skjult caption som navngir oppsummeringen for hjelpemidler.",
        interactiveControl: {
            kind: "boolean",
            name: "caption",
            label: "Caption",
            defaultValue: true,
        },
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på tabellen når den må kobles til lokal layout eller sporing.",
    },
    {
        source: "design-system",
        name: "footer",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Valgfri footer med totaler eller annen oppsummerende rad nederst.",
        interactiveControl: {
            kind: "boolean",
            name: "footer",
            label: "Footer",
            defaultValue: true,
        },
    },
    {
        source: "framework",
        name: "header",
        type: "[string, string]",
        defaultValue: "påkrevd",
        description: "To kolonneetiketter som brukes i den skjulte headeren for tabellsemantikken.",
    },
];

const summaryTableSubcomponentPropDocs: SummaryTableSubcomponentPropDoc[] = [
    {
        subcomponent: "summary-table-row",
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på raden når oppsummeringen trenger en lokal variant eller markering.",
    },
    {
        subcomponent: "summary-table-row",
        source: "framework",
        name: "content",
        type: "string | ReactNode",
        defaultValue: "påkrevd",
        description: "Verdien eller innholdet i høyre kolonne på raden.",
    },
    {
        subcomponent: "summary-table-row",
        source: "framework",
        name: "header",
        type: "string | ReactNode",
        defaultValue: "påkrevd",
        description: "Radetiketten som beskriver hva verdien på raden gjelder.",
    },
];

export const summaryTablePropTables: DesignSystemPropTable[] = [
    {
        source: "design-system",
        description: "Komponentens egne oppsummeringsvalg for caption og footer.",
        rows: summaryTableRootPropDocs
            .filter((prop) => prop.source === "design-system")
            .map((prop) => ({
                name: prop.name,
                type: prop.type,
                defaultValue: prop.defaultValue,
                description: prop.description,
                interactiveControlName: getInteractiveControlName(prop),
            })),
    } satisfies DesignSystemPropTable,
    {
        source: "framework",
        frameworkName: "React",
        description: "Props på `SummaryTable` som bygger opp oppsummeringens struktur og semantiske navn.",
        rows: summaryTableRootPropDocs
            .filter((prop) => prop.source === "framework")
            .map((prop) => ({
            name: prop.name,
            type: prop.type,
            defaultValue: prop.defaultValue,
            description: prop.description,
            interactiveControlName: getInteractiveControlName(prop),
        })),
    } satisfies DesignSystemPropTable,
].filter((table) => table.rows.length > 0);

export const summaryTableSubcomponents: DesignSystemComponentSubcomponentDoc[] = [
    {
        slug: "summary-table-row",
        title: "SummaryTableRow",
        sourceName: "SummaryTableRow",
        selector: "tr",
        description: "Enkel radkomponent som binder sammen etikett og verdi i oppsummeringen.",
        propTables: [
            {
                source: "framework",
                frameworkName: "React",
                description: "Props på `SummaryTableRow` for etikett, verdi og eventuell lokal styling.",
                rows: summaryTableSubcomponentPropDocs.map((prop) => ({
                    name: prop.name,
                    type: prop.type,
                    defaultValue: prop.defaultValue,
                    description: prop.description,
                    interactiveControlName: getInteractiveControlName(prop),
                })),
            },
        ],
    },
];

export const summaryTableInteractiveControls = summaryTableRootPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl);
