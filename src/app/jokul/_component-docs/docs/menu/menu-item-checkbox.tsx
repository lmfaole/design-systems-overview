import type { ComponentDoc } from "../types";
import { MenuItemCheckboxPreview } from "./preview";

const doc: ComponentDoc = {
    id: "menu-item-checkbox",
    name: "MenuItemCheckbox",
    package: "@fremtind/jokul/menu",
    category: "Overlegg",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Avkrysningselement i menyen for å toggle tilstander.",
        long: "Et avkrysningselement i menyen for å toggle tilstander.",
    },
    preview: <MenuItemCheckboxPreview />,
    props: [
        { name: "aria-checked", type: "boolean", required: false, source: "native", status: "stable", description: "Angir om elementet er huket av." },
        { name: "onChange", type: "(event: React.ChangeEvent, pressed: boolean) => void", required: false, source: "react", status: "stable", description: "Kalles når avkrysningsstatus endres." },
        { name: "children", type: "ReactNode", required: false, source: "react", status: "stable", description: "Tekst eller innhold i elementet." },
    ],
};

export default doc;
