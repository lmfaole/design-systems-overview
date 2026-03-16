"use client";
import { FormErrorMessage } from "@fremtind/jokul/message";

const ERRORS = ["Fornavn mangler.", "E-postadressen er ugyldig."];

export function FormErrorMessagePreview() {
    return (
        <div style={{ maxWidth: "22rem", width: "100%" }}>
            <FormErrorMessage errors={ERRORS} isSubmitted={true} isValid={false} />
        </div>
    );
}
