import type { ComponentDoc } from "../types";
import { props } from "./props";
import { TooltipPreview } from "./preview";

const doc: ComponentDoc = {
    id: "tooltip",
    name: "Tooltip",
    package: "@fremtind/jokul/tooltip",
    category: "Overlegg",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "Og PopupTip viser tilleggsinformasjon ved hover eller klikk.",
        long: "Tooltip og PopupTip viser tilleggsinformasjon ved hover eller klikk.",
    },
    preview: <TooltipPreview />,
    props,
};

export default doc;
