import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";
import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "iconLeft",
        description: "Samlet i én icon-prop for å forenkle API-et. Ikonet plasseres til venstre som standard.",
        deprecates: { name: "iconLeft" },
        replacedBy: [{ name: "icon" }],
        before: `<Button iconLeft={<Icon>add</Icon>}>Ny forsikring</Button>`,
        after: `<Button icon={<Icon>add</Icon>}>Ny forsikring</Button>`,
    },
    {
        title: "iconRight",
        description: "Samlet i én icon-prop for å forenkle API-et. Bruk iconPosition for plassering.",
        deprecates: { name: "iconRight" },
        replacedBy: [{ name: "icon" }, { name: "iconPosition" }],
        before: `<Button iconRight={<Icon>arrow_forward</Icon>}>Se alle</Button>`,
        after: `<Button icon={<Icon>arrow_forward</Icon>} iconPosition="right">Se alle</Button>`,
    },
];
