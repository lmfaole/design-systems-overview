import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { skeletonLoaderInteractiveControls } from "./props";

type SkeletonLoaderPatternValue = "element" | "input" | "table";
type SkeletonLoaderShapeValue = "rectangle" | "circle";

export interface SkeletonLoaderExampleState {
    pattern: SkeletonLoaderPatternValue;
    compact: boolean;
    shape: SkeletonLoaderShapeValue;
}

const defaultSkeletonLoaderExampleState: SkeletonLoaderExampleState = {
    pattern: "element",
    compact: false,
    shape: "rectangle",
};
export const SKELETON_LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/skeleton-loader";

function getSkeletonLoaderExampleState(
    values: Record<string, string | boolean>,
): SkeletonLoaderExampleState {
    return {
        pattern: String(
            values.pattern ?? defaultSkeletonLoaderExampleState.pattern,
        ) as SkeletonLoaderPatternValue,
        compact: values.compact === true,
        shape: String(values.shape ?? defaultSkeletonLoaderExampleState.shape) as SkeletonLoaderShapeValue,
    };
}

function getSkeletonAnimationClassName(compact: boolean): string {
    return compact
        ? "jkl-skeleton-animation jkl-skeleton-animation--compact"
        : "jkl-skeleton-animation";
}

function getSkeletonLoaderSummary(state: SkeletonLoaderExampleState): string {
    return [
        `pattern="${state.pattern}"`,
        `compact=${state.compact ? "true" : "false"}`,
        `shape="${state.shape}"`,
    ].join(" · ");
}

function renderSkeletonElementPreview(state: SkeletonLoaderExampleState): string {
    const sizeStyle = state.shape === "circle"
        ? "inline-size: 3rem; block-size: 3rem;"
        : "inline-size: 14rem; block-size: 1rem;";
    const shapeClassName = state.shape === "circle"
        ? " jkl-skeleton-element--circle"
        : "";

    return [
        `<div class="${getSkeletonAnimationClassName(state.compact)}" aria-hidden="true">`,
        `<div class="jkl-skeleton-element${shapeClassName}" style="${sizeStyle}"></div>`,
        "</div>",
    ].join("");
}

function renderSkeletonInputPreview(state: SkeletonLoaderExampleState): string {
    const animationClassName = getSkeletonAnimationClassName(state.compact);
    const containerClassName = state.compact
        ? "jkl-skeleton-input jkl-skeleton-input--compact"
        : "jkl-skeleton-input";

    return [
        `<div class="${containerClassName}" aria-hidden="true">`,
        `<div class="${animationClassName}"><div class="jkl-skeleton-element" style="inline-size: 6rem; block-size: 0.75rem;"></div></div>`,
        `<div class="${animationClassName}"><div class="jkl-skeleton-element" style="inline-size: 18rem; block-size: 2.75rem;"></div></div>`,
        '<div class="jkl-skeleton-input__checkbox">',
        `<div class="${animationClassName}"><div class="jkl-skeleton-element" style="inline-size: 1.5rem; block-size: 1.5rem;"></div></div>`,
        `<div class="${animationClassName}"><div class="jkl-skeleton-element" style="inline-size: 10rem; block-size: 1rem;"></div></div>`,
        "</div>",
        "</div>",
    ].join("");
}

function renderSkeletonTableCell(
    compact: boolean,
    width: string,
): string {
    return [
        `<div class="${getSkeletonAnimationClassName(compact)}" aria-hidden="true">`,
        `<div class="jkl-skeleton-element" style="inline-size: ${width}; block-size: 1rem;"></div>`,
        "</div>",
    ].join("");
}

function renderSkeletonTablePreview(state: SkeletonLoaderExampleState): string {
    const containerClassName = state.compact
        ? "jkl-skeleton-table jkl-skeleton-table--compact"
        : "jkl-skeleton-table";

    return [
        `<div class="${containerClassName}" aria-hidden="true">`,
        '<div class="jkl-skeleton-table__header">',
        renderSkeletonTableCell(state.compact, "5rem"),
        renderSkeletonTableCell(state.compact, "7rem"),
        renderSkeletonTableCell(state.compact, "4rem"),
        "</div>",
        '<div class="jkl-skeleton-table__row">',
        renderSkeletonTableCell(state.compact, "9rem"),
        renderSkeletonTableCell(state.compact, "6rem"),
        renderSkeletonTableCell(state.compact, "4rem"),
        "</div>",
        '<div class="jkl-skeleton-table__row">',
        renderSkeletonTableCell(state.compact, "7rem"),
        renderSkeletonTableCell(state.compact, "8rem"),
        renderSkeletonTableCell(state.compact, "3rem"),
        "</div>",
        "</div>",
    ].join("");
}

export function renderSkeletonLoaderPreviewMarkup(state: SkeletonLoaderExampleState): string {
    const patternPreview = state.pattern === "element"
        ? renderSkeletonElementPreview(state)
        : state.pattern === "input"
            ? renderSkeletonInputPreview(state)
            : renderSkeletonTablePreview(state);
    const patternDescription = state.pattern === "element"
        ? "Brukes når du kjenner til ett konkret element eller en avatar."
        : state.pattern === "input"
            ? "Passer når et skjema eller en feltgruppe er på vei inn."
            : "Passer når tabellstrukturen er kjent, men radinnholdet ikke er klart ennå.";

    return [
        '<div class="jkl">',
        `<p><small>${getSkeletonLoaderSummary(state)}</small></p>`,
        `<p>${patternDescription}</p>`,
        patternPreview,
        "</div>",
    ].join("");
}

function renderSkeletonElementCode(state: SkeletonLoaderExampleState): string {
    const animationClassName = getSkeletonAnimationClassName(state.compact);
    const shapeClassName = state.shape === "circle"
        ? " jkl-skeleton-element--circle"
        : "";
    const sizeStyle = state.shape === "circle"
        ? "inline-size: 3rem; block-size: 3rem;"
        : "inline-size: 14rem; block-size: 1rem;";

    return `<div class="${animationClassName}" aria-hidden="true">
    <div class="jkl-skeleton-element${shapeClassName}" style="${sizeStyle}"></div>
</div>`;
}

function renderSkeletonInputCode(state: SkeletonLoaderExampleState): string {
    const animationClassName = getSkeletonAnimationClassName(state.compact);
    const containerClassName = state.compact
        ? "jkl-skeleton-input jkl-skeleton-input--compact"
        : "jkl-skeleton-input";

    return `<div class="${containerClassName}" aria-hidden="true">
    <div class="${animationClassName}">
        <div class="jkl-skeleton-element" style="inline-size: 6rem; block-size: 0.75rem;"></div>
    </div>
    <div class="${animationClassName}">
        <div class="jkl-skeleton-element" style="inline-size: 18rem; block-size: 2.75rem;"></div>
    </div>
    <div class="jkl-skeleton-input__checkbox">
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 1.5rem; block-size: 1.5rem;"></div>
        </div>
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 10rem; block-size: 1rem;"></div>
        </div>
    </div>
</div>`;
}

function renderSkeletonTableCode(state: SkeletonLoaderExampleState): string {
    const animationClassName = getSkeletonAnimationClassName(state.compact);
    const containerClassName = state.compact
        ? "jkl-skeleton-table jkl-skeleton-table--compact"
        : "jkl-skeleton-table";

    return `<div class="${containerClassName}" aria-hidden="true">
    <div class="jkl-skeleton-table__header">
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 5rem; block-size: 1rem;"></div>
        </div>
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 7rem; block-size: 1rem;"></div>
        </div>
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 4rem; block-size: 1rem;"></div>
        </div>
    </div>
    <div class="jkl-skeleton-table__row">
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 9rem; block-size: 1rem;"></div>
        </div>
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 6rem; block-size: 1rem;"></div>
        </div>
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 4rem; block-size: 1rem;"></div>
        </div>
    </div>
    <div class="jkl-skeleton-table__row">
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 7rem; block-size: 1rem;"></div>
        </div>
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 8rem; block-size: 1rem;"></div>
        </div>
        <div class="${animationClassName}">
            <div class="jkl-skeleton-element" style="inline-size: 3rem; block-size: 1rem;"></div>
        </div>
    </div>
</div>`;
}

export function renderSkeletonLoaderHtmlCode(state: SkeletonLoaderExampleState): string {
    if (state.pattern === "element") {
        return renderSkeletonElementCode(state);
    }

    if (state.pattern === "input") {
        return renderSkeletonInputCode(state);
    }

    return renderSkeletonTableCode(state);
}

function getSkeletonLoaderNotes(state: SkeletonLoaderExampleState): string[] {
    const notes = [
        "Skjelettlasting passer best når layouten er kjent og du vil unngå store hopp i grensesnittet mens innholdet kommer inn.",
        "Marker skeleton-markupen som dekorativ med `aria-hidden=\"true\"` og la omkringliggende tekst eller struktur forklare hva som lastes.",
    ];

    if (state.compact) {
        notes.push("Compact-varianten bør speile en allerede kompakt tabell eller feltgruppe, ikke brukes alene.");
    }

    if (state.pattern !== "element") {
        notes.push("`shape` påvirker bare `element`-varianten. Input- og table-mønstrene bruker sine egne ferdige strukturer.");
    }

    if (state.pattern === "table") {
        notes.push("Bruk tabellskjelett bare når kolonnene er stabile og radinnholdet er det som mangler.");
    }

    return notes;
}

export function renderSkeletonLoaderInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getSkeletonLoaderExampleState(values);

    return {
        previewHtml: renderSkeletonLoaderPreviewMarkup(state),
        codeExamples: [
            {
                label: "HTML",
                language: "html",
                code: renderSkeletonLoaderHtmlCode(state),
            },
            {
                label: "CSS-importer",
                language: "ts",
                code: `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/loader/skeleton-loader.min.css";`,
            },
        ],
        notes: getSkeletonLoaderNotes(state),
    };
}

export const skeletonLoaderPlayground = createInteractiveExample(
    SKELETON_LOADER_INTERACTIVE_EXAMPLE_RENDERER_ID,
    skeletonLoaderInteractiveControls,
    renderSkeletonLoaderInteractiveExample,
);
