import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { cardInteractiveControls } from "./props";

type CardVariantValue = "high" | "low" | "outlined";
type CardPaddingValue = "s" | "m" | "l" | "xl";
type CardImagePlacementValue = "top" | "middle" | "bottom" | "full";

interface CardExampleState {
    variant: CardVariantValue;
    padding: CardPaddingValue;
    clickable: boolean;
    imagePlacement: CardImagePlacementValue;
}

const CARD_IMAGE_DATA_URI = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23dbe7f2'/%3E%3Ccircle cx='72' cy='58' r='20' fill='%23aec5dc'/%3E%3Crect x='24' y='104' width='272' height='18' rx='9' fill='%23bfd1e2'/%3E%3Crect x='24' y='132' width='176' height='12' rx='6' fill='%23bfd1e2'/%3E%3C/svg%3E";

const defaultCardExampleState: CardExampleState = {
    variant: "high",
    padding: "m",
    clickable: false,
    imagePlacement: "top",
};

export const CARD_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/card";

function getCardExampleState(
    values: DesignSystemInteractiveExampleValues,
): CardExampleState {
    return {
        variant: String(values.variant ?? defaultCardExampleState.variant) as CardVariantValue,
        padding: String(values.padding ?? defaultCardExampleState.padding) as CardPaddingValue,
        clickable: values.clickable === true,
        imagePlacement: String(
            values.imagePlacement ?? defaultCardExampleState.imagePlacement,
        ) as CardImagePlacementValue,
    };
}

function getCardSummary(state: CardExampleState): string {
    return [
        `variant="${state.variant}"`,
        `padding="${state.padding}"`,
        `clickable=${state.clickable ? "true" : "false"}`,
        `image="${state.imagePlacement}"`,
    ].join(" · ");
}

function renderCardImageMarkup(state: CardExampleState): string {
    return `<img class="jkl-card-image jkl-card-image--${state.imagePlacement}" src="${CARD_IMAGE_DATA_URI}" alt="">`;
}

function renderCardPreviewMarkup(state: CardExampleState): string {
    const tagName = state.clickable ? "a" : "article";
    const attributes = [
        `class="jkl-card jkl-card--${state.variant}"`,
        `data-padding="${state.padding}"`,
        `data-clickable="${state.clickable ? "true" : "false"}"`,
        state.clickable ? 'href="#"' : "",
        state.clickable ? 'aria-label="Åpne statuskortet for lansering"' : "",
    ].filter(Boolean).join(" ");

    return [
        '<div class="jkl">',
        `<p><small>${getCardSummary(state)}</small></p>`,
        `<${tagName} ${attributes}>`,
        renderCardImageMarkup(state),
        "<p><strong>Status for vårslipp</strong></p>",
        "<p>Tre mønstre er klare for gjennomgang, og to komponenter mangler fortsatt innholdsdokumentasjon.</p>",
        "<p><small>Oppdatert i dag · 3 åpne avklaringer</small></p>",
        `</${tagName}>`,
        "</div>",
    ].join("");
}

function renderCardReactCode(state: CardExampleState): string {
    const clickableCode = state.clickable
        ? '    return (\n        <Card as="a" href="/ds/systemer" aria-label="Åpne statuskortet for lansering"'
        : "    return (\n        <Card";
    const variantCode = state.variant !== "high"
        ? `\n            variant="${state.variant}"`
        : "";
    const paddingCode = state.padding !== "s"
        ? `\n            padding="${state.padding}"`
        : "";
    const clickableStateCode = state.clickable ? "\n            clickable" : "";
    const imageCode = `\n            <CardImage\n                src="${CARD_IMAGE_DATA_URI}"\n                alt=""\n                placement="${state.imagePlacement}"\n            />`;

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/card/card.min.css";
import { Card, CardImage } from "@fremtind/jokul/card";

export function Example() {
${clickableCode}${variantCode}${paddingCode}${clickableStateCode}
        >
${imageCode}
            <h2>Status for vårslipp</h2>
            <p>Tre mønstre er klare for gjennomgang.</p>
        </Card>
    );
}`;
}

function getCardNotes(state: CardExampleState): string[] {
    const notes = [
        "Kort fungerer best når innholdet henger tydelig sammen og kan leses som én samlet enhet.",
    ];

    if (state.clickable) {
        notes.push("Hvis hele kortet er klikkbart bør det normalt være den eneste interaktive flaten i kortet.");
    }

    if (state.imagePlacement === "full") {
        notes.push("Full-bleed bilde passer best når bildet er primærbæreren av kontekst og kortet ellers har lite tekst.");
    }

    if (state.variant === "outlined") {
        notes.push("Outlined-varianten fungerer godt når kortet må ligge på en allerede tydelig bakgrunn uten å bli tungt fylt.");
    }

    return notes;
}

export function renderCardInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getCardExampleState(values);

    return {
        previewHtml: renderCardPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderCardReactCode(state),
            },
        ],
        notes: getCardNotes(state),
    };
}

export const cardPlayground = createInteractiveExample(
    CARD_INTERACTIVE_EXAMPLE_RENDERER_ID,
    cardInteractiveControls,
    renderCardInteractiveExample,
);
