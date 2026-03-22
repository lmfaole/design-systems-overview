import {
    createInteractiveExample,
    type CreateInteractiveExampleStateResult,
    type DesignSystemInteractiveExampleValues,
} from "../../../../../playground";
import { messageInteractiveControls } from "./props";

type MessageVariantValue = "info" | "error" | "success" | "warning";

interface MessageExampleState {
    variant: MessageVariantValue;
    fullWidth: boolean;
    dismissible: boolean;
    dismissed: boolean;
    errorCount: "one" | "three";
    isSubmitted: boolean;
    isValid: boolean;
    messagePreset: "default" | "custom";
}

const defaultMessageExampleState: MessageExampleState = {
    variant: "info",
    fullWidth: false,
    dismissible: false,
    dismissed: false,
    errorCount: "three",
    isSubmitted: true,
    isValid: false,
    messagePreset: "default",
};

const MESSAGE_ICON_GLYPHS: Record<MessageVariantValue, string> = {
    info: "",
    error: "",
    success: "",
    warning: "",
};

const MESSAGE_BODY_TEXT: Record<MessageVariantValue, string> = {
    info: "Dokumentasjonen for dette mønsteret er oppdatert med nye referanser og lokale notater.",
    error: "Vi mangler fortsatt prop-dekning for én eksport, så publisering bør vente til docs og kontrakt matcher.",
    success: "Alle lokale docs, kontrakter og byggsteg er oppdatert for denne komponenten.",
    warning: "Denne varianten brukes ofte til viktig informasjon som bør leses før brukeren går videre.",
};

export const MESSAGE_INTERACTIVE_EXAMPLE_RENDERER_ID = "jokul/message";

function getMessageExampleState(
    values: DesignSystemInteractiveExampleValues,
): MessageExampleState {
    return {
        variant: String(values.variant ?? defaultMessageExampleState.variant) as MessageVariantValue,
        fullWidth: values.fullWidth === true,
        dismissible: values.dismissible === true,
        dismissed: values.dismissed === true,
        errorCount: String(values.errorCount ?? defaultMessageExampleState.errorCount) as "one" | "three",
        isSubmitted: values.isSubmitted !== false,
        isValid: values.isValid === true,
        messagePreset: String(
            values.messagePreset ?? defaultMessageExampleState.messagePreset,
        ) as "default" | "custom",
    };
}

function getMessageSummary(state: MessageExampleState): string {
    return [
        `variant="${state.variant}"`,
        `fullWidth=${state.fullWidth ? "true" : "false"}`,
        `dismissAction=${state.dismissible ? "true" : "false"}`,
        `dismissed=${state.dismissed ? "true" : "false"}`,
    ].join(" · ");
}

function renderDismissButtonMarkup(state: MessageExampleState): string {
    if (!state.dismissible) {
        return "";
    }

    return [
        '<button type="button" class="jkl-message__dismiss-button" title="Lukk">',
        '<span class="jkl-icon jkl-icon--bold" aria-hidden="true"></span>',
        '<span class="jkl-sr-only">Lukk</span>',
        "</button>",
    ].join("");
}

function getFormErrorTitle(state: MessageExampleState): string {
    return state.messagePreset === "custom"
        ? "Før publisering må disse feilene rettes"
        : "Feil og mangler i skjemaet";
}

function getFormErrors(state: MessageExampleState): string[] {
    if (state.errorCount === "one") {
        return [
            "Beskrivelsen mangler.",
        ];
    }

    return [
        "Beskrivelsen mangler.",
        "Minst ett skjermbilde må lastes opp.",
        "Velg ansvarlig team før publisering.",
    ];
}

function renderMessagePreviewMarkup(state: MessageExampleState): string {
    const className = [
        "jkl-message",
        `jkl-message--${state.variant}`,
        state.fullWidth ? "jkl-message--full" : "",
        state.dismissed ? "jkl-message--dismissed" : "",
    ].filter(Boolean).join(" ");
    const shouldShowFormError = state.isSubmitted && !state.isValid;

    return [
        '<div class="jkl">',
        "<section>",
        "<h4>Message</h4>",
        `<p><small>${getMessageSummary(state)}</small></p>`,
        `<div class="${className}">`,
        `<span class="jkl-message__icon jkl-icon jkl-icon--bold jkl-icon--filled" aria-hidden="true">${MESSAGE_ICON_GLYPHS[state.variant]}</span>`,
        '<div class="jkl-message__content" data-theme="light">',
        `<div class="jkl-message__message"><p>${MESSAGE_BODY_TEXT[state.variant]}</p></div>`,
        "</div>",
        renderDismissButtonMarkup(state),
        "</div>",
        "</section>",
        "<section>",
        "<h4>FormErrorMessage</h4>",
        `<p><small>errors=${state.errorCount} · isSubmitted=${state.isSubmitted ? "true" : "false"} · isValid=${state.isValid ? "true" : "false"} · messageProps=${state.messagePreset}</small></p>`,
        shouldShowFormError
            ? [
                '<div class="jkl-form-error-message">',
                '<div class="jkl-message jkl-message--error">',
                '<span class="jkl-message__icon jkl-icon jkl-icon--bold jkl-icon--filled" aria-hidden="true"></span>',
                '<div class="jkl-message__content" data-theme="light">',
                `<p class="jkl-message__title">${getFormErrorTitle(state)}</p>`,
                '<div class="jkl-message__message">',
                '<ul class="jkl-list">',
                ...getFormErrors(state).map((error) => `<li class="jkl-list__item">${error}</li>`),
                "</ul>",
                "</div>",
                "</div>",
                "</div>",
                "</div>",
            ].join("")
            : "<p>Ingen feiloppsummering vises før skjemaet er sendt inn og ugyldig.</p>",
        "</section>",
        "</div>",
    ].join("");
}

function renderMessageReactCode(state: MessageExampleState): string {
    const variantCode = state.variant !== "info"
        ? `\n            variant="${state.variant}"`
        : "";
    const fullWidthCode = state.fullWidth ? "\n            fullWidth" : "";
    const dismissCode = state.dismissible
        ? "\n            dismissAction={{ handleDismiss: () => undefined, buttonTitle: \"Lukk\" }}"
        : "";
    const dismissedCode = state.dismissed ? "\n            dismissed" : "";

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/icon/icon.min.css";
import "@fremtind/jokul/styles/fonts/webfonts.min.css";
import "@fremtind/jokul/styles/components/message/message.min.css";
import { Message } from "@fremtind/jokul/message";

export function Example() {
    return (
        <Message${variantCode}${fullWidthCode}${dismissCode}${dismissedCode}>
            ${MESSAGE_BODY_TEXT[state.variant]}
        </Message>
    );
}`;
}

function renderFormErrorMessageReactCode(state: MessageExampleState): string {
    const errorsCode = getFormErrors(state).map((error) => `"${error}"`).join(",\n                ");
    const messagePropsCode = state.messagePreset === "custom"
        ? '\n            messageProps={{ title: "Før publisering må disse feilene rettes" }}'
        : "";
    const isSubmittedCode = state.isSubmitted ? "\n            isSubmitted" : "";
    const isValidCode = state.isValid ? "\n            isValid" : "";

    return `import "@fremtind/jokul/styles/core/core.css";
import "@fremtind/jokul/styles/components/icon/icon.min.css";
import "@fremtind/jokul/styles/fonts/webfonts.min.css";
import "@fremtind/jokul/styles/components/list/list.min.css";
import "@fremtind/jokul/styles/components/message/message.min.css";
import { FormErrorMessage } from "@fremtind/jokul/message";

export function Example() {
    return (
        <FormErrorMessage
            errors={[
                ${errorsCode}
            ]}${isSubmittedCode}${isValidCode}${messagePropsCode}
        />
    );
}`;
}

function getMessageNotes(state: MessageExampleState): string[] {
    const notes = [
        "Message passer for avgrenset status eller viktig informasjon i flyten, ikke som erstatning for full sidefeedback eller modal blokkering.",
    ];

    if (state.dismissible) {
        notes.push("Avvisbare meldinger bør bare brukes når informasjonen ikke lenger er kritisk etter at brukeren har lest den.");
    }

    if (state.fullWidth) {
        notes.push("Full bredde passer best når meldingen skal forankres mot et helt innholdsområde og ikke bare et lite felt eller panel.");
    }

    if (state.isSubmitted && !state.isValid) {
        notes.push("FormErrorMessage bør supplere feltspesifikke feil, ikke erstatte dem.");
    }

    return notes;
}

export function renderMessageInteractiveExample(
    values: DesignSystemInteractiveExampleValues,
): CreateInteractiveExampleStateResult {
    const state = getMessageExampleState(values);

    return {
        previewHtml: renderMessagePreviewMarkup(state),
        codeExamples: [
            {
                label: "React",
                language: "tsx",
                code: renderMessageReactCode(state),
            },
            {
                label: "FormErrorMessage",
                language: "tsx",
                code: renderFormErrorMessageReactCode(state),
            },
        ],
        notes: getMessageNotes(state),
    };
}

export const messagePlayground = createInteractiveExample(
    MESSAGE_INTERACTIVE_EXAMPLE_RENDERER_ID,
    messageInteractiveControls,
    renderMessageInteractiveExample,
);
