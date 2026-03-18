import type { ComponentDoc } from "../types";
import { props } from "./props";
import { ToastProviderPreview } from "./preview";

const doc: ComponentDoc = {
    id: "toast-provider",
    name: "ToastProvider",
    package: "@fremtind/jokul/toast",
    category: "Overlegg",
    status: "stable",
    complexity: { use: "medium", maintenance: "medium" },
    showOnOverview: false,
    description: {
        short: "Kontekstleverandør for toast-meldinger i applikasjonen.",
        long: "Gir kontekst og container for toasts i appen. Må omslutte komponenttreet der useToast() brukes, og lar deg styre visning og begrensninger som plassering og maks synlige toasts.",
    },
    relationships: {
        related: [
            { id: "toast", description: "Hook-baserte metoder (useToast) for å vise og lukke toasts." },
        ],
    },
    preview: <ToastProviderPreview />,
    props,
};

export default doc;
