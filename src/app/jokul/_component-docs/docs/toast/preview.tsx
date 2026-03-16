"use client";
import { Flex } from "@fremtind/jokul/flex";
import { InfoIcon, SuccessIcon } from "@fremtind/jokul/icon";
import { usePreviewHovered } from "@/app/jokul/_component-docs/components/PreviewHoverContext";

export function ToastPreview() {
    // IMPORTANT: Keep this preview side-effect free.
    // Component cards render previews in lists, so calling `useToast().add` here would
    // spawn real toasts on the component overview page.
    const isHovered = usePreviewHovered();
    const variant = isHovered ? "success" : "info";
    const title = variant === "success" ? "Fullført" : "Info";
    const message =
        variant === "success" ? "Handlingen ble fullført!" : "En kort beskjed til brukeren.";

    const Icon = variant === "success" ? SuccessIcon : InfoIcon;

    return (
        <div className={`jkl-toast jkl-toast--${variant}`} aria-hidden="true">
            <Flex alignItems="start" gap="xs">
                <Icon className="jkl-toast__icon" />
                <Flex direction="column" gap="xs" className="jkl-toast__content">
                    <p className="jkl-toast__title">{title}</p>
                    <p className="jkl-toast__message">{message}</p>
                </Flex>
            </Flex>
        </div>
    );
}
