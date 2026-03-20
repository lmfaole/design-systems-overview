import type { ComponentDoc } from "../types";
import { PopoverContentPreview } from "./preview";

const doc: ComponentDoc = {
    id: "popover-content",
    name: "Popover.Content",
    package: "@fremtind/jokul/popover",
    category: "Overlegg",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Det flytende innholdsområdet som vises når popoveren er åpen.",
        long: "Det flytende innholdsområdet som vises når popoveren er åpen. Aksepterer alle native div-attributter i tillegg til egne props.",
    },
    preview: <PopoverContentPreview />,
    props: [
        {
            name: "padding",
            type: "0 | 8 | 16 | 24",
            required: false,
            default: "0",
            source: "custom",
            status: "stable",
            description: "Innvendig padding i piksler rundt innholdet. Verdiene tilsvarer omtrent jkl-spacing-tokens.",
        },
        {
            name: "initialFocus",
            type: "number | React.RefObject<HTMLElement>",
            required: false,
            default: "0",
            source: "custom",
            status: "stable",
            description: "Hvilket element som får fokus når popoveren åpnes. Et tall angir en tabbar-index; en ref peker direkte på elementet. Default 0 = første fokuserbare element.",
        },
        {
            name: "returnFocus",
            type: "boolean",
            required: false,
            default: "true",
            source: "custom",
            status: "stable",
            description: "Om fokus skal returneres til trigger-elementet når popoveren lukkes. Sett til false i navigasjonsdropdowns der fokus skal flyttes videre.",
        },
        {
            name: "children",
            type: "React.ReactNode",
            required: false,
            source: "react",
            status: "stable",
            description: "Innholdet i popoveren.",
        },
    ],
};

export default doc;
