import { joinHtml, tag, text } from "@/lib/html";
import type { PatternCodeBlockProps } from "./PatternCodeBlock.types";

export function renderPatternCodeBlock({
    code,
    language = "txt",
    label = "Kodeeksempel",
}: PatternCodeBlockProps): string {
    return tag(
        "figure",
        joinHtml([
            tag(
                "figcaption",
                joinHtml([
                    tag(
                        "p",
                        joinHtml([
                            tag("small", text(label), { class: "mønster-code-block-label" }),
                            tag("small", text(language), { class: "mønster-code-block-language" }),
                        ]),
                        { class: "mønster-code-block-meta" },
                    ),
                    tag(
                        "button",
                        text("Kopier kode"),
                        {
                            type: "button",
                            class: "mønster-copy-button",
                            "data-copy-code-button": true,
                            "data-copy-code-default": "Kopier kode",
                            "data-copy-code-success": "Kopiert",
                            "data-copy-code-error": "Kunne ikke kopiere",
                            "aria-label": "Kopier kode",
                        },
                    ),
                ]),
                { class: "mønster-code-block-toolbar" },
            ),
            tag(
                "pre",
                tag("code", text(code.trim()), {
                    class: "mønster-code-block-code",
                    "data-copy-code-source": true,
                }),
                { class: "mønster-code-block-pre" },
            ),
        ]),
        { class: "mønster-code-block", "data-copy-code-root": true },
    );
}
