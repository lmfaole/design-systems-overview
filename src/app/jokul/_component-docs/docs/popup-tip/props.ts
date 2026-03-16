import type { PropDef } from "../types";

export const props: PropDef[] = [
    {
        name: "content",
        type: "React.ReactNode",
        required: true,
        source: "react",
        status: "stable",
        description: "Innholdet i tooltipen.",
    },
    {
        name: "triggerProps",
        type: "React.HTMLProps<HTMLButtonElement>",
        required: false,
        source: "react",
        status: "stable",
        description: "Props som legges på trigger-knappen.",
    },
    {
        name: "placement",
        type: '"top" | "top-start" | "top-end" | "left" | "right"',
        required: false,
        source: "custom",
        status: "stable",
        default: '"top"',
        description: "Posisjon for popup-tip.",
    },
    {
        name: "delay",
        type: "number",
        required: false,
        source: "custom",
        status: "stable",
        description: "Forsinkelse i ms før visning.",
    },
    {
        name: "initialOpen",
        type: "boolean",
        required: false,
        source: "custom",
        status: "stable",
        default: "false",
        description: "Om tipset skal være åpent ved første render.",
    },
    {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        source: "custom",
        status: "stable",
        description: "Kalles når tipset åpnes eller lukkes.",
    },
];
