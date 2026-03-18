import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "children", type: "React.ReactNode", required: true, source: "react", status: "stable", description: "Tekstinnholdet i knappen." },
        { name: "variant", type: '"primary" | "secondary" | "ghost" | "tertiary"', required: false, source: "react", status: "stable", default: '"secondary"', description: "Visuell prioritet." },
        { name: "icon", type: "React.ReactElement", required: false, source: "custom", status: "stable", description: "Ikon som vises ved siden av teksten. Bruk <Icon>-komponenten." },
        { name: "iconPosition", type: '"left" | "right"', required: false, source: "custom", status: "stable", default: '"left"', description: "Plasseringen av ikonet relativt til teksten." },
        { name: "loader", type: "{ showLoader: boolean, textDescription: string }", required: false, source: "custom", status: "stable", description: "Viser lasteindikator i knappen." },
        { name: "disabled", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Deaktiverer knappen." },
        { name: "type", type: '"button" | "submit" | "reset"', required: false, source: "native", status: "stable", default: '"button"', description: "HTML-type-attributtet." },
        { name: "onClick", type: "React.MouseEventHandler<HTMLButtonElement>", required: false, source: "react", status: "stable", description: "Klikk-handler." },
        { name: "iconLeft", type: "React.ReactElement", required: false, source: "custom", status: "deprecated", statusDescription: "Bruk icon-propen i stedet. iconLeft er fjernet fra Jøkul til fordel for den nye icon-propen.", description: "Ikon som vises til venstre for teksten." },
        { name: "iconRight", type: "React.ReactElement", required: false, source: "custom", status: "deprecated", statusDescription: "Bruk icon-propen med iconPosition=\"right\" i stedet. iconRight er fjernet fra Jøkul til fordel for den nye icon-propen.", description: "Ikon som vises til høyre for teksten." },
    ];
