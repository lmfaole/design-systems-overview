import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ListPreview } from "./preview";

const doc: ComponentDoc = {
    id: "list",
    name: "List",
    package: "@fremtind/jokul/list",
    category: "Visning",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Komponentene UnorderedList og OrderedList brukes for strukturerte lister med konsistent styling.",
        long: "List-komponentene (UnorderedList og OrderedList) brukes for strukturerte lister med konsistent styling.",
    },
    preview: <ListPreview />,
    example: () => <ListPreview />,

    props,
};

export default doc;
