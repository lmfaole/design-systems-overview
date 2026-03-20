import type { PropDef } from "../types";

export const props: PropDef[] = [
        { name: "label", type: "string", required: false, source: "custom", status: "stable", default: '"Søk"', description: "Tilgjengelig label." },
        { name: "labelProps", type: 'Omit<LabelProps, "children">', required: false, source: "custom", status: "stable", description: 'Egenskaper for label-elementet. Sett srOnly: false for å vise labelen visuelt — den er skjult for seende brukere som standard.' },
        { name: "supportLabelProps", type: 'Omit<SupportLabelProps, "id" | "errorLabel" | "helpLabel">', required: false, source: "custom", status: "stable", description: "Egenskaper for supportlabelen som vises under feltet." },
        { name: "placeholder", type: "string", required: false, source: "native", status: "stable", description: "Plassholdertekst." },
        { name: "icon", type: '"search" | "filter_alt" | "filter_list"', required: false, source: "custom", status: "stable", default: '"search"', description: "Velg hvilket ikon som vises i feltet." },
        { name: "helpLabel", type: "string", required: false, source: "custom", status: "stable", description: "Hjelpetekst under feltet." },
        { name: "errorLabel", type: "string", required: false, source: "custom", status: "stable", description: "Feilmelding som vises under feltet." },
        { name: "description", type: "string", required: false, source: "custom", status: "stable", description: "Kort beskrivelse som vises mellom label og inputfeltet." },
        { name: "disabled", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Deaktiverer feltet." },
        { name: "readOnly", type: "boolean", required: false, source: "native", status: "stable", default: "false", description: "Gjør feltet skrivebeskyttet." },
        { name: "onChange", type: "React.ChangeEventHandler<HTMLInputElement>", required: false, source: "react", status: "stable", description: "Kalles ved endring." },
        { name: "value", type: "string", required: false, source: "native", status: "stable", description: "Kontrollert verdi." },
    ];
