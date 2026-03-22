import { joinHtml, tag, text } from "@/lib/html";
import { renderPatternCodeExamples } from "./PatternCodeExamples";
import type { PatternExampleCardProps } from "./PatternExampleCard.types";

export function renderPatternExampleCard({
    title,
    preview,
    eyebrow,
    description,
    codeExamples,
    code,
    codeLanguage,
    codeLabel,
}: PatternExampleCardProps): string {
    const snippets = codeExamples ?? (code ? [{ code, language: codeLanguage, label: codeLabel }] : []);

    return tag(
        "article",
        joinHtml([
            tag(
                "header",
                joinHtml([
                    eyebrow ? tag("small", text(eyebrow), { class: "mønster-example-eyebrow" }) : "",
                    tag("h5", text(title), { class: "mønster-example-title" }),
                    description ? tag("div", tag("p", text(description)), { class: "mønster-example-description" }) : "",
                ]),
                { class: "mønster-example-header" },
            ),
            tag(
                "div",
                joinHtml([
                    tag("figure", preview, { class: "mønster-example-preview" }),
                    snippets.length > 0
                        ? tag(
                            "div",
                            renderPatternCodeExamples({ snippets }),
                            { class: "mønster-example-code" },
                        )
                        : "",
                ]),
                {
                    class: "mønster-example-body",
                    "data-has-code": String(snippets.length > 0),
                },
            ),
        ]),
        { class: "mønster-example-card" },
    );
}
