import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "helpLabel",
        description: "Samlet i supportLabelProps for ett konsistent grensesnitt for alle støttetekster.",
        deprecates: { name: "helpLabel" },
        replacedBy: [{ name: "supportLabelProps" }],
        before: `<InputGroup
    label="E-postadresse"
    helpLabel="Vi bruker e-post til å sende kvittering."
    render={(props) => <TextInput {...props} />}
/>`,
        after: `<InputGroup
    label="E-postadresse"
    supportLabelProps={{ label: "Vi bruker e-post til å sende kvittering.", labelType: "help" }}
    render={(props) => <TextInput {...props} />}
/>`,
    },
    {
        title: "errorLabel",
        description: "Samlet i supportLabelProps for ett konsistent grensesnitt for alle støttetekster.",
        deprecates: { name: "errorLabel" },
        replacedBy: [{ name: "supportLabelProps" }],
        before: `<InputGroup
    label="Telefonnummer"
    errorLabel="Ugyldig telefonnummer."
    render={(props) => <TextInput {...props} aria-invalid />}
/>`,
        after: `<InputGroup
    label="Telefonnummer"
    supportLabelProps={{ label: "Ugyldig telefonnummer.", labelType: "error" }}
    render={(props) => <TextInput {...props} aria-invalid />}
/>`,
    },
];
