import type {
    DesignSystemComponentSubcomponentDoc,
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type MessagePropSource = "design-system" | "framework" | "native";

interface MessageRootPropDoc {
    source: MessagePropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

interface MessageSubcomponentPropDoc extends MessageRootPropDoc {
    subcomponent: "form-error-message";
}

function hasInteractiveControl(
    prop: MessageRootPropDoc | MessageSubcomponentPropDoc,
): prop is (MessageRootPropDoc | MessageSubcomponentPropDoc) & {
    interactiveControl: DesignSystemInteractiveExampleControl;
} {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(
    prop: MessageRootPropDoc | MessageSubcomponentPropDoc,
): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const messageRootPropDocs: MessageRootPropDoc[] = [
    {
        source: "design-system",
        name: "dismissAction",
        type: "{ handleDismiss: () => void; buttonTitle?: string; }",
        defaultValue: "ingen",
        description: "Legger til en avvis-knapp og callback når meldingen kan lukkes av brukeren.",
        interactiveControl: {
            kind: "boolean",
            name: "dismissible",
            label: "Avvisbar",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "dismissed",
        type: "boolean",
        defaultValue: "false",
        description: "Setter meldingen i avvist tilstand etter at den er lukket.",
        interactiveControl: {
            kind: "boolean",
            name: "dismissed",
            label: "Dismissed",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "fullWidth",
        type: "boolean",
        defaultValue: "false",
        description: "Lar meldingen fylle hele tilgjengelig bredde i stedet for å stoppe ved standard maksvidde.",
        interactiveControl: {
            kind: "boolean",
            name: "fullWidth",
            label: "Full bredde",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "variant",
        type: `"info" | "error" | "success" | "warning"`,
        defaultValue: `"info"`,
        description: "Velger statusvariant og tilhørende ikon/fargefamilie for meldingen.",
        interactiveControl: {
            kind: "select",
            name: "variant",
            label: "Variant",
            defaultValue: "info",
            options: [
                { value: "info", label: "info" },
                { value: "warning", label: "warning" },
                { value: "error", label: "error" },
                { value: "success", label: "success" },
            ],
        },
    },
];

const messageSubcomponentPropDocs: MessageSubcomponentPropDoc[] = [
    {
        subcomponent: "form-error-message",
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på wrapperen rundt valideringsoppsummeringen.",
    },
    {
        subcomponent: "form-error-message",
        source: "native",
        name: "id",
        type: "string",
        defaultValue: "ingen",
        description: "Lar deg koble formfeilmeldingen til omkringliggende layout eller hjelpeverktøy via et eksplisitt id-attributt.",
    },
    {
        subcomponent: "form-error-message",
        source: "design-system",
        name: "errors",
        type: "(string | undefined)[]",
        defaultValue: "påkrevd",
        description: "Listen over valideringsfeil som skal oppsummeres på skjema-nivå.",
        interactiveControl: {
            kind: "select",
            name: "errorCount",
            label: "Feil",
            defaultValue: "three",
            options: [
                { value: "one", label: "1 feil" },
                { value: "three", label: "3 feil" },
            ],
        },
    },
    {
        subcomponent: "form-error-message",
        source: "design-system",
        name: "isSubmitted",
        type: "boolean",
        defaultValue: "false",
        description: "Styrer om komponenten skal begynne å vise feiloppsummeringen etter innsending.",
        interactiveControl: {
            kind: "boolean",
            name: "isSubmitted",
            label: "Submitted",
            defaultValue: true,
        },
    },
    {
        subcomponent: "form-error-message",
        source: "design-system",
        name: "isValid",
        type: "boolean",
        defaultValue: "false",
        description: "Brukes sammen med `isSubmitted` for å avgjøre om feiloppsummeringen faktisk skal være synlig.",
        interactiveControl: {
            kind: "boolean",
            name: "isValid",
            label: "Valid",
            defaultValue: false,
        },
    },
    {
        subcomponent: "form-error-message",
        source: "design-system",
        name: "messageProps",
        type: "Partial<MessageProps>",
        defaultValue: `{ title: "Feil og mangler i skjemaet" }`,
        description: "Lar deg overstyre props som sendes videre til den underliggende `Message`-komponenten.",
        interactiveControl: {
            kind: "select",
            name: "messagePreset",
            label: "Tittel",
            defaultValue: "default",
            options: [
                { value: "default", label: "Standard" },
                { value: "custom", label: "Egendefinert" },
            ],
        },
    },
];

const messageRootPropTableDefinitions = [
    {
        source: "design-system",
        description: "Message sine egne props for statusvariant, bredde og eventuell avvising.",
    },
] as const;

export const messagePropTables: DesignSystemPropTable[] = messageRootPropTableDefinitions
    .map((definition) => ({
        source: definition.source,
        description: definition.description,
        rows: messageRootPropDocs
            .filter((prop) => prop.source === definition.source)
            .map((prop) => ({
                name: prop.name,
                type: prop.type,
                defaultValue: prop.defaultValue,
                description: prop.description,
                interactiveControlName: getInteractiveControlName(prop),
            })),
    } satisfies DesignSystemPropTable))
    .filter((table) => table.rows.length > 0);

function createMessageSubcomponentPropTables(): DesignSystemPropTable[] {
    const tableDefinitions = [
        {
            source: "design-system",
            description: "FormErrorMessage sin egen kontrakt for når og hvordan feiloppsummeringen skal vises.",
        },
        {
            source: "framework",
            frameworkName: "React",
            description: "React-props på wrapperen rundt den samlede valideringsmeldingen.",
        },
        {
            source: "native",
            description: "Native attributter som kan brukes på rotelementet til feiloppsummeringen.",
        },
    ] as const;

    return tableDefinitions
        .map((definition) => {
            const rows = messageSubcomponentPropDocs
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
}

export const messageSubcomponents: DesignSystemComponentSubcomponentDoc[] = [
    {
        slug: "form-error-message",
        title: "FormErrorMessage",
        sourceName: "FormErrorMessage",
        selector: ".jkl-form-error-message",
        description: "Valideringsoppsummering som bygger på Message og samler flere skjema-feil på ett sted.",
        propTables: createMessageSubcomponentPropTables(),
    },
];

export const messageInteractiveControls = [
    ...messageRootPropDocs
        .filter(hasInteractiveControl)
        .map((prop) => prop.interactiveControl),
    ...messageSubcomponentPropDocs
        .filter(hasInteractiveControl)
        .map((prop) => prop.interactiveControl),
]
    .filter((control): control is DesignSystemInteractiveExampleControl => Boolean(control))
    .filter((control, index, controls) =>
        controls.findIndex((entry) => entry.name === control.name) === index
    );
