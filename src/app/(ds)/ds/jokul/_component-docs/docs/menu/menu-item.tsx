import type { ComponentDoc } from "../types";
import { MenuItemPreview } from "./preview";

const doc: ComponentDoc = {
    id: "menu-item",
    name: "MenuItem",
    package: "@fremtind/jokul/menu",
    category: "Overlegg",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Valgbart element i menyen.",
        long: "Et valgbart element i menyen.",
    },
    preview: <MenuItemPreview />,
    props: [
        { name: "icon", type: "ReactNode", required: false, source: "custom", status: "stable", description: "Ikon som vises til venstre for teksten." },
        { name: "as", type: "ElementType", required: false, source: "custom", status: "stable", default: '"button"', description: "Polymorfisk prop for å endre underliggende element (f.eks. 'a' for lenker)." },
        { name: "expandable", type: "boolean", required: false, source: "custom", status: "stable", description: "Viser et ekspanderingsikon i elementet." },
        { name: "onClick", type: "React.MouseEventHandler", required: false, source: "react", status: "stable", description: "Kalles ved klikk på elementet." },
        { name: "children", type: "ReactNode", required: false, source: "react", status: "stable", description: "Tekst eller innhold i meny-elementet." },
    ],
};

export default doc;
