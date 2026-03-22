import type {
    DesignSystemComponentSubcomponentDoc,
    DesignSystemInteractiveExampleControl,
    DesignSystemPropTable,
} from "../../../../../types";

type RadioButtonGroupPropSource = "design-system" | "framework" | "native" | "aria";
type RadioButtonItemPropSource = "framework" | "native" | "aria";

interface RadioButtonGroupPropDoc {
    source: RadioButtonGroupPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

interface RadioButtonItemPropDoc {
    source: RadioButtonItemPropSource;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControl?: DesignSystemInteractiveExampleControl;
}

function hasInteractiveControl<T extends { interactiveControl?: DesignSystemInteractiveExampleControl }>(
    prop: T,
): prop is T & { interactiveControl: DesignSystemInteractiveExampleControl } {
    return "interactiveControl" in prop && Boolean(prop.interactiveControl);
}

function getInteractiveControlName(
    prop: { interactiveControl?: DesignSystemInteractiveExampleControl },
): string | undefined {
    return hasInteractiveControl(prop)
        ? prop.interactiveControl.name
        : undefined;
}

const radioButtonGroupPropDocs: RadioButtonGroupPropDoc[] = [
    {
        source: "design-system",
        name: "value",
        type: "string",
        defaultValue: "ingen valgt verdi",
        description: "Kontrollerer hvilken RadioButton som er valgt i gruppen.",
        interactiveControl: {
            kind: "select",
            name: "selectedValue",
            label: "Valgt verdi",
            defaultValue: "email",
            options: [
                { value: "email", label: "På e-post" },
                { value: "sms", label: "På SMS" },
                { value: "post", label: "I posten" },
            ],
        },
    },
    {
        source: "design-system",
        name: "inline",
        type: "boolean",
        defaultValue: "false",
        description: "Legger radio buttons på én linje når alternativene er korte nok til å fungere side om side.",
        interactiveControl: {
            kind: "boolean",
            name: "inline",
            label: "Inline",
            defaultValue: false,
        },
    },
    {
        source: "framework",
        name: "data-testautoid",
        type: "string",
        defaultValue: "ingen",
        description: "Stabil test-id fra Jøkul sin feltgruppekontrakt når gruppen må spores uten å lene seg på legend-teksten.",
    },
    {
        source: "framework",
        name: "legend",
        type: "string",
        defaultValue: "påkrevd",
        description: "Spørsmålet eller overskriften som navngir hele radiogruppen.",
    },
    {
        source: "framework",
        name: "labelProps",
        type: "Omit<LabelProps, \"children\">",
        defaultValue: "ingen",
        description: "Lar deg justere label-varianten eller skjule legend visuelt uten å miste semantikken.",
    },
    {
        source: "framework",
        name: "supportLabelProps",
        type: "Omit<SupportLabelProps, \"id\" | \"errorLabel\" | \"helpLabel\">",
        defaultValue: "ingen",
        description: "Styrer hvordan hjelp- eller feilmeldingen for gruppen rendres, for eksempel labelType eller skjult tekst.",
    },
    {
        source: "framework",
        name: "tooltip",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Ekstra forklaring knyttet til legend når spørsmålet trenger mer kontekst uten å vokse i høyde.",
    },
    {
        source: "framework",
        name: "className",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra klasse på fieldset-wrapperen når gruppen må kobles til lokal layout eller sporing.",
    },
    {
        source: "framework",
        name: "errorLabel",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Feilmelding for hele gruppen. Setter samtidig gruppen og tilhørende RadioButtons i ugyldig tilstand.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
    {
        source: "framework",
        name: "helpLabel",
        type: "string",
        defaultValue: "ingen",
        description: "Kort støttetekst under legend når brukeren trenger mer føring før valget tas.",
    },
    {
        source: "framework",
        name: "description",
        type: "string",
        defaultValue: "ingen",
        description: "Ekstra beskrivelse som utdyper gruppens formål når legend alene ikke er nok.",
    },
    {
        source: "native",
        name: "name",
        type: "string",
        defaultValue: "ingen",
        description: "Settes på gruppen for å gi alle RadioButtons samme skjema-navn.",
    },
    {
        source: "native",
        name: "onChange",
        type: "(event) => void",
        defaultValue: "ingen handler",
        description: "Kalles når brukeren velger et nytt alternativ i gruppen.",
    },
    {
        source: "aria",
        name: "aria-invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Brukes på gruppen når valget er ugyldig og brukeren trenger en konkret feilmelding.",
        interactiveControl: {
            kind: "boolean",
            name: "invalid",
            label: "Invalid",
            defaultValue: false,
        },
    },
];

const radioButtonItemPropDocs: RadioButtonItemPropDoc[] = [
    {
        source: "framework",
        name: "children",
        type: "ReactNode",
        defaultValue: "påkrevd",
        description: "Synlig etikett for det enkelte alternativet.",
    },
    {
        source: "framework",
        name: "helpLabel",
        type: "ReactNode",
        defaultValue: "ingen",
        description: "Ekstra tekst under et enkelt alternativ når ett valg trenger mer forklaring enn de andre.",
    },
    {
        source: "framework",
        name: "label",
        type: "ReactNode",
        defaultValue: "deprecated",
        description: "Utfaset alias for `children`. Behold bare ved migrering fra eldre kode.",
    },
    {
        source: "framework",
        name: "supportLabelProps",
        type: "Omit<SupportLabelProps, \"id\" | \"errorLabel\" | \"helpLabel\">",
        defaultValue: "ingen",
        description: "Lar deg justere hjelp- eller støtteteksten som hører til ett enkelt alternativ.",
    },
    {
        source: "native",
        name: "value",
        type: "string",
        defaultValue: "påkrevd",
        description: "Verdien alternativet representerer i gruppen.",
    },
    {
        source: "native",
        name: "name",
        type: "string",
        defaultValue: "arves vanligvis fra gruppen",
        description: "Kan settes direkte på RadioButton når kontrollen eies av en ekstern formmotor eller må stå utenfor gruppens standardkobling.",
    },
    {
        source: "native",
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Brukes når ett bestemt alternativ midlertidig ikke kan velges.",
        interactiveControl: {
            kind: "boolean",
            name: "disabled",
            label: "Disabled valg",
            defaultValue: false,
        },
    },
    {
        source: "native",
        name: "onChange",
        type: "(event) => void",
        defaultValue: "arves vanligvis fra gruppen",
        description: "Kan settes per knapp, men håndteres ofte på RadioButtonGroup.",
    },
    {
        source: "aria",
        name: "aria-describedby",
        type: "string",
        defaultValue: "ingen",
        description: "Pek til støttetekst når ett bestemt alternativ trenger ekstra forklaring.",
    },
];

const radioButtonGroupPropTableDefinitions = [
    {
        source: "design-system",
        description: "Jøkul-props på RadioButtonGroup som styrer layout og valgt tilstand i gruppen.",
    },
    {
        source: "framework",
        frameworkName: "React",
        description: "React-props som navngir gruppen og kobler til hjelp eller feiltekst.",
    },
    {
        source: "native",
        description: "Native fieldset- og hendelsesrelaterte props som går på hele gruppen.",
    },
    {
        source: "aria",
        description: "Tilgjengelighetsattributter som gjør gruppens validering tydelig for hjelpemidler.",
    },
] as const;

const radioButtonItemPropTableDefinitions = [
    {
        source: "framework",
        frameworkName: "React",
        description: "Props på RadioButton som styrer etikett og lokal hjelpetekst på ett alternativ.",
    },
    {
        source: "native",
        description: "Native `input[type=\"radio\"]`-attributter som settes per alternativ.",
    },
    {
        source: "aria",
        description: "ARIA-attributter for enkelttilfeller der ett alternativ trenger egen utdyping.",
    },
] as const;

export const radioButtonPropTables: DesignSystemPropTable[] = radioButtonGroupPropTableDefinitions
    .map((definition) => {
        const rows = radioButtonGroupPropDocs
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

function createRadioButtonSubcomponentPropTables(): DesignSystemPropTable[] {
    return radioButtonItemPropTableDefinitions
        .map((definition) => {
            const rows = radioButtonItemPropDocs
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

export const radioButtonSubcomponents: DesignSystemComponentSubcomponentDoc[] = [
    {
        slug: "radio-button-item",
        title: "RadioButton",
        sourceName: "RadioButton",
        selector: ".jkl-radio-button",
        description: "Det enkelte alternativet i gruppen, med label, underliggende radio-input og eventuell lokal hjelpetekst.",
        propTables: createRadioButtonSubcomponentPropTables(),
    },
];

export const radioButtonInteractiveControls = [
    ...radioButtonGroupPropDocs
        .filter(hasInteractiveControl)
        .map((prop) => prop.interactiveControl),
    ...radioButtonItemPropDocs
        .filter(hasInteractiveControl)
        .map((prop) => prop.interactiveControl),
].filter((control, index, controls) =>
    controls.findIndex((entry) => entry.name === control.name) === index
);
