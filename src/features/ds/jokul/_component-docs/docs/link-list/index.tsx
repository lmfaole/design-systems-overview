import type { ComponentDoc } from "../types";
import { props } from "./props";
import { LinkListExample } from "./example";
import { LinkListPreview } from "./preview";

const doc: ComponentDoc = {
    id: "link-list",
    name: "Link List",
    package: "@fremtind/jokul/link-list",
    category: "Navigasjon",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "LinkList viser en tematisk gruppert liste av lenker med en felles overskrift.",
        long: "LinkList viser en tematisk gruppert liste av lenker med en felles overskrift.",
    },
    relationships: {
        alternatives: [{ id: "link", description: "Bruk Link for en enkelt innebygd hyperkobling i brødtekst fremfor en gruppert navigasjonsliste." }, { id: "nav-link", description: "Bruk NavLink for sidefeltsnavigasjonselementer som fremhever den aktive ruten." }],
        subcomponents: [
            { id: "link-list-link", description: "En lenke inne i lenkegruppelisten." },
        ],
    },
    preview: <LinkListPreview />,
    example: (props) => <LinkListExample {...props} />,
    exampleControlsConfig: {
        include: ["label", "hideLabel"],
        order: ["label", "hideLabel"],
        overrides: {
            label: { defaultValue: "Forsikringer" },
            hideLabel: { kind: "boolean", defaultValue: false },
        },
    },

    props,
};

export default doc;
