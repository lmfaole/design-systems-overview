import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import {
    LoaderStatusExample,
    ProgressBarExample,
    ProgressWithoutContextExample,
} from "./examples";

const post: PatternPost = {
    id: 5,
    title: "Fremdrift ved lange prosesser",
    category: "tilbakemelding",
    goals: "Gi brukeren tydelig status når noe tar tid.",
    avoid: [
        {
            title: "Fremdrift uten forklaring",
            description: "Vis alltid hva statusen betyr, ikke bare en bar.",
            code: `
import { ProgressBar } from "@fremtind/jokul/progress-bar";

<ProgressBar aria-valuenow={60} />
`,
            Example: ProgressWithoutContextExample,
        },
    ],
    examples: [
        {
            title: "Kortvarig lastetilstand",
            description: "Bruk loader med tekst når noe tar kort tid.",
            code: `
import { Loader } from "@fremtind/jokul/loader";

<Loader variant="small" textDescription="Laster søkeforslag" />
`,
            Example: LoaderStatusExample,
        },
        {
            title: "Fremdriftsindikator",
            description: "Vis fremdrift når du kjenner til prosent.",
            code: `
import { ProgressBar } from "@fremtind/jokul/progress-bar";

<ProgressBar aria-valuenow={40} aria-valuetext="Fremdrift 40%" />
`,
            Example: ProgressBarExample,
        },
    ],
    accessibility: {
        title: "Informer om status uten å stjele fokus",
        description:
            "Brukere må få vite at en prosess pågår og når den er ferdig, uten at fokus flyttes. Lastetekst må være tydelig og forståelig, og fremdrift må uttrykkes med både visuelle og programmatisk lesbare signaler.",
        ariaRoles: [
            <>
                Progressbar bør oppgi <code>aria-valuenow</code> og en forståelig{" "}
                <code>aria-valuetext</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuenow"
                    external
                >
                    Les mer om aria-valuenow
                </Link>
                .
            </>,
            <>
                Statusmeldinger bør annonseres uten å flytte fokus, gjerne via{" "}
                <code>aria-live</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live"
                    external
                >
                    Les mer om aria-live
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "4.1.3",
                title: "Status Messages",
                level: "AA",
                relevance: "Brukere som ikke ser skjermen må få status om lasting og ferdig.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html",
            },
            {
                id: "1.3.1",
                title: "Info and Relationships",
                level: "A",
                relevance: "Fremdrift må formidles på en strukturert og forståelig måte.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
            },
        ],
        avoid: [
            "Ikke vis en spinner uten tekst som forklarer hva som skjer.",
            "Unngå å nullstille fremdrift uten å forklare hvorfor.",
            "Ikke flytt fokus til statusmeldinger mens brukeren fyller ut.",
        ],
        testing: [
            "Skjermleser: verifiser at status annonseres uten fokusflytting.",
            "Tastatur: kontroller at fokus blir der brukeren forventer.",
        ],
    },
    resources: [
        {
            title: "Progressbar Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Anbefalinger for progressbar-oppførsel og ARIA.",
        },
        {
            title: "Status Messages",
            href: "https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "WCAG-krav til statusmeldinger uten fokusflytting.",
        },
        {
            title: "aria-valuenow",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuenow",
            publisher: "MDN",
            relevance: 4,
            description: "Hvordan uttrykke fremdrift programmatisk.",
        },
    ],
    components: ["loader", "progress-bar"],
};

export default post;
