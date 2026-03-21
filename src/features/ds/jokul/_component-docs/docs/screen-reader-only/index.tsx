import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ScreenReaderOnlyPreview } from "./preview";

const doc: ComponentDoc = {
    id: "screen-reader-only",
    name: "Screen Reader Only",
    package: "@fremtind/jokul/screen-reader-only",
    category: "Layout",
    status: "stable",
    complexity: { use: "easy", maintenance: "easy" },
    description: {
        short: "ScreenReaderOnly skjuler innhold visuelt mens det forblir tilgjengelig for skjermlesere.",
        long: "ScreenReaderOnly skjuler innhold visuelt mens det forblir tilgjengelig for skjermlesere og annen hjelpemiddelteknologi. Bruk det til å gi ekstra kontekst for ikonknapper, skip-links og annet innhold som er meningsløst uten visuelle ledetråder.",
    },
    preview: <ScreenReaderOnlyPreview />,
    example: (props) => <ScreenReaderOnlyPreview {...props} />,

    props,
};

export default doc;
