import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import {
    BreadcrumbAllLinksExample,
    BreadcrumbCurrentLinkExample,
    BreadcrumbWithCurrentExample,
} from "./examples";

const post: PatternPost = {
    id: 7,
    title: "Brødsmuler",
    category: "navigasjon",
    goals: "Gi brukeren oversikt over hvor de er, og en enkel vei tilbake.",
    avoid: [
        {
            title: "Nåværende side er lenke uten aria-current",
            description: (
                <>
                    Når siste ledd ikke markeres med <code>aria-current</code>, mister
                    skjermlesere kontekst.
                </>
            ),
            code: `
import { Breadcrumb, BreadcrumbItem } from "@fremtind/jokul/breadcrumb";
import { Link } from "@fremtind/jokul/link";

<Breadcrumb>
    <BreadcrumbItem><Link href="#">Hjem</Link></BreadcrumbItem>
    <BreadcrumbItem><Link href="#">Forsikringer</Link></BreadcrumbItem>
    <BreadcrumbItem><Link href="#">Skademelding</Link></BreadcrumbItem>
</Breadcrumb>
`,
            Example: BreadcrumbAllLinksExample,
        },
    ],
    examples: [
        {
            title: "Lenker + nåværende side",
            description: "Lenker tilbake i hierarkiet, og tekst for aktiv side.",
            code: `
import { Breadcrumb, BreadcrumbItem } from "@fremtind/jokul/breadcrumb";
import { Link } from "@fremtind/jokul/link";

<Breadcrumb>
    <BreadcrumbItem><Link href="#">Hjem</Link></BreadcrumbItem>
    <BreadcrumbItem><Link href="#">Forsikringer</Link></BreadcrumbItem>
    <BreadcrumbItem aria-current="page"><span>Skademelding</span></BreadcrumbItem>
</Breadcrumb>
`,
            Example: BreadcrumbWithCurrentExample,
        },
        {
            title: "Nåværende side som lenke",
            description: (
                <>
                    Hvis siste ledd må være lenke, bruk <code>aria-current="page"</code>.
                </>
            ),
            code: `
import { Breadcrumb, BreadcrumbItem } from "@fremtind/jokul/breadcrumb";
import { Link } from "@fremtind/jokul/link";

<Breadcrumb>
    <BreadcrumbItem><Link href="#">Hjem</Link></BreadcrumbItem>
    <BreadcrumbItem aria-current="page">
        <Link href="#">Mønstre</Link>
    </BreadcrumbItem>
</Breadcrumb>
`,
            Example: BreadcrumbCurrentLinkExample,
        },
    ],
    accessibility: {
        title: "Marker plassering tydelig i hierarkiet",
        description:
            "Brødsmuler gir både visuell og programmatisk kontekst. Det er spesielt viktig å markere nåværende side, og å bruke tydelige lenketekster slik at brukere forstår nivåene i hierarkiet.",
        ariaRoles: [
            <>
                Marker nåværende side med <code>aria-current="page"</code>.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current"
                    external
                >
                    Les mer om aria-current
                </Link>
                .
            </>,
            <>
                Brødsmuler bør ligge i en nav-landmark og være tydelig navngitt hvis du har
                flere navigasjoner.{" "}
                <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/" external>
                    Se WAI-ARIA APG: Breadcrumb
                </Link>
                .
            </>,
        ],
        wcag: [
            {
                id: "1.3.1",
                title: "Info and Relationships",
                level: "A",
                relevance:
                    "Brødsmuler viser relasjonen mellom nivåer; strukturen må være semantisk forståelig.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
            },
            {
                id: "2.4.4",
                title: "Link Purpose (In Context)",
                level: "A",
                relevance:
                    "Lenketekster i brødsmuler må si noe om nivået, ikke bare \"Tilbake\".",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html",
            },
            {
                id: "2.4.8",
                title: "Location",
                level: "AAA",
                relevance: "Brødsmuler er en direkte måte å oppfylle \"Location\" på.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/location.html",
            },
        ],
        avoid: [
            "Ikke bruk brødsmuler som eneste navigasjon til andre sider.",
            "Unngå generiske lenketekster; hvert ledd skal beskrive nivået.",
            "Ikke glem å markere nåværende side med aria-current.",
        ],
        testing: [
            "Skjermleser: verifiser at siste ledd leses som \"current page\".",
            "Tastatur: tab gjennom lenkene og sjekk fokusrekkefølge.",
            "Visuelt: kontroller at hierarkiet er lett å skanne.",
        ],
    },
    resources: [
        {
            title: "Breadcrumb Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Autoritativt mønster for brødsmuler.",
        },
        {
            title: "G65: Providing a breadcrumb trail",
            href: "https://www.w3.org/WAI/WCAG22/Techniques/general/G65",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "WCAG-teknikk for å gi brukere en brødsmulesti.",
        },
        {
            title: "Breadcrumbs component",
            href: "https://design-system.service.gov.uk/components/breadcrumbs/",
            publisher: "GOV.UK",
            relevance: 4,
            description: "Praktisk implementering av brødsmuler i et designsystem.",
        },
        {
            title: "aria-current",
            href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current",
            publisher: "MDN",
            relevance: 3,
            description: "Hvordan markere aktiv side i brødsmuler.",
        },
    ],
    components: ["breadcrumb", "breadcrumb-item", "link"],
};

export default post;
