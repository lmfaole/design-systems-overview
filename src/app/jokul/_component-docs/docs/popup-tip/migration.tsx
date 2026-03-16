import type { Migration } from "../types";

const migrations: Migration[] = [
    {
        title: "PopupTip → Tooltip",
        description: "Bruk Tooltip når du trenger mer kontroll over trigger og innhold.",
        deprecates: { name: "PopupTip" },
        replacedBy: [{ name: "Tooltip" }],
        before: `import { PopupTip } from "@fremtind/jokul/tooltip";

<PopupTip content="Kort forklaring" />`,
        after: `import { Tooltip, TooltipTrigger, TooltipContent } from "@fremtind/jokul/tooltip";

<Tooltip>
    <TooltipTrigger>Vis info</TooltipTrigger>
    <TooltipContent>Kort forklaring</TooltipContent>
</Tooltip>`,
    },
    {
        title: "PopupTip → Help",
        description: "Bruk Help når du trenger et avvisbart hjelpepanelet.",
        deprecates: { name: "PopupTip" },
        replacedBy: [{ name: "Help" }],
        before: `import { PopupTip } from "@fremtind/jokul/tooltip";

<PopupTip content="Hva betyr dette?" />`,
        after: `import { Help } from "@fremtind/jokul/help";

<Help buttonText="Hvorfor?">Hva betyr dette?</Help>`,
    },
];

export default migrations;
