import type { PropDef } from "../types";

export const props: PropDef[] = [
    {
        name: "add",
        type: "(content: ToastContent, options?: ToastOptions) => string",
        required: true,
        source: "custom",
        status: "stable",
        description:
            "Metode fra useToast(). content kan være en tekststreng eller et objekt med valgfri title og content (ReactNode). options kan sette variant, timeout og action. Returnerer en key (string) som brukes med close().",
    },
    {
        name: "close",
        type: "(key: string) => void",
        required: true,
        source: "custom",
        status: "stable",
        description: "Metode fra useToast(). Lukker en toast ved key-en som ble returnert fra add().",
    },
];
