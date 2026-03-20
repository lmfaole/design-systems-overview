import type {PropDef} from "./types";

export const labelProps: PropDef[] = [
    {
        name: "id",
        type: "string",
        required: false,
        source: "native",
        status: "stable",
        description: "En unik ID for labelen.",
    },
    {
        name: "variant",
        type: '"small" | "medium" | "large"',
        required: false,
        source: "custom",
        status: "stable",
        description: "Bestemmer størrelsen på labelen.",
    },
    {
        name: "srOnly",
        type: "boolean",
        required: false,
        source: "custom",
        status: "stable",
        description: "Gjør labelen kun synlig for skjermlesere.",
    },
    {
        name: "standAlone",
        type: "boolean",
        required: false,
        source: "custom",
        status: "stable",
        description: "Brukes når labelen ikke er knyttet til et inputfelt.",
    },
    {
        name: "htmlFor",
        type: "string",
        required: false,
        source: "native",
        status: "stable",
        description: "ID-en til feltet labelen tilhører.",
    },
];

export const supportLabelProps: PropDef[] = [
    {
        name: "id",
        type: "string",
        required: true,
        source: "native",
        status: "stable",
        description: "En unik ID for supportlabelen, brukt til aria-describedby.",
    },
    {
        name: "label",
        type: "React.ReactNode",
        required: false,
        source: "custom",
        status: "stable",
        description: "Tekstinnholdet i supportlabelen.",
    },
    {
        name: "labelType",
        type: '"help" | "error" | "warning" | "success"',
        required: false,
        source: "custom",
        status: "stable",
        default: '"help"',
        description: "Bestemmer hvilket ikon som vises ved siden av teksten.",
    },
    {
        name: "srOnly",
        type: "boolean",
        required: false,
        source: "custom",
        status: "stable",
        description: "Gjør supportlabelen kun synlig for skjermlesere.",
    },
];

export const fieldGroupProps: PropDef[] = [
    {
        name: "legend",
        type: "string",
        required: true,
        source: "custom",
        status: "stable",
        description: "Teksten som vises som overskrift for gruppen.",
    },
    {
        name: "labelProps",
        type: 'Omit<LabelProps, "children">',
        required: false,
        source: "custom",
        status: "stable",
        description: "Egenskaper for legend-elementet (behandlet som en label).",
    },
    {
        name: "supportLabelProps",
        type: 'Omit<SupportLabelProps, "id" | "errorLabel" | "helpLabel">',
        required: false,
        source: "custom",
        status: "stable",
        description: "Egenskaper for supportlabelen knyttet til gruppen.",
    },
    {
        name: "tooltip",
        type: "React.ReactNode",
        required: false,
        source: "custom",
        status: "stable",
        description: "Tooltip vist ved siden av overskriften.",
    },
    {
        name: "description",
        type: "string",
        required: false,
        source: "custom",
        status: "stable",
        description: "Ekstra beskrivelsestekst under overskriften.",
    },
];

const hoverOptions: PropDef[] = [
    {name: "enabled", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Aktiverer hele hover-oppsettet (event listeners + effekter)."},
    {name: "handleClose", type: "HandleClose | null", required: false, source: "custom", status: "stable", default: "null", description: "Egendefinert logikk for når popoveren skal lukkes etter mousemove (Floating UI)."},
    {name: "restMs", type: "number | () => number", required: false, source: "custom", status: "stable", default: "0", description: "Ventetid før hover åpner/lukker til kursoren har «hvilt».",
    },
    {name: "delay", type: "number | { open: number; close: number } | (() => Delay)", required: false, source: "custom", status: "stable", default: "0", description: "Forsinkelse før åpen/lukk ved hover. Kan spesifiseres per retning."},
    {name: "mouseOnly", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Ignorerer touch input når true."},
    {name: "move", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Om flytende elementet åpnes når musen beveger seg over innholdet selv uten hover på trigger."},
];

const focusOptions: PropDef[] = [
    {name: "enabled", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Aktiverer fokus-håndtering."},
    {name: "visibleOnly", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Bare åpne/lukke når fokus er «focus-visible»."},
];

const clickOptions: PropDef[] = [
    {name: "enabled", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Aktiverer click-handlere. Må settes til true for asChild-trigger med Button/Link."},
    {name: "event", type: '"click" | "mousedown"', required: false, source: "custom", status: "stable", default: '"click"', description: "Hvilket mouse-event som tolkes som klikk."},
    {name: "toggle", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Om nytt klikk skal lukke når åpen."},
    {name: "ignoreMouse", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Ignorerer mus (nyttig når hover også brukes)."},
    {name: "keyboardHandlers", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Legger til Enter/Space for ikke-button elementer."},
    {name: "stickIfOpen", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Behold åpen hvis allerede åpnet av annen interaksjon (f.eks. hover)."},
];

const dismissOptions: PropDef[] = [
    {name: "enabled", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Aktiverer alle dismiss-handlere."},
    {name: "escapeKey", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Lukk på Escape."},
    {name: "referencePress", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Lukk når trigger trykkes."},
    {name: "referencePressEvent", type: '"pointerdown" | "mousedown" | "click"', required: false, source: "custom", status: "stable", default: '"pointerdown"', description: "Hvilket event som utløser referencePress."},
    {name: "outsidePress", type: "boolean | (event: MouseEvent) => boolean", required: false, source: "custom", status: "stable", default: "true", description: "Lukk ved klikk utenfor, eller egendefinert filter."},
    {name: "outsidePressEvent", type: '"pointerdown" | "mousedown" | "click"', required: false, source: "custom", status: "stable", default: '"pointerdown"', description: "Event-type for outsidePress."},
    {name: "ancestorScroll", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Lukk ved scroll på forfedre."},
    {name: "bubbles", type: "boolean | { escapeKey?: boolean; outsidePress?: boolean }", required: false, source: "custom", status: "stable", description: "Styrer om hendelser bobler gjennom Floating UI-treet."},
];

const roleOptions: PropDef[] = [
    {name: "enabled", type: "boolean", required: false, source: "custom", status: "stable", default: "true", description: "Aktiverer role-handlere."},
    {name: "role", type: "AriaRole", required: false, source: "aria", status: "stable", default: '"dialog"', description: "ARIA-rolle for popoverinnholdet."},
];

const toastActionProps: PropDef[] = [
    {name: "label", type: "string", required: true, source: "custom", status: "stable", description: "Tekst pa handlingen i toasten."},
    {name: "onClick", type: "() => void", required: true, source: "custom", status: "stable", description: "Kalles nar brukeren trykker pa handlingen."},
];

const toastOptions: PropDef[] = [
    {name: "variant", type: '"info" | "success" | "warning" | "error"', required: false, source: "custom", status: "stable", description: "Visuell variant som signaliserer status."},
    {name: "timeout", type: 'number | null | "off"', required: false, source: "custom", status: "stable", description: "Hvor lenge toasten vises. Bruk \"off\" for a skru av auto-lukk."},
    {name: "action", type: "ToastActionProps", required: false, source: "custom", status: "stable", description: "Valgfri handling med label og onClick."},
];

const dismissActionProps: PropDef[] = [
    {name: "handleDismiss", type: "() => void", required: true, source: "custom", status: "stable", description: "Kalles nar meldingen avvises."},
    {name: "buttonTitle", type: "string", required: false, source: "custom", status: "stable", description: "Tekst for lukkeknappen."},
];

const messageProps: PropDef[] = [
    {name: "title", type: "string", required: false, source: "custom", status: "stable", description: "Valgfri overskrift i meldingen."},
    {name: "variant", type: '"info" | "success" | "warning" | "error"', required: false, source: "custom", status: "stable", default: '"info"', description: "Visuell variant som signaliserer alvorlighetsgrad."},
    {name: "fullWidth", type: "boolean", required: false, source: "custom", status: "stable", default: "false", description: "Strekker meldingen til full bredde."},
    {name: "dismissed", type: "boolean", required: false, source: "custom", status: "stable", description: "Kontrollert tilstand for om meldingen er lukket."},
    {name: "dismissAction", type: "DismissActionProps", required: false, source: "custom", status: "stable", description: "Aktiverer lukkeknapp og gir callback for avvisning."},
    {name: "className", type: "string", required: false, source: "native", status: "stable", description: "Ekstra CSS-klasser pa wrapper-elementet."},
    {name: "id", type: "string", required: false, source: "native", status: "stable", description: "ID pa wrapper-elementet."},
];

export const commonProps: Record<string, PropDef[]> = {
    LabelProps: labelProps,
    SupportLabelProps: supportLabelProps,
    FieldGroupProps: fieldGroupProps,
    HoverOptions: hoverOptions,
    FocusOptions: focusOptions,
    ClickOptions: clickOptions,
    DismissOptions: dismissOptions,
    RoleOptions: roleOptions,
    ToastOptions: toastOptions,
    ToastActionProps: toastActionProps,
    MessageProps: messageProps,
    DismissActionProps: dismissActionProps,
};
