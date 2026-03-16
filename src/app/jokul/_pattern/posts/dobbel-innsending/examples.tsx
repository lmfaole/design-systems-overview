"use client";

import { useState } from "react";
import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";

function fakeSave(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 900));
}

export function MultipleSubmitsExample() {
    const [pending, setPending] = useState(0);
    const [saved, setSaved] = useState(0);

    const handleSave = () => {
        setPending((p) => p + 1);
        void fakeSave().then(() => {
            setPending((p) => Math.max(0, p - 1));
            setSaved((s) => s + 1);
        });
    };

    return (
        <div style={{ width: "100%", maxWidth: "20rem" }}>
            <Flex direction="column" gap="xs" alignItems="center">
                <Button onClick={handleSave}>Lagre</Button>
                <small className="muted">
                    Pågående: {pending} · Lagret: {saved}
                </small>
            </Flex>
        </div>
    );
}

export function LockedSubmitExample() {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(0);

    const handleSave = async () => {
        if (saving) return;
        setSaving(true);
        try {
            await fakeSave();
            setSaved((s) => s + 1);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ width: "100%", maxWidth: "20rem" }} aria-busy={saving}>
            <Flex direction="column" gap="xs" alignItems="center">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    loader={{ showLoader: saving, textDescription: "Lagrer" }}
                >
                    Lagre
                </Button>
                <small className="muted">Lagret: {saved}</small>
            </Flex>
        </div>
    );
}
