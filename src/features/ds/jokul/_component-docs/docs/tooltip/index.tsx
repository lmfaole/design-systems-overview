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
        short: "Tooltip gir korte hint til knapper og andre interaktive elementer.",
        long: "Tooltip brukes for korte, ikke-interaktive hint til knapper og andre interaktive elementer (vises ved hover/fokus/klikk).",
    },
    preview: <TooltipPreview />,
    props,
    relationships: {
        related: [{ id: "popup-tip", description: "PopupTip er deprecated, men dokumentert separat for migrering." }],
    },
};

export default doc;
