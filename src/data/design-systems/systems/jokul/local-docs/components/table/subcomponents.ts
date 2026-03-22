import type {
    DesignSystemComponentSubcomponentDoc,
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

interface TableSubcomponentPropDoc {
    subcomponent: string;
    category: "framework" | "native";
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: TableSubcomponentPropDoc,
): prop is TableSubcomponentPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(prop: TableSubcomponentPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const tableSubcomponentPropDocs: TableSubcomponentPropDoc[] = [
    {
        subcomponent: "table-caption",
        category: "framework",
        name: "srOnly",
        type: "boolean",
        defaultValue: "false",
        description: "Skjuler caption visuelt når tabellen allerede er tydelig navngitt av omgivelsene.",
        interactiveControl: {
            kind: "boolean",
            name: "captionSrOnly",
            label: "Caption skjult",
            defaultValue: false,
        },
    },
    {
        subcomponent: "table-caption",
        category: "framework",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Caption-innholdet som navngir datasettet for både synlige brukere og skjermlesere.",
    },
    {
        subcomponent: "table-head",
        category: "framework",
        name: "srOnly",
        type: "boolean",
        defaultValue: "false",
        description: "Skjuler headerseksjonen visuelt når konteksten allerede gjør kolonneetikettene tydelige, men beholder dem for hjelpemidler.",
    },
    {
        subcomponent: "table-head",
        category: "framework",
        name: "sticky",
        type: "boolean",
        defaultValue: "false",
        description: "Holder header-raden synlig når brukeren blar i lange tabeller.",
    },
    {
        subcomponent: "table-header",
        category: "framework",
        name: "bold",
        type: "boolean",
        defaultValue: "false",
        description: "Brukes når headeren trenger ekstra vekt, for eksempel i mer kompakte eller tette tabelloppsett.",
    },
    {
        subcomponent: "table-header",
        category: "framework",
        name: "align",
        type: `"left" | "center" | "right"`,
        defaultValue: `"left"`,
        description: "Justerer headerinnholdet. Bruk samme verdi som i tilhørende `TableCell` for tallkolonner.",
        interactiveControl: {
            kind: "select",
            name: "amountAlign",
            label: "Beløp-justering",
            defaultValue: "right",
            options: [
                { value: "left", label: "left" },
                { value: "right", label: "right" },
            ],
        },
    },
    {
        subcomponent: "table-header",
        category: "native",
        name: "srOnly",
        type: "boolean",
        defaultValue: "false",
        description: "Skjuler headerinnholdet visuelt, men beholder det for skjermlesere når kolonneetiketten ellers vises i omgivelsene.",
    },
    {
        subcomponent: "table-header",
        category: "native",
        name: "scope",
        type: `"col" | "row"`,
        defaultValue: `"col"`,
        description: "Headerceller bør sette `scope` korrekt slik at sammenhengen mellom header og celle blir tydelig.",
    },
    {
        subcomponent: "table-header",
        category: "native",
        name: "sortable",
        type: "TableSortProps",
        defaultValue: "ingen sortering",
        description: "Aktiverer sorteringskontrakten når headeren også skal styre rekkefølgen i datasettet.",
    },
    {
        subcomponent: "table-cell",
        category: "framework",
        name: "align",
        type: `"left" | "center" | "right"`,
        defaultValue: `"left"`,
        description: "Justerer celleinnholdet. Beløp og andre tallkolonner bør vanligvis høyrejusteres.",
        interactiveControl: {
            kind: "select",
            name: "amountAlign",
            label: "Beløp-justering",
            defaultValue: "right",
            options: [
                { value: "left", label: "left" },
                { value: "right", label: "right" },
            ],
        },
    },
    {
        subcomponent: "table-cell",
        category: "framework",
        name: "verticalAlign",
        type: `"center" | "top"`,
        defaultValue: `"top"`,
        description: "Lar celleinnholdet topp- eller midtstilles avhengig av om raden hovedsakelig består av tekst eller kontroller.",
    },
    {
        subcomponent: "table-cell",
        category: "native",
        name: "data-th",
        type: "string",
        defaultValue: "påkrevd når `collapseToList` er aktiv",
        description: "Mobil listevisning trenger `data-th` på hver celle for å vise hvilken kolonne verdien tilhører.",
    },
];

function createSubcomponentPropTables(
    subcomponentSlug: string,
    definitions: Array<
        | {
            source: "framework";
            frameworkName: string;
            description: string;
        }
        | {
            source: "native";
            description: string;
        }
    >,
): DesignSystemPropTable[] {
    return definitions.map((definition) => {
        const rows = tableSubcomponentPropDocs
            .filter((prop) =>
                prop.subcomponent === subcomponentSlug &&
                prop.category === definition.source)
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
    }).filter((table) => table.rows.length > 0);
}

export const tableSubcomponents: DesignSystemComponentSubcomponentDoc[] = [
    {
        slug: "table-caption",
        title: "TableCaption",
        sourceName: "TableCaption",
        selector: "caption, .jkl-table-caption",
        description: "Navngir tabellen og kan skjules visuelt uten å miste den semantiske captionen.",
        relatedPartNames: ["Caption"],
        relatedRecipeSlugs: ["standard", "collapse-to-list", "sticky-head"],
        propTables: createSubcomponentPropTables("table-caption", [
            {
                source: "framework",
                frameworkName: "React",
                description: "Props på `TableCaption` som styrer synlighet og innhold.",
            },
        ]),
    },
    {
        slug: "table-head",
        title: "TableHead",
        sourceName: "TableHead",
        selector: "thead, .jkl-table-head",
        description: "Omslutter header-raden og styrer om headeren skal være sticky i scrollede tabeller.",
        relatedPartNames: ["Head section"],
        relatedRecipeSlugs: ["sticky-head"],
        propTables: createSubcomponentPropTables("table-head", [
            {
                source: "framework",
                frameworkName: "React",
                description: "Props på `TableHead` som styrer headeroppførsel.",
            },
        ]),
    },
    {
        slug: "table-header",
        title: "TableHeader",
        sourceName: "TableHeader",
        selector: "th, .jkl-table-header",
        description: "Representerer hver headercelle og eier både semantikk og justering for kolonnene.",
        relatedPartNames: ["Header cell"],
        relatedRecipeSlugs: ["standard", "collapse-to-list", "sticky-head"],
        propTables: createSubcomponentPropTables("table-header", [
            {
                source: "framework",
                frameworkName: "React",
                description: "Props på `TableHeader` som påvirker presentasjonen av kolonneheaderen.",
            },
            {
                source: "native",
                description: "Native `th`-attributter som gjør headeren forståelig for hjelpemidler.",
            },
        ]),
    },
    {
        slug: "table-cell",
        title: "TableCell",
        sourceName: "TableCell",
        selector: "td, .jkl-table-cell",
        description: "Vanlige dataceller som må kunne speile både justering og mobil etikettering fra kolonnene.",
        relatedPartNames: ["Data cell"],
        relatedRecipeSlugs: ["standard", "collapse-to-list", "sticky-head"],
        propTables: createSubcomponentPropTables("table-cell", [
            {
                source: "framework",
                frameworkName: "React",
                description: "Props på `TableCell` som påvirker layout og lesbarhet i kolonnene.",
            },
            {
                source: "native",
                description: "Native `td`-attributter og datasettkontrakter som trengs for responsiv listevisning.",
            },
        ]),
    },
];

export const tableSubcomponentInteractiveControls = tableSubcomponentPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl);
