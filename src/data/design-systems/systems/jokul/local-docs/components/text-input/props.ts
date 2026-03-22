import type {
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type TextInputPropSource = "design-system" | "framework" | "native" | "aria";

interface TextInputPropDoc {
    source: TextInputPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl(
    prop: TextInputPropDoc,
): prop is TextInputPropDoc & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(prop: TextInputPropDoc): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const textInputPropDocs: TextInputPropDoc[] = [
    {
        source: "design-system",
        name: "align",
        type: `"left" | "right"`,
        defaultValue: `"left"`,
        description: "Justerer innholdet i feltet. Høyrejustering brukes typisk for beløp eller andre tallfelt.",
        interactiveControl: {
            kind: "select",
            name: "align",
            label: "Align",
            defaultValue: "left",
            options: [
                { value: "left", label: "left" },
                { value: "right", label: "right" },
            ],
        },
    },
    {
        source: "design-system",
        name: "unit",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Viser en benevnelse til høyre i feltet, for eksempel `kr`.",
        interactiveControl: {
            kind: "select",
            name: "unit",
            label: "Unit",
            defaultValue: "none",
            options: [
                { value: "none", label: "Ingen" },
                { value: "kr", label: "kr" },
            ],
        },
    },
    {
        source: "design-system",
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Lar feltet gå inn i mer kompakte oppsett der labelen skjules visuelt, men fortsatt finnes for skjermlesere.",
        interactiveControl: {
            kind: "boolean",
            name: "inline",
            label: "Inline",
            defaultValue: false,
        },
    },
    {
        source: "design-system",
        name: "invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Setter error-state på feltet og brukes sammen med en konkret feilmelding.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
    {
        source: "framework",
        name: "label",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Labelteksten som forklarer hva brukeren skal skrive inn.",
    },
    {
        source: "framework",
        name: "helpLabel",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Hjelpetekst under feltet når brukeren trenger ekstra føring uten at feltet er ugyldig.",
    },
    {
        source: "framework",
        name: "errorLabel",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Feilmelding under feltet når `invalid` er satt eller valideringen slår inn.",
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på wrapperen når feltet må kobles til lokal layout eller sporing.",
    },
    {
        source: "native",
        name: "defaultValue",
        type: "string",
        defaultValue: "tom streng",
        description: "Setter startverdien i et ukontrollert felt når du vil vise et forhåndsutfylt eksempel.",
        interactiveControl: {
            kind: "select",
            name: "valueState",
            label: "Verdi",
            defaultValue: "empty",
            options: [
                { value: "empty", label: "Tom" },
                { value: "filled", label: "Utfylt" },
            ],
        },
    },
    {
        source: "native",
        name: "placeholder",
        type: "string",
        defaultValue: "ingen",
        description: "Kort hint om format eller forventet verdi. Skal ikke erstatte labelen.",
    },
    {
        source: "native",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Brukes når feltet midlertidig ikke kan redigeres.",
        interactiveControl: {
            kind: "boolean",
            name: "disabled",
            label: "Disabled",
            defaultValue: false,
        },
    },
    {
        source: "native",
        name: "type",
        type: "string",
        defaultValue: `"text"`,
        description: "Bruk riktig inputtype når feltet handler om e-post, tall, passord eller andre spesifikke data.",
    },
    {
        source: "aria",
        name: "aria-describedby",
        type: "string",
        defaultValue: "ingen",
        description: "Kobler hjelpetekst eller feilmelding til feltet.",
    },
    {
        source: "aria",
        name: "aria-invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Bør settes sammen med en konkret feilmelding når feltet er ugyldig.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
];

const textInputPropTableDefinitions = [
    {
        source: "design-system",
        description: "Jøkul-props som styrer hvordan tekstfeltet oppfører seg og presenteres i docs.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "Props på `TextInput` og `InputGroup` som påvirker label, hjelp og wrapperoppførsel.",
    },
    {
        source: "native",
        description: "Native HTML-attributter som sendes videre til det underliggende `<input>`-elementet.",
    },
    {
        source: "aria",
        description: "Tilgjengelighetsattributter som kobler feltet til støtte- og feiltekst.",
    },
] as const;

export const textInputPropTables: DesignSystemPropTable[] = textInputPropTableDefinitions
    .map((definition) => {
        const rows = textInputPropDocs
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

export const textInputInteractiveControls = textInputPropDocs
    .filter(hasInteractiveControl)
    .map((prop) => prop.interactiveControl)
    .filter((control, index, controls) =>
        controls.findIndex((entry) => entry.name === control.name) === index
    );
