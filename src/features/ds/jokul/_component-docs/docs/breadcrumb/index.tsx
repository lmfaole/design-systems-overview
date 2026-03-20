import type { ComponentDoc } from "../types";
import { props } from "./props";
import { BreadcrumbPreview } from "./preview";

const doc: ComponentDoc = {
    id: "breadcrumb",
    name: "Breadcrumb",
    package: "@fremtind/jokul/breadcrumb",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Viser hvor brukeren er i nettstedets hierarki og gir snarveier.",
        long: "Breadcrumb viser hvor brukeren er i nettstedets hierarki og gir snarveier tilbake til overordnede sider.",
    },
    relationships: {
        related: [{ id: "nav-link", description: "NavLink gir sidefeltsnavigasjonen som brødsmulestien supplerer ved å vise den hierarkiske stien." }, { id: "link", description: "Hvert brødsmule-element er bygget på en standard Link for tastatur- og skjermlesertilgjengelighet." }],
        subcomponents: [
            { id: "breadcrumb-item", description: "Et enkelt ledd i brødsmulestien." },
        ],
    },
    preview: <BreadcrumbPreview />,

    props,
};

export default doc;
