import { tag, text } from "@/lib/html";

export type TokenIllustrationSlug =
    | "animasjon"
    | "breakpoints"
    | "farger"
    | "kantradiuser"
    | "skygger"
    | "spacing"
    | "typografi";

interface TokenIllustrationVariant {
    specimenTag: "span" | "strong";
    label?: string;
    showcaseProperties: string[];
}

export const tokenIllustrationVariants: Record<TokenIllustrationSlug, TokenIllustrationVariant> = {
    animasjon: {
        specimenTag: "span",
        showcaseProperties: ["transform"],
    },
    breakpoints: {
        specimenTag: "span",
        showcaseProperties: ["inline-size"],
    },
    farger: {
        specimenTag: "span",
        showcaseProperties: ["background-color"],
    },
    kantradiuser: {
        specimenTag: "span",
        showcaseProperties: ["border-radius"],
    },
    skygger: {
        specimenTag: "span",
        showcaseProperties: ["box-shadow"],
    },
    spacing: {
        specimenTag: "span",
        showcaseProperties: ["inline-size", "block-size"],
    },
    typografi: {
        specimenTag: "strong",
        label: "Ag",
        showcaseProperties: ["font-size", "line-height"],
    },
};

export function renderTokenIllustrationHtml(
    slug: TokenIllustrationSlug,
    surface: "card" | "page" = "page",
): string {
    const variant = tokenIllustrationVariants[slug];
    const specimenAttributes =
        surface === "page" ? { "data-token-specimen": slug } : { "data-token-card-specimen": slug };
    const illustrationAttributes =
        surface === "page" ? { "data-token-illustration": slug } : { "data-token-card-illustration": slug };

    const specimenHtml = tag(
        variant.specimenTag,
        variant.label ? text(variant.label) : "",
        {
            class: "token-specimen",
            "data-token-group": slug,
            "data-token-overflow": "large",
            ...specimenAttributes,
        },
    );

    return tag("div", specimenHtml, {
        class: "token-illustration",
        "data-surface": surface,
        "data-token-illustration-bleed": "true",
        ...illustrationAttributes,
    });
}
