import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type TagPropSource = "design-system" | "framework" | "native" | "aria";

interface TagPropDoc {
    source: TagPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: TagPropDoc,
): prop is TagPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(prop: TagPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const tagPropDocs: TagPropDoc[] = [
    {
        source: "design-system",
        name: "variant",
        type: `"neutral" | "info" | "warning" | "error" | "success"`,
        defaultValue: `"neutral"`,
        description: "Bestemmer hvilken status- eller tonalitetsvariant taggen bruker.",
        interactiveControl: {
            kind: "select",
            name: "variant",
            label: "Variant",
            defaultValue: "neutral",
            options: [
                { value: "neutral", label: "Neutral" },
                { value: "info", label: "Info" },
                { value: "warning", label: "Warning" },
                { value: "error", label: "Error" },
                { value: "success", label: "Success" },
            ],
        },
    },
    {
        source: "framework",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Teksten som forklarer hva taggen betyr.",
        interactiveControl: {
            kind: "select",
            name: "text",
            label: "Tekst",
            defaultValue: "draft",
            options: [
                { value: "draft", label: "Utkast" },
                { value: "needs-follow-up", label: "Trenger oppfølging" },
                { value: "published", label: "Publisert" },
            ],
        },
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse hvis taggen må kobles til lokal layout eller analyse.",
    },
    {
        source: "native",
        name: "title",
        type: "string",
        defaultValue: "ingen",
        description: "Kan brukes når du vil gi ekstra forklaring ved hover uten å endre den synlige tagteksten.",
    },
    {
        source: "aria",
        name: "aria-label",
        type: "string",
        defaultValue: "ingen",
        description: "Brukes når taggen inngår i en mer sammensatt kontroll og trenger et mer presist tilgjengelig navn.",
    },
];

const tagPropTableDefinitions = [
    {
        source: "design-system",
        description: "Jøkul-props som styrer hvilken variant og dermed hvilken tonalitet taggen får.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "React-props som styrer innhold og lokal integrasjon rundt taggen.",
    },
    {
        source: "native",
        description: "Vanlige HTML-attributter som kan brukes på den underliggende `<span>`-taggen.",
    },
    {
        source: "aria",
        description: "Tilgjengelighetsattributter for sammensatte brukstilfeller der taggen inngår i en større kontroll.",
    },
] as const;

export const tagPropTables: DesignSystemPropTable[] = tagPropTableDefinitions
    .map((definition) => {
        const rows = tagPropDocs
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

export const tagInteractiveControls = tagPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl)
    .filter((control, index, controls) =>
        controls.findIndex((entry) => entry.name === control.name) === index
    );
