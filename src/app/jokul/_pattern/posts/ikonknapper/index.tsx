import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import {
    IconOnlyAriaLabelExample,
    IconOnlyScreenReaderOnlyExample,
    IconTextExample,
    ToggleFavoriteExample,
} from "./examples";

const post: PatternPost = {
    id: 1,
    title: "Ikonknapper",
    goals: "La brukeren utfore raske handlinger med ikon, med tydelig navn.",
    examples: [
        {
            title: "Ikon-only med aria-label",
            description: (
                <>
                    Nar knappen ikke har synlig tekst ma du gi den et navn, typisk med{" "}
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
                    For toggles bor du bruke <code>aria-pressed</code> for a uttrykke
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
                <code>role="button"</code> pa andre elementer.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/button/" external>
                    Les mer om knappemonsteret i ARIA APG
                </Link>
                .
            </>,
            <>
                Gi knappen et navn med <code>aria-label</code> eller <code>aria-labelledby</code>{" "}
                nar den ikke har synlig tekst.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label"
                    external
                >
                    Les mer om aria-label
                </Link>
                .
            </>,
            <>
                Hvis ikonknappen toggler en tilstand (f.eks. favoritt av/pa), bruk{" "}
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
                Hvis ikonknappen apner/lukker noe, bruk <code>aria-expanded</code> (og evt.{" "}
                <code>aria-controls</code>) for a uttrykke tilstanden.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded"
                    external
                >
                    Les mer om aria-expanded
                </Link>
                .
            </>,
            <>
                Dekorative ikoner inne i knappen bor vanligvis ha <code>aria-hidden</code>.{" "}
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
                relevance: "Ikon alene er ikke nok; knappen ma ha et tekstalternativ (navn).",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html",
            },
            {
                id: "4.1.2",
                title: "Name, Role, Value",
                level: "A",
                relevance: "Skjermlesere ma kunne finne riktig navn og rolle (\"knapp\").",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html",
            },
            {
                id: "2.4.7",
                title: "Focus Visible",
                level: "AA",
                relevance: "Tastaturbrukere ma se hvor fokus er nar de navigerer til knappen.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html",
            },
            {
                id: "2.5.8",
                title: "Target Size (Minimum)",
                level: "AA",
                relevance: "Ikonknapper blir ofte sma; krav til trykkflate reduserer feiltrykk.",
                url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
            },
        ],
        avoid: [
            "Bruk en beskrivende aria-label nar knappen kun har ikon (ikke stol pa ikon alene).",
            "Unnga generiske labels som \"Lukk\" uten kontekst; beskriv handlingen i konteksten den staar i.",
            "Ikke bruk bare title-attributtet som eneste tekstalternativ.",
            "Sorg for tydelig fokusmarkering og at knappen kan brukes med tastatur.",
            "Sorg for tilstrekkelig trykkflate (minst 24x24 CSS-piksler, helst storre).",
        ],
        testing: [
            "Tastatur: Tab til knappen og verifiser at fokus er synlig.",
            "Skjermleser: Kontroller at knappen leses med riktig navn og rolle (\"knapp\").",
            "Pek: Sjekk at knappen er lett a treffe, og at den ikke ligger for tett pa andre kontroller.",
        ],
    },
    components: ["button", "icon", "screen-reader-only"],
};

export default post;
