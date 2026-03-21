import {type DocumentedPublicToken, formatPublicTokenPath, getPublicTokenValue,} from "../_shared/public-tokens";

export interface BorderRadiusToken extends DocumentedPublicToken {
    name: string;
    path: string;
    token: string;
    value: string;
    rem: string;
    usage: string;
}

export const borderRadiusTokens: BorderRadiusToken[] = [
    {
        name: "none",
        path: "border.radius.none",
        token: "--jkl-border-radius-none",
        value: getPublicTokenValue("border.radius.none"),
        rem: "0",
        usage: "Ingen avrunding. Brukes for skarpe rektangler, tabeller og kanter der form betyr noe.",
        exportPaths: ["border.radius.none"],
    },
    {
        name: "xs",
        path: "border.radius.xs",
        token: "--jkl-border-radius-xs",
        value: getPublicTokenValue("border.radius.xs"),
        rem: "0.25rem",
        usage: "Svak avrunding. Brukes på chips, tags og kompakte elementer.",
        exportPaths: ["border.radius.xs"],
    },
    {
        name: "s",
        path: "border.radius.s",
        token: "--jkl-border-radius-s",
        value: getPublicTokenValue("border.radius.s"),
        rem: "0.5rem",
        usage: "Standard avrunding. Brukes på input-felt, knapper og de fleste interaktive komponenter.",
        exportPaths: ["border.radius.s"],
    },
    {
        name: "m",
        path: "border.radius.m",
        token: "--jkl-border-radius-m",
        value: getPublicTokenValue("border.radius.m"),
        rem: "0.75rem",
        usage: "Moderat avrunding. Brukes på kort, popover og paneler.",
        exportPaths: ["border.radius.m"],
    },
    {
        name: "l",
        path: "border.radius.l",
        token: "--jkl-border-radius-l",
        value: getPublicTokenValue("border.radius.l"),
        rem: "1rem",
        usage: "Tydelig avrunding. Brukes på større flater som modaler og hero-kort.",
        exportPaths: ["border.radius.l"],
    },
    {
        name: "full",
        path: "border.radius.full",
        token: "--jkl-border-radius-full",
        value: getPublicTokenValue("border.radius.full"),
        rem: "9999px",
        usage: "Pille-form. Brukes for å gjøre et element helt rundt — f.eks. badges og avatar-containere.",
        exportPaths: ["border.radius.full"],
    },
];

export interface BorderWidthToken extends DocumentedPublicToken {
    path: string;
    value: string;
    usage: string;
}

function createBorderWidthToken(path: string, usage: string): BorderWidthToken {
    return {
        path,
        value: getPublicTokenValue(path),
        usage,
        exportPaths: [path],
    };
}

export const borderWidthTokens: BorderWidthToken[] = [
    createBorderWidthToken("border.width.1", "Tynne separatorer og diskrete skillelinjer."),
    createBorderWidthToken("border.width.2", "Standard kantbredde på komponenter og interaktive flater."),
    createBorderWidthToken("border.width.3", "Tydeligere markering når en kant skal være fremtredende."),
];

export function formatPublicBorderTokenPath(path: string): string {
    return formatPublicTokenPath(path);
}
