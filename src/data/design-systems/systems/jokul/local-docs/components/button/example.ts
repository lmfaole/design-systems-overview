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
type ButtonIconValue = "none" | "search" | "arrow";
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

function getButtonLoaderText(state: ButtonExampleState): string {
    if (state.loader === "none") {
        return "";
    }

    if (state.icon === "search") {
        return "Søker";
    }

    if (state.icon === "arrow") {
        return "Laster neste steg";
    }

    return "Sender inn";
}

function getButtonLabelText(state: ButtonExampleState): string {
    if (state.icon === "search") {
        return "Søk";
    }

    if (state.icon === "arrow") {
        return "Gå videre";
    }

    return "Send inn";
}

function getButtonPreviewDensity(state: ButtonExampleState): Exclude<ButtonDensityValue, "inherit"> {
    if (state.density === "inherit") {
        return "comfortable";
    }

    return state.density;
}

function renderButtonIcon(icon: ButtonIconValue): string {
    if (icon === "search") {
        return '<span class="jkl-icon" aria-hidden="true"></span>';
    }

    if (icon === "arrow") {
        return '<span class="jkl-icon" aria-hidden="true"></span>';
    }

    return "";
}

function renderButtonLoaderMarkup(state: ButtonExampleState): string {
    if (state.loader === "none") {
        return "";
    }

    return [
        '<span class="jkl-button__loader">',
        '<span class="jkl-loader jkl-loader--inline" aria-hidden="true">',
        '<span class="jkl-loader__dot jkl-loader__dot--left"></span>',
        '<span class="jkl-loader__dot jkl-loader__dot--middle"></span>',
        '<span class="jkl-loader__dot jkl-loader__dot--right"></span>',
        "</span>",
        `<span class="jkl-sr-only">${getButtonLoaderText(state)}</span>`,
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
        state.loader === "none" ? "loader=ingen" : `loader="${getButtonLoaderText(state)}"`,
        state.icon === "none" ? "icon=ingen" : `icon="${state.icon}"`,
        `iconPosition="${state.iconPosition}"`,
    ].join(" · ");
}

function getButtonReactIconName(icon: ButtonIconValue): string {
    if (icon === "search") {
        return "SearchIcon";
    }

    if (icon === "arrow") {
        return "ArrowRightIcon";
    }

    return "";
}

function getButtonReactCodeIcon(state: ButtonExampleState): string {
    const iconName = getButtonReactIconName(state.icon);

    if (!iconName) {
        return "";
    }

    return `const icon = <${iconName} aria-hidden="true" />;`;
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
    const previewLoader = renderButtonLoaderMarkup(state);
    const buttonLabelChildren = [
        state.icon !== "none" && state.iconPosition === "left" ? previewIcon : "",
        `<span class="jkl-button__text">${getButtonLabelText(state)}</span>`,
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
    const iconImportName = getButtonReactIconName(state.icon);
    const iconStyleImport = state.icon === "none"
        ? ""
        : 'import "@fremtind/jokul/styles/components/icon/icon.min.css";\n';
    const iconFontImport = state.icon === "none"
        ? ""
        : 'import "@fremtind/jokul/styles/fonts/webfonts.min.css";\n';
    const iconImportCode = iconImportName
        ? `import { ${iconImportName} } from "@fremtind/jokul/icon";\n`
        : "";
    const loaderCode = state.loader === "none"
        ? ""
        : `            loader={{ showLoader: true, textDescription: "${getButtonLoaderText(state)}" }}\n`;
    const iconPropCode = state.icon === "none"
        ? ""
        : `            icon={icon}\n            iconPosition="${state.iconPosition}"\n`;
    const densityCode = state.density === "inherit"
        ? ""
        : `            density="${state.density}"\n`;
    const elementSpecificCode = state.as === "a"
        ? `            as="a"\n            href="${JOKUL_BUTTON_LINK_HREF}"\n`
        : `            type="${state.type}"\n${state.disabled ? "            disabled\n" : ""}`;

    return `import "@fremtind/jokul/styles/core/core.min.css";
import "@fremtind/jokul/styles/components/button/button.min.css";
import "@fremtind/jokul/styles/components/loader/loader.min.css";
${iconStyleImport}${iconFontImport}import { Button } from "@fremtind/jokul/button";
${iconImportCode ? `${iconImportCode}` : ""}
${iconCode ? `${iconCode}\n\n` : ""}export function Example() {
    return (
        <Button
${elementSpecificCode}            variant="${state.variant}"
${densityCode}${loaderCode}${iconPropCode}        >
            ${getButtonLabelText(state)}
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
