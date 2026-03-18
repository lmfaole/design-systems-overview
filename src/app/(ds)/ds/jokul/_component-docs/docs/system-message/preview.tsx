"use client";
import { SystemMessage } from "@fremtind/jokul/system-message";

export function SystemMessagePreview() {
    return (
        <div style={{ maxWidth: "22rem", width: "100%" }}>
            <SystemMessage variant="info">Planlagt vedlikehold lørdag kl. 02–04.</SystemMessage>
        </div>
    );
}
