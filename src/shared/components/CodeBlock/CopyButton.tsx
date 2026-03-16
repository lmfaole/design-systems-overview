"use client";

import { useState } from "react";
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";

export function CopyButton({ code }: { code: string }) {
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
        >
            {copied ? "Kopiert" : "Kopier"}
        </Button>
    );
}
