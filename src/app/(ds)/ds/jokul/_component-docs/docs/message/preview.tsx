"use client";
import { Message } from "@fremtind/jokul/message";

export function MessagePreview() {
    return (
        <div style={{ maxWidth: "22rem", width: "100%" }}>
            <Message variant="info">Ny melding tilgjengelig.</Message>
        </div>
    );
}
