import {type DocumentedPublicToken, formatPublicTokenPath, getPublicTokenValue,} from "../_shared/public-tokens";

export interface TimingToken extends DocumentedPublicToken {
    path: string;
    token: string;
    value: string;
    usage: string;
}

export interface EasingToken extends DocumentedPublicToken {
    path: string;
    token: string;
    curve: string;
    usage: string;
}

export const timingTokens: TimingToken[] = [
    {
        path: "motion.timing.energetic",
        token: "--jkl-motion-timing-energetic",
        value: getPublicTokenValue("motion.timing.energetic"),
        usage: "Knappetrykk, hover, checkbox-toggle",
        exportPaths: ["motion.timing.energetic"],
    },
    {
        path: "motion.timing.snappy",
        token: "--jkl-motion-timing-snappy",
        value: getPublicTokenValue("motion.timing.snappy"),
        usage: "Tooltip, dropdown-åpning, inline-validering",
        exportPaths: ["motion.timing.snappy"],
    },
    {
        path: "motion.timing.productive",
        token: "--jkl-motion-timing-productive",
        value: getPublicTokenValue("motion.timing.productive"),
        usage: "Modaler, accordion, side-panels",
        exportPaths: ["motion.timing.productive"],
    },
    {
        path: "motion.timing.expressive",
        token: "--jkl-motion-timing-expressive",
        value: getPublicTokenValue("motion.timing.expressive"),
        usage: "Hero-animasjoner, onboarding, side-transisjoner",
        exportPaths: ["motion.timing.expressive"],
    },
    {
        path: "motion.timing.lazy",
        token: "--jkl-motion-timing-lazy",
        value: getPublicTokenValue("motion.timing.lazy"),
        usage: "Store layout-skift — bruk sparsomt",
        exportPaths: ["motion.timing.lazy"],
    },
];

export const easingTokens: EasingToken[] = [
    {
        path: "motion.easing.standard",
        token: "--jkl-motion-easing-standard",
        curve: getPublicTokenValue("motion.easing.standard"),
        usage: "Tilstandsbytter uten klar retning (f.eks. toggle)",
        exportPaths: ["motion.easing.standard"],
    },
    {
        path: "motion.easing.entrance",
        token: "--jkl-motion-easing-entrance",
        curve: getPublicTokenValue("motion.easing.entrance"),
        usage: "Noe kommer til syne — modal, notification, kort som glir inn",
        exportPaths: ["motion.easing.entrance"],
    },
    {
        path: "motion.easing.exit",
        token: "--jkl-motion-easing-exit",
        curve: getPublicTokenValue("motion.easing.exit"),
        usage: "Noe forlater viewet — lukking av modal, fjerning av varsel",
        exportPaths: ["motion.easing.exit"],
    },
    {
        path: "motion.easing.easeInBounceOut",
        token: "--jkl-motion-easing-ease-in-bounce-out",
        curve: getPublicTokenValue("motion.easing.easeInBounceOut"),
        usage: "Mer karakterfull overgang når noe skal signalisere energi eller respons.",
        exportPaths: ["motion.easing.easeInBounceOut"],
    },
    {
        path: "motion.easing.focus",
        token: "--jkl-motion-easing-focus",
        curve: getPublicTokenValue("motion.easing.focus"),
        usage: "Focus-ring og elementer som signaliserer at noe nettopp skjedde",
        exportPaths: ["motion.easing.focus"],
    },
];

export function formatPublicMotionTokenPath(path: string): string {
    return formatPublicTokenPath(path);
}
