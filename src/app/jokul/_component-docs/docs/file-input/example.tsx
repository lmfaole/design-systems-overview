"use client";
import { useState } from "react";
import { FileInput, type UploadedFile } from "@fremtind/jokul/file-input";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

const variants = ["flexible", "small"] as const;
type Variant = (typeof variants)[number];

export function FileInputExample(props: ComponentExampleProps) {
    const legend = typeof props.legend === "string" && props.legend.trim() !== "" ? props.legend : "Last opp dokumenter";
    const accept = typeof props.accept === "string" && props.accept.trim() !== "" ? props.accept : undefined;
    const maxSizeBytes = typeof props.maxSizeBytes === "number" ? props.maxSizeBytes : undefined;
    const multiple = typeof props.multiple === "boolean" ? props.multiple : undefined;
    const variant = typeof props.variant === "string" && variants.includes(props.variant as Variant)
        ? (props.variant as Variant)
        : undefined;
    const helpLabel = typeof props.helpLabel === "string" && props.helpLabel.trim() !== "" ? props.helpLabel : undefined;
    const errorLabel = typeof props.errorLabel === "string" && props.errorLabel.trim() !== "" ? props.errorLabel : undefined;
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
        <Flex direction="column" gap="s">
            <div style={{ maxWidth: "28rem", width: "100%" }}>
                <FileInput
                    legend={legend}
                    value={files}
                    onChange={(_, nextFiles) => setFiles(nextFiles)}
                    accept={accept}
                    maxSizeBytes={maxSizeBytes}
                    multiple={multiple}
                    variant={variant}
                    helpLabel={errorLabel ? undefined : helpLabel}
                    errorLabel={errorLabel}
                />
            </div>
        </Flex>
    );
}
