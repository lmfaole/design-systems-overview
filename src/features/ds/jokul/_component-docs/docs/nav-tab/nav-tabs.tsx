import type { ComponentDoc } from "../types";
import { NavTabsPreview } from "./preview";
import { navTabsProps } from "./props";

const doc: ComponentDoc = {
    id: "nav-tabs",
    name: "NavTabs",
    package: "@fremtind/jokul/tabs",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Wrapper-komponent som inneholder NavTab-elementene og håndterer tablist-rollen og den animerte.",
        long: "Wrapper-komponent som inneholder NavTab-elementene og håndterer tablist-rollen og den animerte indikatoren.",
    },
    preview: <NavTabsPreview />,
    props: navTabsProps,
};

export default doc;
