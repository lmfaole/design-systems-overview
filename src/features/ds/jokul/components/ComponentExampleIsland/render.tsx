import { getComponentDoc } from "@/data/jokul/component-docs";
import { ComponentExample } from "@/features/ds/jokul/_component-docs/components/ComponentExample/ComponentExample";
import { buildExampleControls } from "@/features/ds/jokul/_component-docs/utils/example-controls";

interface ComponentExampleIslandProps {
    id: string;
}

export function ComponentExampleIsland({ id }: ComponentExampleIslandProps) {
    const doc = getComponentDoc(id);

    if (!doc?.example) {
        return null;
    }

    return (
        <ComponentExample controls={doc.exampleControls ?? buildExampleControls(doc.props, doc.exampleControlsConfig)}>
            {doc.example}
        </ComponentExample>
    );
}
