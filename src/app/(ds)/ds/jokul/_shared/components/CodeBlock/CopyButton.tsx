"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";

type CopyButtonProps = {
    code: string;
} & Omit<ButtonProps<"button">, "onClick" | "children" | "icon" | "iconPosition">;

export function CopyButton({ code, ...buttonProps }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            variant="ghost"
            onClick={handleCopy}
            icon={<Icon>{copied ? "check" : "content_copy"}</Icon>}
            iconPosition="right"
            aria-label={copied ? "Kode kopiert" : "Kopier kode"}
            {...buttonProps}
        />
    );
}
