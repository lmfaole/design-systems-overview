"use client";
import { FileInput } from "@fremtind/jokul/file-input";

export function FileInputPreview() {
    return (
        <div style={{ maxWidth: "20rem", width: "100%" }}>
            <FileInput
                legend="Last opp dokumenter"
                value={[]}
                onChange={() => undefined}
            />
        </div>
    );
}
