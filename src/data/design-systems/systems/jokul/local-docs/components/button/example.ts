import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { getJokulInstallGuideHref } from "../../paths";
import { buttonInteractiveControls } from "./props";

type ButtonAsValue = "button" | "a";
type ButtonVariantValue = "primary" | "secondary" | "tertiary" | "ghost";
type ButtonDensityValue = "inherit" | "comfortable" | "compact";
type ButtonLoaderValue = "none" | "sending";
type ButtonIconValue = "none" | "download" | "arrow";
type ButtonIconPositionValue = "left" | "right";
type ButtonTypeValue = "button" | "submit" | "reset";

interface ButtonExampleState {
    as: ButtonAsValue;
    variant: ButtonVariantValue;
    density: ButtonDensityValue;
    type: ButtonTypeValue;
    disabled: boolean;
    loader: ButtonLoaderValue;
    icon: ButtonIconValue;
    iconPosition: ButtonIconPositionValue;
}

const JOKUL_BUTTON_LINK_HREF = getJokulInstallGuideHref("react-og-core");
export const BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/button";

const defaultButtonExampleState: ButtonExampleState = {
    as: "button",
    variant: "secondary",
    density: "inherit",
    type: "button",
    disabled: false,
    loader: "none",
    icon: "none",
    iconPosition: "left",
};

function getButtonExampleState(values: Record<string, string | boolean>): ButtonExampleState {
    return {
        as: String(values.as ?? defaultButtonExampleState.as) as ButtonAsValue,
        variant: String(values.variant ?? defaultButtonExampleState.variant) as ButtonVariantValue,
        density: String(values.density ?? defaultButtonExampleState.density) as ButtonDensityValue,
        type: String(values.type ?? defaultButtonExampleState.type) as ButtonTypeValue,
        disabled: values.disabled === true,
        loader: String(values.loader ?? defaultButtonExampleState.loader) as ButtonLoaderValue,
        icon: String(values.icon ?? defaultButtonExampleState.icon) as ButtonIconValue,
        iconPosition: String(
            values.iconPosition ?? defaultButtonExampleState.iconPosition,
        ) as ButtonIconPositionValue,
    };
}

function getButtonLoaderText(loader: ButtonLoaderValue): string {
    if (loader === "sending") {
        return "Sender inn";
    }

    return "";
}

function getButtonPreviewDensity(state: ButtonExampleState): Exclude<ButtonDensityValue, "inherit"> {
    if (state.density === "inherit") {
        return "comfortable";
    }

    return state.density;
}

function renderButtonIcon(icon: ButtonIconValue): string {
    if (icon === "download") {
        return '<svg class="jkl-icon" width="1em" height="1em" viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5v7"></path><path d="m5.5 7.75 2.5 2.75 2.5-2.75"></path><path d="M3 12.5h10"></path></svg>';
    }

    if (icon === "arrow") {
        return '<svg class="jkl-icon" width="1em" height="1em" viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8h9"></path><path d="m8.5 4.5 3.5 3.5-3.5 3.5"></path></svg>';
    }

    return "";
}

function renderButtonLoaderMarkup(loader: ButtonLoaderValue): string {
    if (loader === "none") {
        return "";
    }

    return [
        '<span class="jkl-button__loader">',
        '<span class="jkl-loader jkl-loader--inline" aria-hidden="true">',
        '<span class="jkl-loader__dot jkl-loader__dot--left"></span>',
        '<span class="jkl-loader__dot jkl-loader__dot--middle"></span>',
        '<span class="jkl-loader__dot jkl-loader__dot--right"></span>',
        "</span>",
        `<span class="jkl-sr-only">${getButtonLoaderText(loader)}</span>`,
        "</span>",
    ].join("");
}

function getButtonPreviewSummary(state: ButtonExampleState): string {
    return [
        `as="${state.as}"`,
        `variant="${state.variant}"`,
        `density="${state.density}"`,
        `type="${state.type}"`,
        `disabled=${state.disabled ? "true" : "false"}`,
        state.loader === "none" ? "loader=ingen" : `loader="${getButtonLoaderText(state.loader)}"`,
        state.icon === "none" ? "icon=ingen" : `icon="${state.icon}"`,
        `iconPosition="${state.iconPosition}"`,
    ].join(" · ");
}

function getButtonReactCodeIcon(state: ButtonExampleState): string {
    if (state.icon === "download") {
        return `const icon = (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M8 2.5v7" />
        <path d="m5.5 7.75 2.5 2.75 2.5-2.75" />
        <path d="M3 12.5h10" />
    </svg>
);`;
    }

    if (state.icon === "arrow") {
        return `const icon = (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2.5 8h9" />
        <path d="m8.5 4.5 3.5 3.5-3.5 3.5" />
    </svg>
);`;
    }

    return "";
}

function getButtonNotes(state: ButtonExampleState): string[] {
    const notes: string[] = [];

    if (state.as === "a") {
        notes.push("Bruk `as=\"a\"` bare når handlingen faktisk navigerer til en ny URL.");
    } else if (!state.disabled) {
        notes.push("Aktiv knapp passer når brukeren faktisk kan utføre handlingen nå.");
    }

    if (state.disabled && state.as === "button") {
        notes.push("Når handlingen er disabled, bør årsaken forklares i nærheten av knappen.");
    }

    if (state.disabled && state.as === "a") {
        notes.push("Lenker har ikke en ekte native disabled-state. Velg knapp dersom handlingen må kunne slås av.");
    }

    if (state.loader !== "none") {
        notes.push("Når loader vises, bør komponenten samtidig hindre dobbeltinnsending og gi skjermlesere en tekstlig status.");
    }

    if (state.icon !== "none") {
        notes.push("Ikonet skal støtte teksten, ikke erstatte etiketten i en vanlig handlingsknapp.");
    }

    if (state.density === "comfortable") {
        notes.push("Eksplisitt `density=\"comfortable\"` er nyttig når knappen står i en ellers kompakt kontekst.");
    }

    if (state.density === "compact") {
        notes.push("Compact bør brukes sammen med øvrige kompakte kontroller i samme område.");
    }

    return notes;
}

function renderButtonPreviewMarkup(state: ButtonExampleState): string {
    const previewDensity = getButtonPreviewDensity(state);
    const previewIcon = renderButtonIcon(state.icon);
    const previewLoader = renderButtonLoaderMarkup(state.loader);
    const buttonLabelChildren = [
        state.icon !== "none" && state.iconPosition === "left" ? previewIcon : "",
        '<span class="jkl-button__text">Send inn</span>',
        state.icon !== "none" && state.iconPosition === "right" ? previewIcon : "",
    ].filter(Boolean).join("");
    const buttonAttributes = [
        state.as === "button" ? `type="${state.type}"` : `href="${JOKUL_BUTTON_LINK_HREF}"`,
        state.as === "button" && state.disabled ? "disabled" : "",
        state.as === "a" && state.disabled ? 'aria-disabled="true"' : "",
        state.loader !== "none" ? 'data-loading="true"' : "",
        `class="jkl-button jkl-button--${state.variant}"`,
    ].filter(Boolean).join(" ");

    return [
        `<div class="jkl" data-density="${previewDensity}">`,
        `<p><small>${getButtonPreviewSummary(state)}</small></p>`,
        `<${state.as} ${buttonAttributes}>`,
        `<span class="jkl-button__label">${buttonLabelChildren}</span>`,
        previewLoader,
        `</${state.as}>`,
        state.disabled && state.as === "button"
            ? "<p>Fyll ut alle obligatoriske felt før du sender inn.</p>"
            : "",
        state.as === "a"
            ? `<p>Eksempelet navigerer til <code>${JOKUL_BUTTON_LINK_HREF}</code> når det brukes som lenke.</p>`
            : "",
        "</div>",
    ].join("");
}

function renderButtonReactExampleCode(state: ButtonExampleState): string {
    const iconCode = getButtonReactCodeIcon(state);
    const loaderCode = state.loader === "none"
        ? ""
        : `            loader={{ showLoader: true, textDescription: "${getButtonLoaderText(state.loader)}" }}
`;
    const iconPropCode = state.icon === "none"
        ? ""
        : `            icon={icon}
            iconPosition="${state.iconPosition}"
`;
    const densityCode = state.density === "inherit"
        ? ""
        : `            density="${state.density}"
`;
    const elementSpecificCode = state.as === "a"
        ? `            as="a"
            href="${JOKUL_BUTTON_LINK_HREF}"
`
        : `            type="${state.type}"
${state.disabled ? "            disabled\n" : ""}`;

    return `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/button/button.min.css";
import "@fremtind/jokul/styles/components/loader/loader.min.css";
import { Button } from "@fremtind/jokul/button";

${iconCode ? `${iconCode}

` : ""}export function Example() {
    return (
        <Button
${elementSpecificCode}            variant="${state.variant}"
${densityCode}${loaderCode}${iconPropCode}        >
            Send inn
        </Button>
    );
}`;
}

export function renderButtonInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getButtonExampleState(values);

    return {
        previewHtml: renderButtonPreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderButtonReactExampleCode(state),
            },
        ],
        notes: getButtonNotes(state),
    };
}

export const buttonPlayground = createInteractiveExample(
    BUTTON_INTERACTIVE_EXAMPLE_RENDERER_ID,
    buttonInteractiveControls,
    renderButtonInteractiveExample,
    {
        eventLog: {
            events: ["focus", "click", "blur"],
            targetSelector: "button, a",
            emptyLabel: "Ingen hendelser fra komponenteksempelet ennå.",
            maxEntries: 6,
        },
    },
);
