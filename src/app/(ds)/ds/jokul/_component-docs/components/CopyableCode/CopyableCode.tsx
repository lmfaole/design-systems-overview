"use client";

import React, {useCallback, useState} from "react";
import {Button} from "@fremtind/jokul/button";
import {CheckIcon, CopyIcon} from "@fremtind/jokul/icon";

interface CopyableCodeProps {
    children: string;
    className?: string;
}

export function CopyableCode({children, className}: CopyableCodeProps) {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(() => {
        navigator.clipboard.writeText(children).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [children]);

    return (
        <Button
            type="button"
            variant="ghost"
            data-size="small"
            className={className}
            onClick={copy}
            aria-label={`Kopier ${children}`}
            title={copied ? "Kopiert!" : "Klikk for å kopiere"}
            icon={copied ? <CheckIcon/> : <CopyIcon/>}
            iconPosition="right"
        >
            <code style={{fontFamily: 'ui-monospace, "SFMono-Regular", "SF Mono", Menlo, monospace'}}>
                {children}
            </code>
        </Button>
    );
}
