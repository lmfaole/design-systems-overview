import type {
    DesignSystemComponentSubcomponentDoc,
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type CardPropSource = "design-system" | "framework";

interface CardRootPropDoc {
    source: CardPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

interface CardSubcomponentPropDoc extends CardRootPropDoc {
    subcomponent: "card-image";
}

function hasInteractiveControl(
    prop: CardRootPropDoc | CardSubcomponentPropDoc,
): prop is (CardRootPropDoc | CardSubcomponentPropDoc) & {
    interactiveControl: DesignSystemInteractiveExampleControl;
} {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(
    prop: CardRootPropDoc | CardSubcomponentPropDoc,
): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const cardRootPropDocs: CardRootPropDoc[] = [
    {
        source: "framework",
        name: "as",
        type: "React.ElementType",
        defaultValue: `"div"`,
        description: "Lar kortet rendres som et annet element, for eksempel `a`, når hele kortet er en navigasjonsflate.",
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på rotelementet når kortet må kobles til lokal layout eller sporing.",
    },
    {
        source: "design-system",
        name: "clickable",
        type: "boolean",
        defaultValue: "false",
        description: "Gir kortet klikkbar affordance. Du må fortsatt rendre et faktisk interaktivt element selv.",
        interactiveControl: {
            kind: "boolean",
            name: "clickable",
            label: "Clickable",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "padding",
        type: `"s" | "m" | "l" | "xl"`,
        defaultValue: `"s"`,
        description: "Styrer luft rundt innholdet og matcher Jøkul sin Figma-kontrakt for kortpadding.",
        interactiveControl: {
            kind: "select",
            name: "padding",
            label: "Padding",
            defaultValue: "m",
            options: [
                { value: "s", label: "s" },
                { value: "m", label: "m" },
                { value: "l", label: "l" },
                { value: "xl", label: "xl" },
            ],
        },
    },
    {
        source: "design-system",
        name: "variant",
        type: `"outlined" | "high" | "low"`,
        defaultValue: `"high"`,
        description: "Velg bakgrunns- eller outline-variant ut fra hvor mye separasjon kortet trenger fra omgivelsene.",
        interactiveControl: {
            kind: "select",
            name: "variant",
            label: "Variant",
            defaultValue: "high",
            options: [
                { value: "high", label: "high" },
                { value: "low", label: "low" },
                { value: "outlined", label: "outlined" },
            ],
        },
    },
];

const cardSubcomponentPropDocs: CardSubcomponentPropDoc[] = [
    {
        subcomponent: "card-image",
        source: "framework",
        name: "as",
        type: "React.ElementType",
        defaultValue: `"img"`,
        description: "Lar `CardImage` rendres som et annet bildeelement når prosjektet bruker en wrapper for responsive bilder.",
    },
    {
        subcomponent: "card-image",
        source: "design-system",
        name: "placement",
        type: `"top" | "middle" | "bottom" | "full"`,
        defaultValue: `"top"`,
        description: "Justerer negativ margin slik at bildet blør riktig mot kortets kanter ut fra plasseringen i kortet.",
        interactiveControl: {
            kind: "select",
            name: "imagePlacement",
            label: "Bilde",
            defaultValue: "top",
            options: [
                { value: "top", label: "top" },
                { value: "middle", label: "middle" },
                { value: "bottom", label: "bottom" },
                { value: "full", label: "full" },
            ],
        },
    },
];

const cardRootPropTableDefinitions = [
    {
        source: "design-system",
        description: "Kortets egne props som styrer uttrykk, luft og interaktiv affordance.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "Rotelement-props når Card må rendres som et annet element eller kobles til lokal layout.",
    },
] as const;

export const cardPropTables: DesignSystemPropTable[] = cardRootPropTableDefinitions
    .map((definition) => {
        const rows = cardRootPropDocs
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

function createCardSubcomponentPropTables(
    subcomponentSlug: CardSubcomponentPropDoc["subcomponent"],
): DesignSystemPropTable[] {
    return cardRootPropTableDefinitions
        .map((definition) => {
            const rows = cardSubcomponentPropDocs
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

export const cardSubcomponents: DesignSystemComponentSubcomponentDoc[] = [
    {
        slug: "card-image",
        title: "CardImage",
        sourceName: "CardImage",
        selector: "img.jkl-card-image",
        description: "Bilde-wrapperen sørger for at bilder kan blø ut i kortkanten uten at du må regne ut padding og negativ margin selv.",
        propTables: createCardSubcomponentPropTables("card-image"),
    },
];

export const cardInteractiveControls = [
    ...cardRootPropDocs.filter(hasInteractiveControl).map((prop) => prop.interactiveControl),
    ...cardSubcomponentPropDocs
        .filter(hasInteractiveControl)
        .map((prop) => prop.interactiveControl),
]
    .filter((control): control is DesignSystemInteractiveExampleControl => Boolean(control))
    .filter((control, index, controls) =>
    controls.findIndex((entry) => entry.name === control.name) === index
    );
