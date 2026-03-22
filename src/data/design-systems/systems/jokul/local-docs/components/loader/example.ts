import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { loaderInteractiveControls } from "./props";

type LoaderVariantValue = "large" | "medium" | "small";
type LoaderRoleValue = "status" | "none";
type LoaderAriaLiveValue = "polite" | "assertive" | "off";
type LoaderDelayValue = "0" | "250" | "600";

interface LoaderExampleState {
    variant: LoaderVariantValue;
    textDescription: string;
    inline: boolean;
    delay: LoaderDelayValue;
    role: LoaderRoleValue;
    ariaLive: LoaderAriaLiveValue;
}

const defaultLoaderExampleState: LoaderExampleState = {
    variant: "large",
    textDescription: "Laster inn oversikten",
    inline: false,
    delay: "0",
    role: "status",
    ariaLive: "polite",
};
export const LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/loader";

function getLoaderExampleState(values: Record<string, string | boolean>): LoaderExampleState {
    return {
        variant: String(values.variant ?? defaultLoaderExampleState.variant) as LoaderVariantValue,
        textDescription: String(
            values.textDescription ?? defaultLoaderExampleState.textDescription,
        ),
        inline: values.inline === true,
        delay: String(values.delay ?? defaultLoaderExampleState.delay) as LoaderDelayValue,
        role: String(values.role ?? defaultLoaderExampleState.role) as LoaderRoleValue,
        ariaLive: String(values.ariaLive ?? defaultLoaderExampleState.ariaLive) as LoaderAriaLiveValue,
    };
}

function getLoaderClassName(state: LoaderExampleState): string {
    return [
        "jkl-loader",
        state.inline ? "jkl-loader--inline" : "",
        state.variant === "large" ? "" : `jkl-loader--${state.variant}`,
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

function getRoleAttributes(state: LoaderExampleState): string {
    if (state.role !== "status") {
        return "";
    }

    return ` role="status" aria-live="${state.ariaLive}"`;
}

function getLoaderSummary(state: LoaderExampleState): string {
    return [
        `variant="${state.variant}"`,
        `textDescription="${state.textDescription}"`,
        `inline=${state.inline ? "true" : "false"}`,
        `delay=${state.delay}ms`,
        state.role === "status"
            ? `role="status" · aria-live="${state.ariaLive}"`
            : "role=utelatt",
    ].join(" · ");
}

function renderStatusLoaderPreview(state: LoaderExampleState): string {
    const loaderMarkup = renderLoaderDots(getLoaderClassName(state));
    const hiddenText = state.role === "status"
        ? `<span class="jkl-sr-only">${state.textDescription}</span>`
        : "";
    const wrapperTag = state.inline ? "span" : "div";

    if (state.inline) {
        return [
            '<div class="jkl">',
            `<p><small>${getLoaderSummary(state)}</small></p>`,
            `<p>Status: <${wrapperTag}${getRoleAttributes(state)}>${hiddenText}${loaderMarkup}</${wrapperTag}> ${state.textDescription}.</p>`,
            state.role === "none"
                ? "<p>Her må den synlige teksten rundt loaderen formidle statusen uten hjelp fra en live region.</p>"
                : "",
            "</div>",
        ].join("");
    }

    return [
        '<div class="jkl">',
        `<p><small>${getLoaderSummary(state)}</small></p>`,
        `<p>${state.textDescription}</p>`,
        `<${wrapperTag}${getRoleAttributes(state)}>${hiddenText}${loaderMarkup}</${wrapperTag}>`,
        state.role === "none"
            ? "<p>Uten `role=\"status\"` må teksten rundt loaderen eller annen feedback dekke statusendringen.</p>"
            : "",
        "</div>",
    ].join("");
}

function renderLoaderHtmlCode(state: LoaderExampleState): string {
    const variantCode = state.variant === "large"
        ? ""
        : `            variant="${state.variant}"\n`;
    const inlineCode = state.inline ? "            inline\n" : "";
    const delayCode = state.delay === "0"
        ? ""
        : `            delay={${state.delay}}\n`;
    const roleCode = state.role === "status"
        ? '            role="status"\n'
        : "";

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/loader/loader.min.css";
import { Loader } from "@fremtind/jokul/loader";

export function Example() {
    return (
        <Loader
            textDescription="${state.textDescription}"
${variantCode}${inlineCode}${delayCode}${roleCode}        />
    );
}`;
}

function getLoaderNotes(state: LoaderExampleState): string[] {
    const notes = [
        state.variant === "large"
            ? "Large er standardstørrelsen når du bruker basisklassen uten modifier."
            : `Bruk \`variant="${state.variant}"\` når loaderen trenger en ${state.variant === "medium" ? "mellomstor" : "kompakt"} variant.`,
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

    if (state.delay !== "0") {
        notes.push("Delay hjelper når du vil unngå at korte operasjoner flimrer loaderen inn og ut før brukeren rekker å oppfatte noe.");
    }

    return notes;
}

export function renderLoaderInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getLoaderExampleState(values);

    return {
        previewHtml: renderStatusLoaderPreview(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderLoaderHtmlCode(state),
            },
        ],
        notes: getLoaderNotes(state),
    };
}

export const loaderPlayground = createInteractiveExample(
    LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID,
    loaderInteractiveControls,
    renderLoaderInteractiveExample,
);
