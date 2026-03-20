import { RadioButton, RadioButtonGroup } from "@fremtind/jokul/radio-button";
import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "label",
        description: "Følger React-konvensjonen om å sende innhold som children fremfor en prop.",
        deprecates: { name: "label" },
        replacedBy: [{ name: "children" }],
        before: `<RadioButton value="basic" label="Basis" />`,
        after: `<RadioButton value="basic">Basis</RadioButton>`,
    },
];
