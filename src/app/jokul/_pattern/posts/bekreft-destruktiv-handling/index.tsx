import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { ConfirmDeleteExample, DeleteWithoutConfirmExample } from "./examples";

const post: PatternPost = {
    id: 8,
    title: "Bekreft destruktive handlinger",
    category: "handlinger",
    goals: "Hindre at irreversible handlinger skjer ved en feil.",
    avoid: [
        {
            title: "Utfører handlingen uten bekreftelse",
            description: "Destruktive handlinger bør ha et tydelig bekreftelsessteg.",
            code: `
import { useState } from "react";
import { Button } from "@fremtind/jokul/button";

export function DeleteWithoutConfirm() {
    const [deleted, setDeleted] = useState(false);

    return (
        <Button type="button" onClick={() => setDeleted(true)} disabled={deleted}>
            Slett profil
        </Button>
    );
}
`,
            Example: DeleteWithoutConfirmExample,
        },
    ],
    examples: [
        {
            title: "Bekreft i modal",
            description: "La brukeren bekrefte eller avbryte før handlingen skjer.",
            code: `
import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@fremtind/jokul/button";
import {
    Modal,
    ModalActions,
    ModalBody,
    ModalCloseButton,
    ModalContainer,
    ModalHeader,
    ModalOverlay,
    ModalTitle,
    useModal,
} from "@fremtind/jokul/modal";

export function ConfirmDelete() {
    const [deleted, setDeleted] = useState(false);
    const [instance, { title: titleProps, overlay, container, modal, closeButton }] = useModal({
        title: "Bekreft sletting",
    });

    return (
        <>
            <Button type="button" onClick={() => instance?.show()} disabled={deleted}>
                Slett profil
            </Button>
            {createPortal(
                <ModalContainer {...container}>
                    <ModalOverlay {...overlay} />
                    <Modal {...modal}>
                        <ModalHeader>
                            <ModalTitle {...titleProps}>Bekreft sletting</ModalTitle>
                            <ModalCloseButton {...closeButton} />
                        </ModalHeader>
                        <ModalBody>
                            <p>Sletting kan ikke angres.</p>
                        </ModalBody>
                        <ModalActions>
                            <Button type="button" variant="secondary" onClick={() => instance?.hide()}>
                                Avbryt
                            </Button>
                            <Button type="button" variant="primary" onClick={() => setDeleted(true)}>
                                Slett
                            </Button>
                        </ModalActions>
                    </Modal>
                </ModalContainer>,
                document.body,
            )}
        </>
    );
}
`,
            Example: ConfirmDeleteExample,
        },
    ],
    accessibility: {
        title: "Gi brukeren en trygg stoppmulighet",
        description:
            "Destruktive handlinger bør kreve en tydelig bekreftelse. Dialogen må være tydelig merket, fokus må flyttes inn i den, og brukeren må enkelt kunne avbryte.",
        ariaRoles: [
            <>
                Bruk et dialog-mønster med riktig fokusflyt.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" external>
                    Se WAI-ARIA APG: Dialog (Modal)
                </Link>
                .
            </>,
            <>
                For kritiske bekreftelser kan <code>alertdialog</code> være riktig rolle.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/" external>
                    Se WAI-ARIA APG: Alert Dialog
                </Link>
                .
            </>,
            <>
                Bruk konkrete knappetekster (f.eks. “Slett” og “Avbryt”), ikke bare “Ja/Nei”.
            </>,
        ],
        wcag: [
            {
                id: "3.3.4",
                title: "Error Prevention (Legal, Financial, Data)",
                level: "AA",
                relevance:
                    "Destruktive handlinger må kunne bekreftes eller avbrytes før de gjennomføres.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html",
            },
            {
                id: "2.4.3",
                title: "Focus Order",
                level: "A",
                relevance: "Fokus skal flyttes inn i dialogen og tilbake til utløseren etterpå.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html",
            },
            {
                id: "4.1.2",
                title: "Name, Role, Value",
                level: "A",
                relevance: "Dialogen må ha riktig rolle og navn for hjelpemidler.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html",
            },
        ],
        avoid: [
            "Ikke la destruktive handlinger skje umiddelbart uten bekreftelse.",
            "Unngå uklare knappetekster som ikke beskriver konsekvensen.",
            "Ikke la fokus kunne flyttes til innhold bak dialogen.",
        ],
        testing: [
            "Tastatur: åpne dialogen og sjekk at Tab holder fokus inne i dialogen.",
            "Skjermleser: verifiser at dialogen annonseres med riktig tittel.",
            "ESC/Avbryt: verifiser at handlingen kan stoppes uten konsekvens.",
        ],
    },
    resources: [
        {
            title: "Alert and Message Dialogs Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Anbefalt mønster for bekreftelsesdialoger.",
        },
        {
            title: "Dialog (Modal) Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Fokusflyt og ARIA for modale dialoger.",
        },
        {
            title: "ARIA: alertdialog role",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alertdialog_role",
            publisher: "MDN",
            relevance: 4,
            description: "Når alertdialog er riktig rolle for kritiske bekreftelser.",
        },
        {
            title: "Dialogs",
            href: "https://m1.material.io/components/dialogs.html",
            publisher: "Material Design",
            relevance: 3,
            description: "Designråd for bekreftelses- og varslingsdialoger.",
        },
    ],
    components: ["modal", "button"],
};

export default post;
