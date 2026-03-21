import {File as JklFile} from "@fremtind/jokul/file";
import type {ComponentExampleProps} from "../types";

export function FilePreview(props: ComponentExampleProps = {}) {
    const fileName = typeof props.fileName === "string" && props.fileName.trim() !== "" ? props.fileName : "kvittering.pdf";
    const fileType = typeof props.fileType === "string" && props.fileType.trim() !== "" ? props.fileType : "application/pdf";
    const fileSize = typeof props.fileSize === "number" ? props.fileSize : 428000;
    const path = typeof props.path === "string" && props.path.trim() !== "" ? props.path : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const state = props.state === "error" ? "error" : "loading";
    const variant = props.variant === "card" ? "card" : "list";

    return (
        <div style={{maxWidth: "22rem", width: "100%"}}>
            <JklFile
                fileName={fileName}
                fileType={fileType}
                fileSize={fileSize}
                path={path}
                errorLabel={errorLabel}
                state={state}
                variant={variant}
            />
        </div>
    );
}
