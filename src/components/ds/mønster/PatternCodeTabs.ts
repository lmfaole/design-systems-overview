import { joinHtml, tag, text } from "@/lib/html";
import type { PatternCodeTabsProps } from "./PatternCodeTabs.types";

export function renderPatternCodeTabs({
    snippets,
    label = "Kodeeksempler",
}: PatternCodeTabsProps): string {
    return tag(
        "section",
        joinHtml([
            tag(
                "header",
                joinHtml([
                    tag(
                        "div",
                        snippets.map((snippet, index) => {
                            const tabId = `mønster-code-tab-${index}`;
                            const panelId = `mønster-code-panel-${index}`;

                            return tag(
                                "button",
                                text(snippet.label ?? snippet.language ?? `Eksempel ${index + 1}`),
                                {
                                    type: "button",
                                    id: tabId,
                                    role: "tab",
                                    class: "mønster-code-tab",
                                    "aria-controls": panelId,
                                    "aria-selected": index === 0 ? "true" : "false",
                                    tabIndex: index === 0 ? 0 : -1,
                                    "data-code-tab-button": true,
                                    "data-code-tab-target": panelId,
                                },
                            );
                        }).join(""),
                        {
                            class: "mønster-code-tablist",
                            role: "tablist",
                            "aria-label": label,
                        },
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
                { class: "mønster-code-tabs-toolbar" },
            ),
            snippets.map((snippet, index) => {
                const tabId = `mønster-code-tab-${index}`;
                const panelId = `mønster-code-panel-${index}`;

                return tag(
                    "section",
                    joinHtml([
                        snippet.language
                            ? tag(
                                "p",
                                tag("small", text(snippet.language), { class: "mønster-code-block-language" }),
                                { class: "mønster-code-tabs-meta" },
                            )
                            : "",
                        tag(
                            "pre",
                            tag("code", text(snippet.code.trim()), {
                                class: "mønster-code-block-code",
                                "data-copy-code-source": true,
                            }),
                            { class: "mønster-code-block-pre" },
                        ),
                    ]),
                    {
                        id: panelId,
                        role: "tabpanel",
                        "aria-labelledby": tabId,
                        class: "mønster-code-tabpanel",
                        "data-code-tab-panel": true,
                        hidden: index !== 0,
                    },
                );
            }).join(""),
        ]),
        {
            class: "mønster-code-tabs",
            "data-code-tabs": true,
            "data-copy-code-root": true,
        },
    );
}
