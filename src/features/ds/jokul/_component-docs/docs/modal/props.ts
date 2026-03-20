import type { PropDef } from "../types";

export const props: PropDef[] = [
        {
            name: "title",
            type: "string",
            required: true,
            source: "custom",
            status: "stable",
            description: "Tittel på modalen, sendes til useModal.",
        },
        {
            name: "closeButtonLabel",
            type: "string",
            required: false,
            source: "custom",
            status: "stable",
            default: '"Lukk"',
            description: "Tilgjengelig label for lukkeknappen.",
        },
        {
            name: "role",
            type: '"dialog" | "alertdialog"',
            required: false,
            source: "aria",
            status: "stable",
            default: '"dialog"',
            description:
                "ARIA-rolle. alertdialog forhindrer lukking med Escape eller klikk utenfor.",
        },
        {
            name: "padding",
            type: "string",
            required: false,
            source: "custom",
            status: "stable",
            description: "Padding på Modal-komponenten, f.eks. 'var(--jkl-spacing-l)'.",
        },
    ];
