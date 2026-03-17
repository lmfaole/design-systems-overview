import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ProgressBarPreview } from "./preview";
import { ProgressBarExample } from "./example";

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
    example: (props) => <ProgressBarExample {...props} />,
    exampleControlsConfig: {
        include: ["title", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-valuetext"],
        order: ["title", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-valuetext"],
        overrides: {
            title: { defaultValue: "Fremdrift" },
            "aria-valuenow": { kind: "number", defaultValue: 40, min: 0, max: 100, step: 1 },
            "aria-valuemin": { kind: "number", defaultValue: 0, min: 0, max: 100, step: 1 },
            "aria-valuemax": { kind: "number", defaultValue: 100, min: 1, max: 100, step: 1 },
            "aria-valuetext": { placeholder: "f.eks. 40 % ferdig" },
        },
    },
    props,
};

export default doc;
