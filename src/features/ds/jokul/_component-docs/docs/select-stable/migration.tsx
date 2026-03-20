import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "items",
        description: "BETA_Select bruker native <option>-elementer som children for å følge standard HTML-mønstre og gi bedre fleksibilitet.",
        deprecates: { name: "items" },
        replacedBy: [{ name: "children" }],
        before: `import { Select } from "@fremtind/jokul/select";

<Select
    label="Fylke"
    name="county"
    items={["Oslo", "Viken", "Innlandet", "Agder"]}
    value={value}
    onChange={({ target }) => setValue(target.value)}
/>`,
        after: `import { BETA_Select as Select } from "@fremtind/jokul/select";

<Select
    label="Fylke"
    name="county"
    value={value}
    onChange={(e) => setValue(e.target.value)}
>
    <option value="oslo">Oslo</option>
    <option value="viken">Viken</option>
    <option value="innlandet">Innlandet</option>
    <option value="agder">Agder</option>
</Select>`,
    },
];
