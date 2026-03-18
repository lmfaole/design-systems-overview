import type { PropDef } from "../types";

export const props: PropDef[] = [
    { name: "as", type: "React.ElementType", required: false, default: '"a"', source: "custom", status: "stable", description: "Elementtype å rendre som. Bruk f.eks. Link fra Next.js for klientnavigasjon." },
    { name: "aria-selected", type: "boolean", required: false, source: "aria", status: "stable", description: "Markerer denne fanen som aktiv. Styrer også tabIndex — aktiv fane er i tabsekvensen, inaktive er ikke." },
    { name: "onBeforeKeyboardNavigation", type: "(from: HTMLAnchorElement, to: HTMLAnchorElement) => boolean | undefined", required: false, source: "custom", status: "stable", description: "Kalles før piltastnavigasjon mellom faner. Returner false for å stoppe standard oppførsel og håndtere fokus/navigasjon selv." },
    { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Tekst eller innhold i fanen." },
    { name: "href", type: "string", required: false, source: "native", status: "stable", description: "URL fanen lenker til. Brukes av standard a-elementet." },
];

export const navTabsProps: PropDef[] = [
    { name: "aria-label", type: "string", required: false, source: "aria", status: "stable", description: "Tilgjengelig navn på tablist-rollen. Påkrevd dersom det ikke finnes en synlig ledetekst i nærheten." },
    { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "NavTab-elementer." },
];
