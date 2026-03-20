import type { ComponentDoc } from "../types";
import { SkeletonElementPreview } from "./preview";

const doc: ComponentDoc = {
    id: "skeleton-element",
    name: "SkeletonElement",
    package: "@fremtind/jokul/skeleton",
    category: "Tilbakemelding",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Freeform rektangulær eller sirkulær plassholder med tilpassbar størrelse.",
        long: "Freeform rektangulær eller sirkulær plassholder med tilpassbar størrelse. Bruk for alt som ikke har en dedikert Skeleton-variant.",
    },
    preview: <SkeletonElementPreview />,
    props: [
        { name: "width", type: "number | string", required: true, source: "custom", status: "stable", description: "Bredde på plassholderen, f.eks. '100%' eller '8rem'." },
        { name: "height", type: "number | string", required: true, source: "custom", status: "stable", description: "Høyde på plassholderen." },
        { name: "shape", type: '"rect" | "circle"', required: false, source: "custom", status: "stable", default: '"rect"', description: "Form på plassholderen. Bruk circle for avatarer og ikoner." },
        { name: "style", type: "React.CSSProperties", required: false, source: "react", status: "stable", description: "Inline stilsetting." },
    ],
};

export default doc;
