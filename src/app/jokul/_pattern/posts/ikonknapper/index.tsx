import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import {
    IconOnlyAriaLabelExample,
    IconOnlyScreenReaderOnlyExample,
    IconTextExample,
    GenericLabelIconButtonExample,
    ToggleFavoriteExample,
} from "./examples";

const post: PatternPost = {
    id: 1,
    title: "Ikonknapper",
    category: "handlinger",
    goals: "La brukeren utføre raske handlinger med ikon, med tydelig navn.",
    avoid: [
        {
            title: "Generisk label på ikonknapp",
            description: (
                <>
                    <code>aria-label</code> må beskrive handlingen, ikke bare være “Klikk”.
                </>
            ),
            code: `
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";

<Button variant="ghost" icon={<Icon>close</Icon>} aria-label="Klikk" />
`,
            Example: GenericLabelIconButtonExample,
        },
    ],
    examples: [
        {
            title: "Ikon-only med aria-label",
            description: (
                <>
                    Når knappen ikke har synlig tekst må du gi den et navn, typisk med{" "}
                    <code>aria-label</code>.
                </>
            ),
            code: `
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";

<Button variant="ghost" icon={<Icon>close</Icon>} aria-label="Lukk" />
`,
            Example: IconOnlyAriaLabelExample,
        },
        {
            title: "Ikon-only med skjult tekst",
            description: (
                <>
                    Alternativt kan du legge inn en{" "}
                    <code>&lt;ScreenReaderOnly&gt;</code>-tekst i knappen.
                </>
            ),
            code: `
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";
import { ScreenReaderOnly } from "@fremtind/jokul/screen-reader-only";

<Button variant="ghost" icon={<Icon>settings</Icon>}>
    <ScreenReaderOnly>Innstillinger</ScreenReaderOnly>
</Button>
`,
            Example: IconOnlyScreenReaderOnlyExample,
        },
        {
            title: "Ikon + synlig tekst",
            description: "Synlig tekst gir ofte tilstrekkelig navn uten ekstra ARIA.",
            code: `
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";

<Button variant="secondary" icon={<Icon>arrow_forward</Icon>} iconPosition="right">
    Neste
</Button>
`,
            Example: IconTextExample,
        },
        {
            title: "Toggle med aria-pressed",
            description: (
                <>
                    For toggles bør du bruke <code>aria-pressed</code> for å uttrykke
                    tilstanden.
                </>
            ),
            code: `
import { useState } from "react";
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";

export function ToggleFavorite() {
    const [pressed, setPressed] = useState(false);

    return (
        <Button
            variant="ghost"
            icon={<Icon filled={pressed}>favorite</Icon>}
            aria-pressed={pressed}
            aria-label={pressed ? "Fjern favoritt" : "Marker som favoritt"}
            onClick={() => setPressed((p) => !p)}
        />
    );
}
`,
            Example: ToggleFavoriteExample,
        },
    ],
    accessibility: {
        title: "Gi ikonknapper et tydelig, tilgjengelig navn",
        description:
            "Ikonknapper har ofte ingen synlig tekst. Da er det ekstra viktig at knappen har et programmatisk navn som beskriver handlingen, at fokus er tydelig, og at trykkflaten er stor nok til presis bruk.",
        ariaRoles: [
            <>
                Bruk helst et <code>&lt;button&gt;</code> (innebygd rolle) fremfor{" "}
                <code>role="button"</code> på andre elementer.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/button/" external>
                    Les mer om knappemønsteret i ARIA APG
                </Link>
                .
            </>,
            <>
                Gi knappen et navn med <code>aria-label</code> eller <code>aria-labelledby</code>{" "}
                når den ikke har synlig tekst.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label"
                    external
                >
                    Les mer om aria-label
                </Link>
                .
            </>,
            <>
                Hvis ikonknappen toggler en tilstand (f.eks. favoritt av/på), bruk{" "}
                <code>aria-pressed</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed"
                    external
                >
                    Les mer om aria-pressed
                </Link>
                .
            </>,
            <>
                Hvis ikonknappen åpner/lukker noe, bruk <code>aria-expanded</code> (og evt.{" "}
                <code>aria-controls</code>) for å uttrykke tilstanden.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded"
                    external
                >
                    Les mer om aria-expanded
                </Link>
                .
            </>,
            <>
                Dekorative ikoner inne i knappen bør vanligvis ha <code>aria-hidden</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden"
                    external
                >
                    Les mer om aria-hidden
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "1.1.1",
                title: "Non-text Content",
                level: "A",
                relevance: "Ikon alene er ikke nok; knappen må ha et tekstalternativ (navn).",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html",
            },
            {
                id: "4.1.2",
                title: "Name, Role, Value",
                level: "A",
                relevance: "Skjermlesere må kunne finne riktig navn og rolle (\"knapp\").",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html",
            },
            {
                id: "2.4.7",
                title: "Focus Visible",
                level: "AA",
                relevance: "Tastaturbrukere må se hvor fokus er når de navigerer til knappen.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html",
            },
            {
                id: "2.5.8",
                title: "Target Size (Minimum)",
                level: "AA",
                relevance: "Ikonknapper blir ofte små; krav til trykkflate reduserer feiltrykk.",
                url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
            },
        ],
        avoid: [
            "Bruk en beskrivende aria-label når knappen kun har ikon (ikke stol på ikon alene).",
            "Unngå generiske labels som \"Lukk\" uten kontekst; beskriv handlingen i konteksten den står i.",
            "Ikke bruk bare title-attributtet som eneste tekstalternativ.",
            "Sørg for tydelig fokusmarkering og at knappen kan brukes med tastatur.",
            "Sørg for tilstrekkelig trykkflate (minst 24x24 CSS-piksler, helst større).",
        ],
        testing: [
            "Tastatur: Tab til knappen og verifiser at fokus er synlig.",
            "Skjermleser: Kontroller at knappen leses med riktig navn og rolle (\"knapp\").",
            "Pek: Sjekk at knappen er lett å treffe, og at den ikke ligger for tett på andre kontroller.",
        ],
    },
    resources: [
        {
            title: "Button Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/button/",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Rolle, tastatur og ARIA-praksis for knapper.",
        },
        {
            title: "HTML Standard: The button element",
            href: "https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element",
            publisher: "WHATWG",
            relevance: 3,
            description: "Normativ oppførsel for button-elementet som ikonknapper bygger på.",
        },
        {
            title: "G94: Providing short text alternative for non-text content",
            href: "https://www.w3.org/WAI/WCAG22/Techniques/general/G94.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Teknikk for å gi ikonknapper et tydelig tekstalternativ.",
        },
        {
            title: "CSS UI 4: Outline and focus indicators",
            href: "https://www.w3.org/TR/css-ui-4/#outline",
            publisher: "W3C CSS Working Group",
            relevance: 3,
            description: "Spesifikasjon for focus/outline som påvirker fokusmarkering.",
        },
        {
            title: "Accessible Icon Buttons",
            href: "https://www.sarasoueidan.com/blog/accessible-icon-buttons/",
            publisher: "Sara Soueidan",
            relevance: 5,
            description: "Detaljert gjennomgang av navngivning for ikonknapper.",
        },
        {
            title: "How Can I Make My Icon System Accessible?",
            href: "https://css-tricks.com/can-make-icon-system-accessible/",
            publisher: "CSS-Tricks",
            relevance: 4,
            description: "Praktiske råd for tilgjengelige ikon- og knappesystemer.",
        },
        {
            title: "aria-label",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label",
            publisher: "MDN",
            relevance: 4,
            description: "Når og hvordan bruke aria-label for ikonknapper.",
        },
    ],
    components: ["button", "icon", "screen-reader-only"],
};

export default post;
