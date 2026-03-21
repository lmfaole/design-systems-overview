import type {ComponentDoc} from "../types";
import {props} from "./props";
import {CookieConsentPreview} from "./preview";

const doc: ComponentDoc = {
    id: "cookie-consent",
    name: "Cookie Consent",
    package: "@fremtind/jokul/cookie-consent",
    category: "Overlegg",
    status: "stable",
    complexity: {
        use: "hard",
        maintenance: "medium",
        notes: {
            use: "Krever bevisst håndtering av lagret samtykke, blokkerende visning og når dialogen skal åpnes.",
            maintenance: "Bygger på modal-adferd, cookie-lagring og en provider som må holdes i synk med samtykkekravene.",
        },
    },
    description: {
        short: "Samtykkedialog for valgfrie informasjonskapsler.",
        long: "CookieConsent viser en modal for samtykke til valgfrie informasjonskapsler. Komponenten må brukes sammen med CookieConsentProvider fra samme pakke, og åpnes enten automatisk når samtykke mangler eller manuelt via useCookieConsent().",
    },
    relationships: {
        related: [
            {
                id: "modal",
                description: "CookieConsent vises som en modal og følger de samme kravene til fokusstyring og tydelige valg."
            },
            {
                id: "toast",
                description: "Bruk Toast for kortvarig tilbakemelding etter en handling; CookieConsent brukes kun for samtykke som må lagres."
            },
        ],
    },
    preview: <CookieConsentPreview/>,
    props,
};

export default doc;
