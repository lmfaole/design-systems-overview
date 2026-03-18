import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "action",
        description: "Erstattet med actionButton for å gi full kontroll over knappens utseende og oppførsel.",
        deprecates: { name: "action" },
        replacedBy: [{ name: "actionButton" }],
        before: `<TextInput
    label="Søk"
    action={{ icon: "search", label: "Søk", onClick: handleSearch }}
/>`,
        after: `import { Button } from "@fremtind/jokul/button";

<TextInput
    label="Søk"
    actionButton={
        <Button variant="secondary" onClick={handleSearch}>
            Søk
        </Button>
    }
/>`,
    },
];
