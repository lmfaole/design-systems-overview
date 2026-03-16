import type { ComponentDoc } from "../types";
import { props } from "./props";
import { CountdownPreview } from "./preview";

const doc: ComponentDoc = {
    id: "countdown",
    name: "Countdown",
    package: "@fremtind/jokul/countdown",
    category: "Visning",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    description: {
        short: "Viser en nedtelling fra et gitt antall millisekunder.",
        long: "Countdown viser en nedtelling fra et gitt antall millisekunder.",
    },
    preview: <CountdownPreview />,

    props,
};

export default doc;
