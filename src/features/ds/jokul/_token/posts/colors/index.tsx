import {ColorIllustration} from "@/features/ds/jokul/_shared/components/Illustration";
import {
    backgroundTokens,
    borderTokens,
    exportedAlertBackgroundTokens,
    exportedBackgroundTokens,
    exportedBorderTokens,
    exportedFunctionalColorTokens,
    exportedPrimitiveColorTokens,
    exportedTextTokens,
    feedbackSurfaceTokens,
    formatPublicColorTokenPath,
    primitiveColorTokens,
    textTokens,
} from "./tokens";
import {colorMixins} from "./mixins";
import type {TokenPost} from "../types";

const SWATCH: React.CSSProperties = {
    width: "28px",
    height: "28px",
    borderRadius: "4px",
    border: "1px solid var(--jkl-color-border-separator)",
    flexShrink: 0,
};

function DualSwatch({light, dark}: { light: string; dark: string }) {
    return (
        <div style={{display: "inline-flex", gap: "4px"}}>
            <div style={{...SWATCH, background: light}}/>
            <div style={{...SWATCH, background: dark}}/>
        </div>
    );
}

const post: TokenPost = {
    id: 11,
    title: "Farger",
    excerpt:
        "En fullstendig referanse til Jøkuls fargesystem: primitive tokens, semantiske tokens, fargeroller, lys/mørk tema og kontrastkrav.",
    tokenOverview: [
        {
            heading: "Eksporterte primitive farger",
            description:
                "Disse tokenene eksporteres fra `@fremtind/jokul/core` som `tokens.color.brand.*`. De er rå merkevarefarger uten semantikk.",
            caption: "Eksporterte primitive fargetokens fra Jøkul core",
            columns: ["Forhåndsvisning", "Eksport", "Verdi", "Navn"],
            rows: exportedPrimitiveColorTokens.map(({path, value, label}) => [
                <div key={`${path}-s`} style={{...SWATCH, background: value}}/>,
                <code key={`${path}-c`}>{formatPublicColorTokenPath(path)}</code>,
                value,
                label,
            ]),
        },
        {
            heading: "Eksporterte funksjonelle farger",
            description:
                "Jøkul eksporterer også funksjonelle statusfarger som rå verdier. De brukes blant annet som grunnlag for semantiske feedback-farger.",
            caption: "Eksporterte funksjonelle farger fra Jøkul core",
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedFunctionalColorTokens.map(({
                                                         name,
                                                         lightPath,
                                                         darkPath,
                                                         lightValue,
                                                         darkValue,
                                                         description
                                                     }) => [
                <DualSwatch key={`${name}-s`} light={lightValue} dark={darkValue}/>,
                <span key={`${name}-c`}>
                    <code>{formatPublicColorTokenPath(lightPath)}</code>
                    <br/>
                    <code>{formatPublicColorTokenPath(darkPath)}</code>
                </span>,
                lightValue,
                darkValue,
                description,
            ]),
        },
        {
            heading: "Eksporterte bakgrunnsroller",
            description:
                "Semantiske bakgrunnstokens i `tokens.color.background.*`. Hver rad dokumenterer både lys og mørk verdi.",
            caption: "Eksporterte bakgrunnstokens fra Jøkul core",
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedBackgroundTokens.map(({path, lightValue, darkValue, description}) => [
                <DualSwatch key={`${path}-s`} light={lightValue} dark={darkValue}/>,
                <code key={`${path}-c`}>{formatPublicColorTokenPath(path)}</code>,
                lightValue,
                darkValue,
                description,
            ]),
        },
        {
            heading: "Eksporterte alert-flater",
            description:
                "Statusflater for meldinger og varsler. Disse finnes som egne eksporterte bakgrunnstokens i Jøkul core.",
            caption: "Eksporterte alert-bakgrunner fra Jøkul core",
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedAlertBackgroundTokens.map(({path, lightValue, darkValue, description}) => [
                <DualSwatch key={`${path}-s`} light={lightValue} dark={darkValue}/>,
                <code key={`${path}-c`}>{formatPublicColorTokenPath(path)}</code>,
                lightValue,
                darkValue,
                description,
            ]),
        },
        {
            heading: "Eksporterte tekstroller",
            description:
                "Semantiske tekstfarger fra `tokens.color.text.*`. Bruk disse når du jobber direkte mot Jøkul-tokenobjektet i JS eller TS.",
            caption: "Eksporterte tekstfarger fra Jøkul core",
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedTextTokens.map(({path, lightValue, darkValue, description}) => [
                <DualSwatch key={`${path}-s`} light={lightValue} dark={darkValue}/>,
                <code key={`${path}-c`}>{formatPublicColorTokenPath(path)}</code>,
                lightValue,
                darkValue,
                description,
            ]),
        },
        {
            heading: "Eksporterte kantroller",
            description:
                "Semantiske kant- og separatorfarger fra `tokens.color.border.*`.",
            caption: "Eksporterte kantfarger fra Jøkul core",
            columns: ["Forhåndsvisning", "Eksport", "Lys", "Mørk", "Bruksområde"],
            rows: exportedBorderTokens.map(({path, lightValue, darkValue, description}) => [
                <DualSwatch key={`${path}-s`} light={lightValue} dark={darkValue}/>,
                <code key={`${path}-c`}>{formatPublicColorTokenPath(path)}</code>,
                lightValue,
                darkValue,
                description,
            ]),
        },
        {
            heading: "Primitive",
            description:
                "Jøkuls konkrete fargepalett — merkevarefarger med faste hex-verdier. Bruk ikke disse direkte i komponentkode; bruk de semantiske tokenene som peker til dem.",
            caption: "Primitive fargetokens",
            columns: ["Forhåndsvisning", "Token", "Navn"],
            rows: primitiveColorTokens.map(({token, name}) => [
                <div key={`${token}-s`} style={{...SWATCH, background: `var(${token})`}}/>,
                <code key={`${token}-c`}>{token}</code>,
                name,
            ]),
        },
        {
            heading: "Bakgrunn",
            description:
                "Semantiske tokens for bakgrunns- og overflatefarger. Bytter verdi automatisk mellom lys og mørk modus.",
            caption: "Bakgrunns- og overflatefarger",
            columns: ["Forhåndsvisning", "Token", "Bruksområde"],
            rows: backgroundTokens.map(({token, description}) => [
                <div key={`${token}-s`} style={{...SWATCH, background: `var(${token})`}}/>,
                <code key={`${token}-c`}>{token}</code>,
                description,
            ]),
        },
        {
            heading: "Tekst",
            description:
                "Semantiske tokens for tekstfarger. Sørger for riktig kontrast mot bakgrunnen i begge temaer.",
            caption: "Semantiske tekstfarger",
            columns: ["Forhåndsvisning", "Token", "Bruksområde"],
            rows: textTokens.map(({token, description}) => [
                <span
                    key={`${token}-p`}
                    aria-hidden
                    style={{
                        color: `var(${token})`,
                        fontWeight: token.includes("default") ? "bold" : undefined,
                        background: token.includes("inverted")
                            ? "var(--jkl-color-background-container-inverted)"
                            : undefined,
                        padding: token.includes("inverted") ? "0 4px" : undefined,
                        borderRadius: token.includes("inverted") ? "2px" : undefined,
                    }}
                >
          Abc
        </span>,
                <code key={`${token}-c`}>{token}</code>,
                description,
            ]),
        },
        {
            heading: "Kantlinje",
            description:
                "Semantiske tokens for streker, skillelinjer og innramminger av interaktive elementer.",
            caption: "Semantiske kantlinjefarger",
            columns: ["Forhåndsvisning", "Token", "Bruksområde"],
            rows: borderTokens.map(({token, description}) => [
                <div
                    key={`${token}-p`}
                    aria-hidden
                    style={{width: "40px", height: "2px", background: `var(${token})`, borderRadius: "1px"}}
                />,
                <code key={`${token}-c`}>{token}</code>,
                description,
            ]),
        },
        {
            heading: "Feedback",
            description:
                "Overflatefarger for statusmeldinger — suksess, advarsel, feil og info. Brukes som bakgrunn i Message- og SystemMessage-komponenter.",
            caption: "Feedback-overflatefarger",
            columns: ["Forhåndsvisning", "Token", "Variant"],
            rows: feedbackSurfaceTokens.map(({token, variant}) => [
                <div key={`${token}-s`} style={{...SWATCH, background: `var(${token})`}}/>,
                <code key={`${token}-c`}>{token}</code>,
                variant,
            ]),
        },
    ],
    scssSection: colorMixins,
    illustration: <ColorIllustration/>,
    relatedComponents: ["tag", "message", "system-message"],
    resources: [
        {
            title: "WebAIM Contrast Checker",
            url: "https://webaim.org/resources/contrastchecker/",
            publisher: "WebAIM",
            relevance: 4,
            description: "Verktøy for å sjekke kontrast mellom tekst og bakgrunn.",
        },
        {
            title: "APCA Contrast Calculator",
            url: "https://www.myndex.com/APCA/",
            publisher: "Myndex",
            relevance: 3,
            description: "Alternativ kontrastmodell for mer presis vurdering.",
        },
        {
            title: "WCAG 2.1 — 1.4.3: Contrast (Minimum)",
            url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",
            publisher: "W3C/WAI",
            relevance: 5,
            description: "Minstekrav til kontrast for tekst.",
        },
        {
            title: "WCAG 2.1 — 1.4.6: Contrast (Enhanced)",
            url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Strengere kontrastkrav for forbedret lesbarhet.",
        },
        {
            title: "MDN: color-scheme",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme",
            publisher: "MDN",
            relevance: 3,
            description: "Hvordan nettleseren håndterer lys/mørk fargemodus.",
        },
        {
            title: "MDN: CSS custom properties",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/--*",
            publisher: "MDN",
            relevance: 3,
            description: "Grunnlaget for å definere og bruke fargetokens i CSS.",
        },
    ],
};

export default post;
