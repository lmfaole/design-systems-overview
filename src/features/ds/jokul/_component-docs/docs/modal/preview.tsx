import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function ModalPreview(props: ComponentExampleProps = {}) {
    const title = typeof props.title === "string" && props.title.trim() !== "" ? props.title : "Bekreft handling";
    const closeButtonLabel =
        typeof props.closeButtonLabel === "string" && props.closeButtonLabel.trim() !== ""
            ? props.closeButtonLabel
            : "Lukk";
    const role = props.role === "alertdialog" ? "alertdialog" : "dialog";

    return (
        <div style={{ border: "1px solid var(--jkl-color-border-default, #ccc)", borderRadius: 4, padding: "16px", maxWidth: 280, width: "100%" }}>
            <Flex direction="column" gap="s">
                <Flex alignItems="center" justifyContent="space-between" gap="s">
                    <strong>{title}</strong>
                    <Button variant="ghost" aria-label={closeButtonLabel} type="button">×</Button>
                </Flex>
                <p style={{ margin: 0, fontSize: "0.9em" }}>Er du sikker på at du vil fortsette?</p>
                <p style={{ margin: 0, fontSize: "0.8em" }}>Rolle: {role}</p>
                <Flex gap="xs">
                    <Button>Bekreft</Button>
                    <Button variant="secondary">Avbryt</Button>
                </Flex>
            </Flex>
        </div>
    );
}
