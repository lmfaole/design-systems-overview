import type { ComponentDoc } from "../types";
import { props } from "./props";
import { LinkPreview } from "./preview";

const doc: ComponentDoc = {
    id: "link",
    name: "Link",
    package: "@fremtind/jokul/link",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Jøkuls grunnleggende lenkestil for inline-lenker og frittstående lenker.",
        long: "Link er Jøkuls grunnleggende lenkestil for inline-lenker og frittstående lenker.",
    },
    relationships: {
        alternatives: [{ id: "link-list", description: "Bruk LinkList når flere relaterte lenker bør grupperes under en felles overskrift." }, { id: "nav-link", description: "Bruk NavLink for sidefelts- eller menynavigasjonselementer som fremhever aktiv rute." }],
    },
    preview: <LinkPreview />,

    props,
};

export default doc;
