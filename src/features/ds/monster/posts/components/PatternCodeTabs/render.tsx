import { useId } from "react";
import "./styles.scss";
import type { PatternCodeTabsProps } from "./types";

export function PatternCodeTabs({
    snippets,
    label = "Kodeeksempler",
}: PatternCodeTabsProps) {
    const id = useId().replace(/[:]/g, "");

    return (
        <section className="monster-code-tabs" data-code-tabs data-copy-code-root>
            <header className="monster-code-tabs-toolbar">
                <div className="monster-code-tablist" role="tablist" aria-label={label}>
                    {snippets.map((snippet, index) => {
                        const tabId = `monster-code-tab-${id}-${index}`;
                        const panelId = `monster-code-panel-${id}-${index}`;

                        return (
                            <button
                                key={tabId}
                                type="button"
                                id={tabId}
                                role="tab"
                                className="monster-code-tab"
                                aria-controls={panelId}
                                aria-selected={index === 0 ? "true" : "false"}
                                tabIndex={index === 0 ? 0 : -1}
                                data-code-tab-button
                                data-code-tab-target={panelId}
                            >
                                {snippet.label ?? snippet.language ?? `Eksempel ${index + 1}`}
                            </button>
                        );
                    })}
                </div>
                <button
                    type="button"
                    className="monster-copy-button"
                    data-copy-code-button
                    data-copy-code-default="Kopier kode"
                    data-copy-code-success="Kopiert"
                    data-copy-code-error="Kunne ikke kopiere"
                    aria-label="Kopier kode"
                >
                    Kopier kode
                </button>
            </header>
            {snippets.map((snippet, index) => {
                const tabId = `monster-code-tab-${id}-${index}`;
                const panelId = `monster-code-panel-${id}-${index}`;

                return (
                    <section
                        key={panelId}
                        id={panelId}
                        role="tabpanel"
                        aria-labelledby={tabId}
                        className="monster-code-tabpanel"
                        data-code-tab-panel
                        hidden={index !== 0}
                    >
                        {snippet.language && (
                            <p className="monster-code-tabs-meta">
                                <small className="monster-code-block-language">
                                    {snippet.language}
                                </small>
                            </p>
                        )}
                        <pre className="monster-code-block-pre">
                            <code className="monster-code-block-code" data-copy-code-source>
                                {snippet.code.trim()}
                            </code>
                        </pre>
                    </section>
                );
            })}
        </section>
    );
}
