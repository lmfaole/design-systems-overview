import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "src", type: "string", required: true, source: "native", status: "stable", description: "URL til bildet." },
        { name: "alt", type: "string", required: true, source: "native", status: "stable", description: "Alternativ tekst. Bruk tom streng for dekorative bilder." },
        { name: "srcSet", type: "string", required: false, source: "native", status: "stable", description: "Responsivt srcset-attributt for ulike skjermoppløsninger." },
        { name: "placeholder", type: "string", required: false, source: "custom", status: "stable", description: "URL til et lavoppløselig plassholdbilde som vises under innlasting." },
        { name: "className", type: "string", required: false, source: "react", status: "stable", description: "Ekstra CSS-klasser." },
    ];
