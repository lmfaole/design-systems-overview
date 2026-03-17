import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { ErrorSummaryExample, NoSummaryExample } from "./examples";

const post: PatternPost = {
    id: 9,
    title: "Feiloppsummering i skjema",
    category: "tilbakemelding",
    goals: "Gi brukeren en samlet oversikt over feil etter innsending.",
    avoid: [
        {
            title: "Kun feltfeil, ingen oppsummering",
            description: "Brukere mister oversikten når feil bare vises ved hvert felt.",
            code: `
import { useState } from "react";
import { Button } from "@fremtind/jokul/button";
import { TextInput } from "@fremtind/jokul/text-input";

export function NoSummary() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    return (
        <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <TextInput
                label="Fornavn"
                value={name}
                onChange={(event) => setName(event.target.value)}
                errorLabel={submitted && !name ? "Fornavn mangler." : undefined}
            />
            <Button type="submit">Send inn</Button>
        </form>
    );
}
`,
            Example: NoSummaryExample,
        },
    ],
    examples: [
        {
            title: "Feiloppsummering + feltfeil",
            description: "Kombiner oppsummering på toppen med konkrete feltfeil.",
            code: `
import { useState } from "react";
import { Button } from "@fremtind/jokul/button";
import { FormErrorMessage } from "@fremtind/jokul/message";
import { TextInput } from "@fremtind/jokul/text-input";

export function ErrorSummary() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const errors = [
        !name ? "Fornavn mangler." : undefined,
        !email ? "E-post mangler." : email.includes("@") ? undefined : "E-postadressen er ugyldig.",
    ].filter(Boolean);

    return (
        <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <FormErrorMessage errors={errors} isSubmitted={submitted} isValid={errors.length === 0} />
            <TextInput
                label="Fornavn"
                value={name}
                onChange={(event) => setName(event.target.value)}
                errorLabel={submitted && !name ? "Fornavn mangler." : undefined}
            />
            <TextInput
                label="E-post"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                errorLabel={submitted && !email ? "E-post mangler." : undefined}
            />
            <Button type="submit">Send inn</Button>
        </form>
    );
}
`,
            Example: ErrorSummaryExample,
        },
    ],
    accessibility: {
        title: "Samle feil og gjør dem lette å finne",
        description:
            "Feiloppsummering gir brukeren en rask oversikt over hva som mangler eller er ugyldig. Den bør vises tydelig etter innsending og kombinere oppsummering med konkrete feil ved hvert felt.",
        ariaRoles: [
            <>
                Feiloppsummeringen bør annonseres som statusmelding (f.eks. <code>aria-live</code>).{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live"
                    external
                >
                    Les mer om aria-live
                </Link>
                .
            </>,
            <>
                Marker ugyldige felt med <code>aria-invalid</code> og koble feiltekst via{" "}
                <code>aria-describedby</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid"
                    external
                >
                    Les mer om aria-invalid
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "3.3.1",
                title: "Error Identification",
                level: "A",
                relevance:
                    "Feil må identifiseres tydelig slik at brukeren forstår hva som må fikses.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html",
            },
            {
                id: "3.3.3",
                title: "Error Suggestion",
                level: "AA",
                relevance: "Oppsummering bør gi konkrete hint om hvordan feil rettes.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html",
            },
            {
                id: "4.1.3",
                title: "Status Messages",
                level: "AA",
                relevance:
                    "Feiloppsummeringen må kunne oppdages uten at fokus flyttes manuelt.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html",
            },
        ],
        avoid: [
            "Ikke la feil kun vises ved feltene når skjemaet er langt.",
            "Unngå uklare feilmeldinger som ikke sier hva som må rettes.",
            "Ikke skjul oppsummeringen under fold når skjemaet feiler.",
        ],
        testing: [
            "Skjermleser: verifiser at feiloppsummeringen annonseres etter innsending.",
            "Tastatur: sjekk at brukeren kan navigere til feilfeltene uten å miste kontekst.",
            "Visuelt: kontroller at oppsummeringen er lett å se.",
        ],
    },
    resources: [
        {
            title: "Error summary component",
            href: "https://design-system.service.gov.uk/components/error-summary/",
            publisher: "GOV.UK",
            relevance: 5,
            description: "Velprøvd mønster for feiloppsummering i skjema.",
        },
        {
            title: "Form Validation: Usability and Accessibility",
            href: "https://webaim.org/techniques/formvalidation/",
            publisher: "WebAIM",
            relevance: 4,
            description: "Hvordan feilmeldinger og oppsummering bør presenteres i skjema.",
        },
        {
            title: "Error Identification",
            href: "https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "WCAG-krav til tydelig identifikasjon av feil.",
        },
        {
            title: "Error Suggestion",
            href: "https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html",
            publisher: "W3C/WAI",
            relevance: 3,
            description: "WCAG-krav til forslag om hvordan feil kan rettes.",
        },
    ],
    components: ["form-error-message", "text-input", "button"],
};

export default post;
