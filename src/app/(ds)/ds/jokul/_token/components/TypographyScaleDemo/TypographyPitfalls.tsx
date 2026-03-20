import { Message } from "@fremtind/jokul/message";
import { ProseCodeBlock } from "@/app/ds/jokul/_shared/components/CodeBlock";
import "./typography-pitfalls.scss";

interface Pitfall {
    id: string;
    title: string;
    problem: string;
    why: string;
    badCode?: string;
    goodCode?: string;
    note?: string;
}

const pitfalls: Pitfall[] = [
    {
        id: "weight",
        title: "Skriftvekt 500 og 600 finnes ikke",
        problem:
            "Fremtind Grotesk har kun to vekter: 400 (normal) og 700 (bold). Bruker du font-weight: 500 eller 600 velger nettleseren nærmeste tilgjengelig vekt — som er 400. Resultatet er tekst som ser ut som normal vekt selv om du mente medium.",
        why: "Nettleseren bruker «nearest match»-algoritmen. 500 og 600 er nærmere 400 enn 700, så de faller alltid tilbake til normal.",
        badCode: `/* ❌ Ser riktig ut i Figma, usynlig forskjell i nettleseren */
font-weight: 500; /* → faller tilbake til 400 */
font-weight: 600; /* → faller tilbake til 400 */`,
        goodCode: `/* ✅ Bruk kun de to tilgjengelige vektene */
font-weight: var(--jkl-typography-font-weight-normal); /* 400 */
font-weight: var(--jkl-typography-font-weight-bold);   /* 700 */`,
    },
    {
        id: "px-root",
        title: "px på rot-font-size bryter nettleser-zoom",
        problem:
            "Setter du font-size: 16px på html eller body overstyrer du brukerens foretrukne tekststørrelse i nettleseren. En bruker som har satt 20px som standard får fortsatt 16px — et brudd på WCAG 1.4.4.",
        why: "rem-enheter er relative til rot-elementet. Lar du rot-elementet arve fra nettleseren (100%) skalerer alt riktig når brukeren zoomer eller endrer standardstørrelse.",
        badCode: `/* ❌ Låser tekststørrelsen — bryter brukerinnstillinger */
html { font-size: 16px; }`,
        goodCode: `/* ✅ Arv fra nettleseren, skaler med rem */
html { font-size: 100%; } /* eller utelat det helt */

.min-komponent {
  font-size: var(--jkl-font-size-3); /* rem-basert token */
}`,
        note: "Jøkul setter aldri px på rot-elementet. Alle font-size-tokens er i rem.",
    },
    {
        id: "fout",
        title: "Font-loading flash (FOUT) og layout-shift",
        problem:
            "Fremtind Grotesk lastes asynkront. Før fonten er klar vises fallback (Arial/Helvetica). Hvis fallback-fonten har andre metrikker enn Fremtind Grotesk, hopper layouten når fonten byttes — en CLS-straff i Core Web Vitals.",
        why: "Jøkul konfigurerer size-adjust, ascent-override og descent-override på @font-face for fallback-fonten slik at den matcher Fremtind Grotesks geometri. Inkluder alltid Jøkuls CSS-pakke — definer aldri egne @font-face-regler for fonten.",
        badCode: `/* ❌ Egen @font-face uten metrikkjustering */
@font-face {
  font-family: "Fremtind Grotesk";
  src: url("/fonts/FremtindGrotesk.woff2");
  font-display: swap;
  /* mangler size-adjust, ascent-override, descent-override */
}`,
        goodCode: `/* ✅ Importer Jøkul-stiler — alt er konfigurert */
import "@fremtind/jokul/styles/styles.css";

/* Vil du preloade: */
<link rel="preload" as="font"
  href="/_next/static/media/FremtindGrotesk-Regular.woff2"
  crossOrigin="anonymous" />`,
    },
    {
        id: "tracking",
        title: "Letter-spacing på brødtekst gjør det vanskeligere å lese",
        problem:
            "Det er fristende å legge til letter-spacing for å gi tekst mer «luft» eller et eksklusivt preg. På løpende brødtekst gjør det derimot teksten vanskeligere å lese — hjernen vår leser ord som helhet, og ekstra mellomrom bryter ordformene.",
        why: "Positiv letter-spacing er kun hensiktsmessig for: versaler/all-caps, svært liten tekst (under font-size-2) og logoer/dekorativ tekst. Jøkul bruker ikke letter-spacing på brødtekst.",
        badCode: `/* ❌ Unødvendig sporing på brødtekst */
.ingress {
  font-size: var(--jkl-font-size-5);
  letter-spacing: 0.05em; /* svekker lesbarhet */
}`,
        goodCode: `/* ✅ Ingen tracking på brødtekst */
.ingress {
  font-size: var(--jkl-font-size-5);
  line-height: var(--jkl-line-height-relaxed);
  /* letter-spacing: normal — arvet, ingenting å gjøre */
}

/* ✅ Akseptabelt på all-caps-labels */
.status-label {
  font-size: var(--jkl-font-size-1);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}`,
    },
    {
        id: "heading-semantics",
        title: "Visuell størrelse vs. semantisk nivå",
        problem:
            "En vanlig feil er å velge HTML-heading-nivå (h1–h6) ut fra hvordan teksten skal se ut, i stedet for hvilken posisjon den har i dokumenthierarkiet. Dette skaper tilgjengelighetsproblemer — skjermlesere navigerer etter heading-nivå.",
        why: "HTML-elementet bestemmer semantikk (struktur, navigasjon). CSS bestemmer utseende. Det er fullt mulig å style en h2 til å se ut som heading-4.",
        badCode: `/* ❌ Bruker h4 fordi du vil ha liten tekst */
<h4>Seksjonstittel</h4> {/* men dette er faktisk et h2-nivå i hierarkiet */}`,
        goodCode: `/* ✅ Riktig semantikk, riktig stil */
<h2 className="min-seksjon__tittel">Seksjonstittel</h2>

/* Eller i egne komponenter: */
.min-seksjon__tittel {
  font-size: var(--jkl-font-size-4); /* ser ut som heading-4 */
  font-weight: var(--jkl-typography-font-weight-bold);
  /* men elementet i DOM er <h2> */
}`,
    },
    {
        id: "measure",
        title: "For lange linjer tretter øyet",
        problem:
            "Uten begrensning på linjelengde kan tekst strekke seg over hele skjermbredden på wide displays. Over 80–85 tegn per linje taper øyet stedet mellom linjeskiftene og leserytmen brytes.",
        why: "ch-enheten tilsvarer bredden av «0»-tegnet i gjeldende font og skriftstørrelse. max-width: 66ch gir omtrent 66 tegn og er konsistent uavhengig av font-size.",
        badCode: `/* ❌ Ingen breddesbegrensning — strekker seg over hele skjermen */
.artikkel__innhold {
  font-size: var(--jkl-font-size-3);
}`,
        goodCode: `/* ✅ Begrenset til behagelig lesebredde */
.artikkel__innhold {
  font-size: var(--jkl-font-size-3);
  max-width: 66ch; /* ~66 tegn — optimal leselengde */
}

/* Smale kolonner (sidebar, modal) */
.sidebar__tekst {
  max-width: 42ch;
}`,
    },
];

export function TypographyPitfalls() {
    return (
        <div className="ty-pitfalls">
            {pitfalls.map(({ id, title, problem, why, badCode, goodCode, note }) => (
                <div key={id} className="item">
                    <h3 className="title">{title}</h3>
                    <p className="problem">{problem}</p>
                    <Message variant="info" className="why">
                        <strong>Hvorfor:</strong> {why}
                    </Message>
                    {(badCode || goodCode) && (
                        <div className="code-pair">
                            {badCode && <ProseCodeBlock code={badCode} />}
                            {goodCode && <ProseCodeBlock code={goodCode} />}
                        </div>
                    )}
                    {note && (
                        <Message variant="success">{note}</Message>
                    )}
                </div>
            ))}
        </div>
    );
}
