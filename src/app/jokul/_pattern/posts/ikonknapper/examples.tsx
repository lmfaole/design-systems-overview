"use client";

import { useState } from "react";
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";
import { ScreenReaderOnly } from "@fremtind/jokul/screen-reader-only";

export function IconOnlyAriaLabelExample() {
    return <Button variant="ghost" icon={<Icon>close</Icon>} aria-label="Lukk" />;
}

export function IconOnlyScreenReaderOnlyExample() {
    return (
        <Button variant="ghost" icon={<Icon>settings</Icon>}>
            <ScreenReaderOnly>Innstillinger</ScreenReaderOnly>
        </Button>
    );
}

export function IconTextExample() {
    return (
        <Button variant="secondary" icon={<Icon>arrow_forward</Icon>} iconPosition="right">
            Neste
        </Button>
    );
}

export function ToggleFavoriteExample() {
    const [pressed, setPressed] = useState(false);

    return (
        <Button
            variant="ghost"
            icon={<Icon filled={pressed}>favorite</Icon>}
            aria-pressed={pressed}
            aria-label={pressed ? "Fjern favoritt" : "Marker som favoritt"}
            onClick={() => setPressed((p) => !p)}
        />
    );
}

export function GenericLabelIconButtonExample() {
    return <Button variant="ghost" icon={<Icon>close</Icon>} aria-label="Klikk" />;
}
