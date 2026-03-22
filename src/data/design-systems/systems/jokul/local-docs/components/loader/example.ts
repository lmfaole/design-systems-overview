import { createInteractiveExample } from "../../../../../playground";
import { loaderInteractiveControls } from "./props";

type LoaderSizeValue = "large" | "medium" | "small";
type LoaderRoleValue = "status" | "none";
type LoaderAriaLiveValue = "polite" | "assertive" | "off";

interface LoaderExampleState {
    size: LoaderSizeValue;
    inline: boolean;
    role: LoaderRoleValue;
    ariaLive: LoaderAriaLiveValue;
}

const defaultLoaderExampleState: LoaderExampleState = {
    size: "large",
    inline: false,
    role: "status",
    ariaLive: "polite",
};

function getLoaderExampleState(values: Record<string, string | boolean>): LoaderExampleState {
    return {
        size: String(values.size ?? defaultLoaderExampleState.size) as LoaderSizeValue,
        inline: values.inline === true,
        role: String(values.role ?? defaultLoaderExampleState.role) as LoaderRoleValue,
        ariaLive: String(values.ariaLive ?? defaultLoaderExampleState.ariaLive) as LoaderAriaLiveValue,
    };
}

function getLoaderClassName(state: LoaderExampleState): string {
    return [
        "jkl-loader",
        state.inline ? "jkl-loader--inline" : "",
        state.size === "large" ? "" : `jkl-loader--${state.size}`,
    ].filter(Boolean).join(" ");
}

function renderLoaderDots(className: string): string {
    return [
        `<span class="${className}" aria-hidden="true">`,
        '<span class="jkl-loader__dot jkl-loader__dot--left"></span>',
        '<span class="jkl-loader__dot jkl-loader__dot--middle"></span>',
        '<span class="jkl-loader__dot jkl-loader__dot--right"></span>',
        "</span>",
    ].join("");
}

function getStatusText(state: LoaderExampleState): string {
    return state.inline
        ? "Sender inn skjemaet"
        : "Laster inn oversikten";
}

function getRoleAttributes(state: LoaderExampleState): string {
    if (state.role !== "status") {
        return "";
    }

    return ` role="status" aria-live="${state.ariaLive}"`;
}

function getLoaderSummary(state: LoaderExampleState): string {
    return [
        `size="${state.size}"`,
        `inline=${state.inline ? "true" : "false"}`,
        state.role === "status"
            ? `role="status" · aria-live="${state.ariaLive}"`
            : "role=utelatt",
    ].join(" · ");
}

function renderStatusLoaderPreview(state: LoaderExampleState): string {
    const loaderMarkup = renderLoaderDots(getLoaderClassName(state));
    const hiddenText = state.role === "status"
        ? `<span class="jkl-sr-only">${getStatusText(state)}</span>`
        : "";
    const wrapperTag = state.inline ? "span" : "div";

    if (state.inline) {
        return [
            '<div class="jkl">',
            `<p><small>${getLoaderSummary(state)}</small></p>`,
            `<p>Sender inn <${wrapperTag}${getRoleAttributes(state)}>${hiddenText}${loaderMarkup}</${wrapperTag}> skjemaet.</p>`,
            state.role === "none"
                ? "<p>Her må den synlige teksten rundt loaderen formidle statusen uten hjelp fra en live region.</p>"
                : "",
            "</div>",
        ].join("");
    }

    return [
        '<div class="jkl">',
        `<p><small>${getLoaderSummary(state)}</small></p>`,
        "<p>Henter oppdatert oversikt over komponenter.</p>",
        `<${wrapperTag}${getRoleAttributes(state)}>${hiddenText}${loaderMarkup}</${wrapperTag}>`,
        state.role === "none"
            ? "<p>Uten `role=\"status\"` må teksten rundt loaderen eller annen feedback dekke statusendringen.</p>"
            : "",
        "</div>",
    ].join("");
}

function renderLoaderHtmlCode(state: LoaderExampleState): string {
    const loaderMarkup = [
        `<span class="${getLoaderClassName(state)}" aria-hidden="true">`,
        '    <span class="jkl-loader__dot jkl-loader__dot--left"></span>',
        '    <span class="jkl-loader__dot jkl-loader__dot--middle"></span>',
        '    <span class="jkl-loader__dot jkl-loader__dot--right"></span>',
        "</span>",
    ].join("\n");
    const srOnlyMarkup = state.role === "status"
        ? `\n    <span class="jkl-sr-only">${getStatusText(state)}</span>`
        : "";

    if (state.inline) {
        const roleAttributes = state.role === "status"
            ? ` role="status" aria-live="${state.ariaLive}"`
            : "";

        return `<p>
    Sender inn
    <span${roleAttributes}>${srOnlyMarkup}
${loaderMarkup.replace(/^/gm, "    ")}
    </span>
    skjemaet.
</p>`;
    }

    const roleAttributes = state.role === "status"
        ? ` role="status" aria-live="${state.ariaLive}"`
        : "";

    return `<p>Henter oppdatert oversikt over komponenter.</p>
<div${roleAttributes}>${srOnlyMarkup}
${loaderMarkup}
</div>`;
}

function getLoaderNotes(state: LoaderExampleState): string[] {
    const notes = [
        state.size === "large"
            ? "Large er standardstørrelsen når du bruker basisklassen uten modifier."
            : `Bruk \`jkl-loader--${state.size}\` når loaderen trenger en ${state.size === "medium" ? "mellomstor" : "kompakt"} variant.`,
    ];

    if (state.inline) {
        notes.push("Inline-varianten passer når ventingen hører til en kort tekststreng eller en knapp.");
    } else {
        notes.push("Bruk blokknivå-loader når hele området eller seksjonen venter på data.");
    }

    if (state.role === "status") {
        notes.push("Live regionen gjør at skjermlesere kan få beskjed om at innholdet oppdateres.");

        if (state.ariaLive === "assertive") {
            notes.push("`aria-live=\"assertive\"` bør bare brukes når oppdateringen er kritisk og må avbryte annen opplesning.");
        }
    } else {
        notes.push("Når du utelater `role=\"status\"`, må annen synlig eller skjult tekst forklare tilstanden tydelig.");
    }

    return notes;
}

export const loaderPlayground = createInteractiveExample(
    loaderInteractiveControls,
    (values) => {
        const state = getLoaderExampleState(values);

        return {
            previewHtml: renderStatusLoaderPreview(state),
            codeExamples: [
                {
                    label: "HTML",
                    language: "html",
                    code: renderLoaderHtmlCode(state),
                },
                {
                    label: "CSS-importer",
                    language: "ts",
                    code: `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/loader/loader.min.css";`,
                },
            ],
            notes: getLoaderNotes(state),
        };
    },
);
