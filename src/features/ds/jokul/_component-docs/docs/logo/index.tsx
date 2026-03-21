import type { ComponentDoc } from "../types";
import { props } from "./props";
import { LogoPreview } from "./preview";

const doc: ComponentDoc = {
    id: "logo",
    name: "Logo",
    package: "@fremtind/jokul/logo",
    category: "Visning",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "Rendrer Fremtind-logoen som en SVG-komponent.",
        long: "Logo rendrer Fremtind-logoen som en SVG-komponent.",
    },
    preview: <LogoPreview />,
    example: () => <LogoPreview />,

    props,
};

export default doc;
