import { ScreenReaderOnly } from "@fremtind/jokul/screen-reader-only";
import type { ComponentExampleProps } from "../types";

export function ScreenReaderOnlyPreview(props: ComponentExampleProps = {}) {
    const showOnFocus = props.showOnFocus === true;

    return (
        <div style={{ padding: "var(--jkl-spacing-m)", border: "1px dashed var(--jkl-color-border-default)", borderRadius: "4px" }}>
            <ScreenReaderOnly showOnFocus={showOnFocus}>Denne teksten er kun synlig for skjermlesere</ScreenReaderOnly>
            <span aria-hidden style={{ color: "var(--jkl-color-text-subdued)", fontStyle: "italic", fontSize: "0.9em" }}>
                Innhold skjult visuelt
            </span>
        </div>
    );
}
