import type {ComponentDoc} from "../types";
import {ExpandablePanelContentPreview} from "./preview";

const doc: ComponentDoc = {
    id: "expandable-panel-content",
    name: "ExpandablePanel.Content",
    package: "@fremtind/jokul/expander",
    category: "Visning",
    status: "stable",
    complexity: {use: "medium", maintenance: "medium"},
    showOnOverview: false,
    description: {
        short: "Innholdsområdet som vises og skjules.",
        long: "Innholdsområdet som vises og skjules.",
    },
    preview: <ExpandablePanelContentPreview/>,
    props: [
        {
            name: "children",
            type: "React.ReactNode",
            required: true,
            source: "react",
            status: "stable",
            description: "Innholdet som vises når panelet er åpent."
        },
    ],
};

export default doc;
