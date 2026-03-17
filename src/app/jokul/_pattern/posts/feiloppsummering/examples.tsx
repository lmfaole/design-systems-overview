"use client";

import { useState } from "react";
import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";
import { FormErrorMessage } from "@fremtind/jokul/message";
import { TextInput } from "@fremtind/jokul/text-input";

function getErrors(name: string, email: string) {
    const nameError = name ? undefined : "Fornavn mangler.";
    const emailError = email
        ? email.includes("@")
            ? undefined
            : "E-postadressen er ugyldig."
        : "E-post mangler.";

    const errors = [nameError, emailError].filter(Boolean) as string[];
    return { nameError, emailError, errors, isValid: errors.length === 0 };
}

export function ErrorSummaryExample() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { nameError, emailError, errors, isValid } = getErrors(name, email);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
            }}
        >
            <Flex direction="column" gap="s">
                <FormErrorMessage errors={errors} isSubmitted={submitted} isValid={isValid} />

                <TextInput
                    label="Fornavn"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    errorLabel={submitted ? nameError : undefined}
                />
                <TextInput
                    label="E-post"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    errorLabel={submitted ? emailError : undefined}
                />
                <Button type="submit">Send inn</Button>
            </Flex>
        </form>
    );
}

export function NoSummaryExample() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { nameError, emailError } = getErrors(name, email);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
            }}
        >
            <Flex direction="column" gap="s">
                <TextInput
                    label="Fornavn"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    errorLabel={submitted ? nameError : undefined}
                />
                <TextInput
                    label="E-post"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    errorLabel={submitted ? emailError : undefined}
                />
                <Button type="submit">Send inn</Button>
            </Flex>
        </form>
    );
}
