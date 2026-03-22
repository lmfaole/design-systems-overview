import { tag } from "@/lib/html";
import { renderPatternCodeBlock } from "./PatternCodeBlock";
import { renderPatternCodeTabs } from "./PatternCodeTabs";
import type { PatternCodeExamplesProps } from "./PatternCodeExamples.types";

export function renderPatternCodeExamples({ snippets }: PatternCodeExamplesProps): string {
    if (snippets.length === 0) {
        return "";
    }

    if (snippets.length === 1) {
        const [snippet] = snippets;

        return tag(
            "div",
            renderPatternCodeBlock({
                code: snippet.code,
                language: snippet.language,
                label: snippet.label,
            }),
            { class: "mønster-code-examples" },
        );
    }

    return tag("div", renderPatternCodeTabs({ snippets }), { class: "mønster-code-examples" });
}
