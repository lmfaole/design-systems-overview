import type { PatternPost } from "../types";
import { Link } from "@fremtind/jokul/link";
import { IgnoreStaleResponsesExample, StaleResponsesExample } from "./examples";

const post: PatternPost = {
    id: 2,
    title: "Asynkront søk",
    category: "handlinger",
    goals: "Gi riktige resultater selv når brukeren skriver raskt.",
    rationale: {
        use: [
            <>
                Bruk asynkront søk når resultatene kommer fra et API og må oppdateres mens brukeren
                skriver.
            </>,
            <>
                Passer når du vil gi rask feedback uten å blokkere input-feltet.
            </>,
        ],
        avoid: [
            <>
                Unngå dette når datasettet er lite nok til å filtreres lokalt.
            </>,
            <>
                Velg eksplisitt søk (knapp) hvis hver forespørsel er tung eller kostbar.
            </>,
        ],
    },
    avoid: [
        {
            title: "Gamle svar overskriver nyeste input",
            description: (
                <>
                    Hvis du ikke beskytter mot stale responses, kan eldre kall vinne.
                </>
            ),
            code: `
import { useEffect, useRef, useState } from "react";
import { TextInput } from "@fremtind/jokul/text-input";
import { Loader } from "@fremtind/jokul/loader";

function fakeSearch(query: string): Promise<{ query: string; results: string[] }> {
    const ms = Math.max(0, 3 - query.length) * 450 + 250;
    return new Promise((resolve) =>
        setTimeout(() => resolve({ query, results: query ? [\`\${query} - treff 1\`] : [] }), ms),
    );
}

export function StaleResponsesExample() {
    const [query, setQuery] = useState("a");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ query: "", results: [] as string[] });
    const mounted = useRef(true);

    useEffect(() => () => void (mounted.current = false), []);

    useEffect(() => {
        setLoading(true);
        fakeSearch(query).then((r) => {
            if (!mounted.current) return;
            setResponse(r);
            setLoading(false);
        });
    }, [query]);

    return (
        <>
            <TextInput label="Søk" value={query} onChange={(e) => setQuery(e.target.value)} />
            {loading ? <Loader textDescription="Søker" /> : null}
        </>
    );
}
`,
            Example: StaleResponsesExample,
        },
    ],
    examples: [
        {
            title: "Vanlig feil: gamle svar overskriver",
            description: (
                <>
                    Hvis du setter state direkte i <code>.then()</code> kan en treg respons
                    overskrive nyeste resultat.
                </>
            ),
            code: `
import { useEffect, useRef, useState } from "react";
import { TextInput } from "@fremtind/jokul/text-input";
import { Loader } from "@fremtind/jokul/loader";

function fakeSearch(query: string): Promise<{ query: string; results: string[] }> {
    const ms = Math.max(0, 3 - query.length) * 450 + 250;
    return new Promise((resolve) =>
        setTimeout(() => resolve({ query, results: query ? [\`\${query} - treff 1\`] : [] }), ms),
    );
}

export function StaleResponsesExample() {
    const [query, setQuery] = useState("a");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ query: "", results: [] as string[] });
    const mounted = useRef(true);

    useEffect(() => () => void (mounted.current = false), []);

    useEffect(() => {
        setLoading(true);
        fakeSearch(query).then((r) => {
            if (!mounted.current) return;
            setResponse(r);
            setLoading(false);
        });
    }, [query]);

    return (
        <>
            <TextInput label="Søk" value={query} onChange={(e) => setQuery(e.target.value)} />
            {loading ? <Loader textDescription="Søker" /> : <div>Resultat for: {response.query}</div>}
        </>
    );
}
`,
            Example: StaleResponsesExample,
        },
        {
            title: "Riktig: ignorer utdaterte svar",
            description: (
                <>
                    Spor en <code>requestId</code> og oppdater bare state for nyeste kall.
                </>
            ),
            code: `
import { useEffect, useRef, useState } from "react";

function fakeSearch(query: string): Promise<{ query: string; results: string[] }> {
    const ms = Math.max(0, 3 - query.length) * 450 + 250;
    return new Promise((resolve) =>
        setTimeout(() => resolve({ query, results: query ? [\`\${query} - treff 1\`] : [] }), ms),
    );
}

export function IgnoreStaleResponsesExample() {
    const [query, setQuery] = useState("a");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ query: "", results: [] as string[] });
    const requestId = useRef(0);

    useEffect(() => {
        const id = ++requestId.current;
        setLoading(true);

        fakeSearch(query).then((r) => {
            if (id !== requestId.current) return;
            setResponse(r);
            setLoading(false);
        });
    }, [query]);

    // ...render input + result...
}
`,
            Example: IgnoreStaleResponsesExample,
        },
    ],
    accessibility: {
        title: "Gi tydelig status når innhold oppdateres asynkront",
        description: (
            <>
                Asynkrone oppdateringer kan gi forvirrende opplevelser hvis UI-et viser feil
                resultat, eller hvis statusendringer ikke blir kommunisert. Gi brukeren
                tydelig tilbakemelding på lasting og treff, uten å flytte fokus.
            </>
        ),
        ariaRoles: [
            <>
                Bruk <code>aria-live</code> (f.eks. <code>polite</code>) for å annonsere
                status som "Søker" / "Ingen treff" / "3 treff".{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live"
                    external
                >
                    Les mer om aria-live
                </Link>
                .
            </>,
            <>
                Marker resultatregionen som opptatt med <code>aria-busy</code> mens du
                laster.{" "}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy"
                    external
                >
                    Les mer om aria-busy
                </Link>
                .
            </>,
            <>
                Unngå å flytte fokus når resultatene oppdateres; la brukeren styre videre
                navigasjon (f.eks. til en treffliste).
            </>,
        ],
        wcag: [
            {
                id: "1.3.1",
                title: "Info and Relationships",
                level: "A",
                relevance:
                    "Presenter treff med riktig struktur (liste/tabell), så hjelpemidler forstår innholdet.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
            },
            {
                id: "3.2.2",
                title: "On Input",
                level: "A",
                relevance:
                    "Oppdatering på input må ikke gi uventede kontekstendringer eller stjele fokus.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/on-input.html",
            },
            {
                id: "4.1.3",
                title: "Status Messages",
                level: "AA",
                relevance:
                    "Brukere som ikke ser skjermen må få med seg at det lastes og at resultatene endres.",
                url: "https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html",
            },
        ],
        avoid: [
            <>
                Ikke la utdaterte kall overskrive nyeste state (bruk <code>requestId</code>{" "}
                eller <code>AbortController</code>).
            </>,
            "Vis en tydelig lastetilstand og avslutt den for nyeste kall (ikke for et gammelt svar).",
            "Unngå å flytte fokus automatisk til resultatene; tilby heller en tydelig struktur brukeren kan navigere til.",
            "Hvis du viser flere treff: presenter dem som liste (ul/li) eller tabell, ikke som en lang tekststreng.",
        ],
        testing: [
            'Skriv raskt (f.eks. "a" -> "ab") og sjekk at resultatet alltid matcher siste input.',
            'Skjermleser: verifiser at "Søker" og antall/ingen treff annonseres uten fokusflytting.',
            "Tastatur: verifiser at du kan navigere videre til resultatene uten uventede hopp.",
        ],
    },
    resources: [
        {
            title: "Combobox Pattern",
            href: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Mønster for søk/auto-complete med tastatur og ARIA.",
        },
        {
            title: "Autocomplete component",
            href: "https://design-system.service.gov.uk/components/autocomplete/",
            publisher: "GOV.UK",
            relevance: 4,
            description: "Praktiske råd for søk og forslag.",
        },
        {
            title: "input type=\"search\"",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search",
            publisher: "MDN",
            relevance: 4,
            description: "Native søkefelt og tilhørende atferd.",
        },
        {
            title: "HTML Standard: Search state (type=search)",
            href: "https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search)",
            publisher: "WHATWG",
            relevance: 4,
            description: "Spesifikasjon for søkefelt og native oppførsel.",
        },
        {
            title: "ARIA22: Using role=status to present status messages",
            href: "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Teknikk for å annonsere søkestatus uten å flytte fokus.",
        },
        {
            title: "useDeferredValue",
            href: "https://react.dev/reference/react/useDeferredValue",
            publisher: "React",
            relevance: 3,
            description: "Avlaster rendering mens brukeren skriver i søkefeltet.",
        },
    ],
    components: ["text-input", "loader", "list"],
};

export default post;
