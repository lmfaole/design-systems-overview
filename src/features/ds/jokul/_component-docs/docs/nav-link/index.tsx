import type { ComponentDoc } from "../types";
import { props } from "./props";
import { NavLinkPreview } from "./preview";

const doc: ComponentDoc = {
    id: "nav-link",
    name: "Nav Link",
    package: "@fremtind/jokul/nav-link",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "NavLink er en navigasjonslenke med tydelig aktiv tilstand.",
        long: "NavLink er en navigasjonslenke med tydelig aktiv tilstand. Brukes i navigasjonsmeny og sidefelt.",
    },
    relationships: {
        alternatives: [{ id: "link", description: "Bruk Link for innebygde hyperkoblinger i tekstinnhold fremfor sidenavigasjon." }, { id: "link-list", description: "Bruk LinkList når du presenterer en gruppert, merket samling av navigasjonslenker i en kolonne." }],
    },
    preview: <NavLinkPreview />,
    example: (props) => <NavLinkPreview {...props} />,

    props,
};

export default doc;
