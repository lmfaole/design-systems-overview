import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ProgressBarPreview } from "./preview";

const doc: ComponentDoc = {
    id: "progress-bar",
    name: "Progress Bar",
    package: "@fremtind/jokul/progress-bar",
    category: "Tilbakemelding",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "ProgressBar viser fremgang i en prosess.",
        long: "ProgressBar viser fremgang i en prosess.",
    },

    preview: <ProgressBarPreview />,
    props,
};

export default doc;
