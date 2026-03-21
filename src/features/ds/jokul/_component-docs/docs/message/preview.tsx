import { Message } from "@fremtind/jokul/message";
import type { ComponentExampleProps } from "../types";

export function MessagePreview(props: ComponentExampleProps = {}) {
    const variant = props.variant === "success" || props.variant === "warning" || props.variant === "error"
        ? props.variant
        : "info";
    const title = typeof props.title === "string" && props.title.trim() !== "" ? props.title : undefined;
    const fullWidth = props.fullWidth === true;
    const dismissed = props.dismissed === true;

    return (
        <div style={{ maxWidth: "22rem", width: "100%" }}>
            <Message
                variant={variant}
                title={title}
                fullWidth={fullWidth}
                dismissed={dismissed}
                dismissAction={{ handleDismiss: () => undefined, buttonTitle: "Lukk melding" }}
            >
                Ny melding tilgjengelig.
            </Message>
        </div>
    );
}
