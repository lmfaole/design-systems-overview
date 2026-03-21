import {MotionIllustration} from "@/features/ds/jokul/_shared/components/Illustration";
import {MotionPreview} from "@/features/ds/jokul/_token/components/MotionPreview";
import {easingTokens, formatPublicMotionTokenPath, timingTokens} from "./tokens";
import {motionMixins} from "./mixins";
import type {TokenPost} from "../types";

const post: TokenPost = {
    id: 13,
    title: "Animasjon",
    excerpt:
        "Lær hvordan Jøkul bruker timing- og easing-tokens for å skape konsistent, meningsfull bevegelse — og hvordan du respekterer brukere som foretrekker redusert bevegelse.",
    tokenOverview: [
        {
            heading: "Timing",
            description:
                "Fem navngitte varigheter fra øyeblikkelig til rolig. Velg timing basert på hvor mye oppmerksomhet interaksjonen fortjener.",
            caption: "Timing-tokens — varighet i millisekunder",
            columns: ["Animasjon", "Eksport", "CSS-variabel", "Verdi", "Bruksområde"],
            rows: timingTokens.map(({path, token, value, usage}) => [
                <MotionPreview key={`${token}-prev`} timing={token} easing="--jkl-motion-easing-entrance"/>,
                <code key={`${path}-public`}>{formatPublicMotionTokenPath(path)}</code>,
                <code key={`${token}-code`}>{token}</code>,
                value,
                usage,
            ]),
        },
        {
            heading: "Easing",
            description:
                "Fire navngitte kurver som gir bevegelse karakter og retning. Kombinér alltid en easing-token med en timing-token.",
            caption: "Easing-tokens — animasjonskurver",
            columns: ["Animasjon", "Eksport", "CSS-variabel", "Kurve", "Bruksområde"],
            rows: easingTokens.map(({path, token, curve, usage}) => [
                <MotionPreview key={`${token}-prev`} timing="--jkl-motion-timing-expressive" easing={token}/>,
                <code key={`${path}-public`}>{formatPublicMotionTokenPath(path)}</code>,
                <code key={`${token}-code`}>{token}</code>,
                curve,
                usage,
            ]),
        },
    ],
    scssSection: motionMixins,
    illustration: <MotionIllustration/>,
    relatedComponents: [],
    resources: [
        {
            title: "Material Design: Motion",
            url: "https://m3.material.io/styles/motion/overview",
            publisher: "Material Design",
            relevance: 3,
            description: "Retningslinjer for bevegelse i grensesnitt.",
        },
        {
            title: "MDN: prefers-reduced-motion",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
            publisher: "MDN",
            relevance: 4,
            description: "Hvordan respektere brukere som ønsker mindre animasjon.",
        },
        {
            title: "MDN: transition-timing-function",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function",
            publisher: "MDN",
            relevance: 3,
            description: "Easing-kurver for overgangsanimasjoner.",
        },
        {
            title: "MDN: animation",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/animation",
            publisher: "MDN",
            relevance: 3,
            description: "CSS-animasjoner og nøkkelrammer.",
        },
        {
            title: "WCAG 2.1 — 2.3.3: Animation from Interactions",
            url: "https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html",
            publisher: "W3C/WAI",
            relevance: 4,
            description: "Krav til å kunne redusere animasjon ved interaksjoner.",
        },
    ],
};

export default post;
