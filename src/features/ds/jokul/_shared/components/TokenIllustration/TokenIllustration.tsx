import "./token-illustration.scss";

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

interface TokenIllustrationProps {
    slug: TokenIllustrationSlug;
    surface?: "card" | "page";
}

export function TokenIllustration({
    slug,
    surface = "card",
}: TokenIllustrationProps) {
    const variant = tokenIllustrationVariants[slug];
    const Specimen = variant.specimenTag;
    const specimenProps =
        surface === "page"
            ? { "data-token-specimen": slug }
            : { "data-token-card-specimen": slug };

    return (
        <div
            className="token-illustration"
            data-surface={surface}
            data-token-illustration-bleed="true"
            {...(surface === "page" ? { "data-token-illustration": slug } : { "data-token-card-illustration": slug })}
        >
            <Specimen
                className="token-specimen"
                data-token-group={slug}
                data-token-overflow="large"
                {...specimenProps}
            >
                {variant.label}
            </Specimen>
        </div>
    );
}

export function TokenCardIllustration({ slug }: { slug: TokenIllustrationSlug }) {
    return <TokenIllustration slug={slug} surface="card" />;
}

export function TokenPageIllustration({ slug }: { slug: TokenIllustrationSlug }) {
    return <TokenIllustration slug={slug} surface="page" />;
}
