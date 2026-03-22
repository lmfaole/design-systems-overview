import type {
    DesignSystemComponentSubcomponentDoc,
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type DescriptionListPropSource = "design-system" | "framework";

interface DescriptionListRootPropDoc {
    source: DescriptionListPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

interface DescriptionListSubcomponentPropDoc extends DescriptionListRootPropDoc {
    subcomponent: "description-term" | "description-detail";
}

function hasInteractiveControl(
    prop: DescriptionListRootPropDoc | DescriptionListSubcomponentPropDoc,
): prop is (DescriptionListRootPropDoc | DescriptionListSubcomponentPropDoc) & {
    interactiveControl: DesignSystemInteractiveExampleControl;
} {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(
    prop: DescriptionListRootPropDoc | DescriptionListSubcomponentPropDoc,
): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const descriptionListRootPropDocs: DescriptionListRootPropDoc[] = [
    {
        source: "design-system",
        name: "alignment",
        type: `"horizontal" | "vertical" | "justified"`,
        defaultValue: `"horizontal"`,
        description: "Velger hvordan term og detalj skal stå i forhold til hverandre når listen får nok plass.",
        interactiveControl: {
            kind: "select",
            name: "alignment",
            label: "Alignment",
            defaultValue: "horizontal",
            options: [
                { value: "horizontal", label: "horizontal" },
                { value: "vertical", label: "vertical" },
                { value: "justified", label: "justified" },
            ],
        },
    },
    {
        source: "design-system",
        name: "separators",
        type: "boolean",
        defaultValue: "false",
        description: "Legger inn visuelle skiller mellom radene i listen.",
        interactiveControl: {
            kind: "boolean",
            name: "separators",
            label: "Separatorer",
            defaultValue: false,
        },
    },
    {
        source: "framework",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Bygg opp listen med alternerende `DescriptionTerm` og `DescriptionDetail`.",
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på `<dl>`-elementet når listen må kobles til lokal layout.",
    },
];

const descriptionListSubcomponentPropDocs: DescriptionListSubcomponentPropDoc[] = [
    {
        subcomponent: "description-term",
        source: "framework",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Selve nøkkel- eller feltnavnet som beskriver hva detaljen på raden gjelder.",
    },
    {
        subcomponent: "description-term",
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på termen når lokal layout trenger en avgrenset justering.",
    },
    {
        subcomponent: "description-detail",
        source: "framework",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Verdien, statusen eller detaljteksten som hører til termen på raden.",
    },
    {
        subcomponent: "description-detail",
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på detaljeelementet når en spesifikk rad trenger lokal justering.",
    },
];

const descriptionListPropTableDefinitions = [
    {
        source: "design-system",
        description: "Props som styrer oppsettet og leserytmen i selve beskrivelseslisten.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "React-props som styrer komposisjon og lokal layout for listen.",
    },
] as const;

export const descriptionListPropTables: DesignSystemPropTable[] = descriptionListPropTableDefinitions
    .map((definition) => {
        const rows = descriptionListRootPropDocs
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

function createDescriptionListSubcomponentPropTables(
    subcomponentSlug: DescriptionListSubcomponentPropDoc["subcomponent"],
): DesignSystemPropTable[] {
    return descriptionListPropTableDefinitions
        .map((definition) => {
            const rows = descriptionListSubcomponentPropDocs
                .filter((prop) =>
                    prop.subcomponent === subcomponentSlug &&
                    prop.source === definition.source)
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
}

export const descriptionListSubcomponents: DesignSystemComponentSubcomponentDoc[] = [
    {
        slug: "description-term",
        title: "DescriptionTerm",
        sourceName: "DescriptionTerm",
        selector: "dt.jkl-description-list__term",
        description: "Term-komponenten navngir hvert felt eller hver egenskap i listen.",
        propTables: createDescriptionListSubcomponentPropTables("description-term"),
    },
    {
        slug: "description-detail",
        title: "DescriptionDetail",
        sourceName: "DescriptionDetail",
        selector: "dd.jkl-description-list__detail",
        description: "Detail-komponenten viser selve verdien eller forklaringen som hører til termen.",
        propTables: createDescriptionListSubcomponentPropTables("description-detail"),
    },
];

export const descriptionListInteractiveControls = descriptionListRootPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl);
