import type { ComponentDoc } from "../types";
import { PopoverTriggerPreview } from "./preview";

const doc: ComponentDoc = {
    id: "popover-trigger",
    name: "Popover.Trigger",
    package: "@fremtind/jokul/popover",
    category: "Overlegg",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Trigger-elementet som åpner og lukker popoveren.",
        long: "Trigger-elementet som åpner og lukker popoveren. Rendrer som <button> som standard, og kan dele trigger-props med andre elementer via asChild.",
    },
    preview: <PopoverTriggerPreview />,
    props: [
        {
            name: "asChild",
            type: "boolean",
            required: false,
            default: "false",
            source: "custom",
            status: "stable",
            description:
                "Slår sammen trigger-props med child-elementet i stedet for å wrappe det i en <button>. Nyttig for lenker, ikoner og andre eksisterende elementer. Ved asChild + klikk-trigger (f.eks. Jøkul Button) må clickOptions={{ enabled: true }} settes på <Popover> for at klikk skal åpne/lukke.",
        },
        {
            name: "children",
            type: "React.ReactNode",
            required: true,
            source: "react",
            status: "stable",
            description: "Innholdet i trigger-elementet.",
        },
    ],
};

export default doc;
